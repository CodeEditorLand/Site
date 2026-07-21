#!/bin/sh
# Builds the vendored Jelly UI submodule (Vendor/JellyUI, tracking
# https://github.com/DependencyCodeEditorLand/Jelly - our fork of
# https://github.com/jelly-org/ui) and copies its dist bundle into Public/
# so Source/Layout/Base.astro can self-host it instead of the
# jelly-ui.com CDN. Safe to run on every build - it skips work when the
# built output already matches the pinned submodule commit.
set -e

Remote="https://github.com/DependencyCodeEditorLand/Jelly.git"

Root="$(cd "$(dirname "$0")/../.." && pwd)"
Vendor="$Root/Vendor/JellyUI"
Public="$Root/Public/Vendor/JellyUI"

# Some CI providers (Cloudflare Pages included) don't reliably run
# `git submodule update --init --recursive` before the build command. If
# the submodule directory is empty, fetch the exact commit the superproject
# has pinned (recorded as a gitlink in its tree - no network needed to read
# it) directly from GitHub instead of depending on the host's checkout step.
if [ ! -f "$Vendor/package.json" ]; then
	Commit=$(cd "$Root" && git rev-parse "HEAD:Vendor/JellyUI" 2>/dev/null || true)

	if [ -z "$Commit" ]; then
		echo "BuildJellyUIVendor: Vendor/JellyUI is empty and no pinned commit" >&2
		echo "was found in the superproject tree. Run:" >&2
		echo "  git submodule update --init --recursive" >&2
		exit 1
	fi

	echo "BuildJellyUIVendor: Vendor/JellyUI is empty - fetching pinned commit $Commit directly"
	rm -rf "$Vendor"
	mkdir -p "$Vendor"
	(
		cd "$Vendor"
		git init --quiet
		git remote add origin "$Remote"
		git fetch --quiet --depth 1 origin "$Commit"
		git checkout --quiet FETCH_HEAD
	)
fi

Stamp="$Vendor/dist/.BuiltFrom"
Pinned=$(cd "$Root" && git rev-parse "HEAD:Vendor/JellyUI" 2>/dev/null || cd "$Vendor" && git rev-parse HEAD)

if [ -f "$Vendor/dist/jelly.js" ] && [ -f "$Stamp" ] && [ "$(cat "$Stamp")" = "$Pinned" ]; then
	echo "BuildJellyUIVendor: dist/jelly.js already built for $Pinned - skipping build"
else
	echo "BuildJellyUIVendor: building Jelly UI ($Pinned)"

	# Vendor/JellyUI ships no PostCSS config of its own, so Vite's
	# postcss-load-config walks *up* the directory tree and picks up
	# WebSite's own postcss.config.js (Tailwind) - which then chokes on
	# Jelly's plain component CSS. A local no-op config stops that walk
	# right here instead of leaking our config into the vendored build.
	printf 'module.exports = { plugins: {} };\n' >"$Vendor/postcss.config.cjs"

	(cd "$Vendor" && npm install --no-audit --no-fund --silent)

	# `npm run build` also rolls up a .d.ts via api-extractor, which can fail
	# on TS/DOM-lib version mismatches pulled in through this monorepo's
	# hoisted node_modules - unrelated to the runtime bundle we actually
	# need. Treat that failure as non-fatal; the JS bundle's own presence
	# (checked below) is the real success signal, not vite build's exit code.
	(cd "$Vendor" && npm run build) || true

	if [ ! -f "$Vendor/dist/jelly.js" ]; then
		echo "BuildJellyUIVendor: build failed - dist/jelly.js was not produced" >&2
		exit 1
	fi

	echo "$Pinned" >"$Stamp"
fi

mkdir -p "$Public"
cp "$Vendor/dist/jelly.js" "$Public/jelly.js"
[ -f "$Vendor/dist/jelly.d.ts" ] && cp "$Vendor/dist/jelly.d.ts" "$Public/jelly.d.ts"

echo "BuildJellyUIVendor: Public/Vendor/JellyUI/jelly.js ready"
