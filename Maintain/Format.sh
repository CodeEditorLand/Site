#!/usr/bin/env bash

#===============================================================================
# Format.sh - Format shell, Prettier, and Markdown source for the WebSite.
#===============================================================================
#
# Usage:
#   sh Maintain/Format.sh               # Run all formatters
#   sh Maintain/Format.sh dos2unix      # Normalize line endings only
#   sh Maintain/Format.sh shell         # Format shell scripts only
#   sh Maintain/Format.sh prettier      # Format TS/JS/Astro/JSON/CSS/MD only
#   sh Maintain/Format.sh markdown      # Format Markdown HTML tables only
#
# Configuration:
#   .editorconfig       - Shared indent/newline rules (shfmt reads this)
#   prettier.config.js  - Prettier options; plugins auto-detected
#   .prettierignore     - Paths excluded from Prettier
#
#===============================================================================

\set -e

Current=$(cd -- "$(dirname -- "$0")" >/dev/null 2>&1 && pwd)

Root="$Current/.."

#===============================================================================
# Format Functions
#===============================================================================

FormatLineEndings() {
	\echo "========================================"
	\echo "Format Line Endings"
	\echo "========================================"
	\echo "Tooling: dos2unix"
	\echo "========================================"
	\echo ""

	if ! \command -v dos2unix >/dev/null 2>&1; then
		\echo "Error: dos2unix is not installed."
		\echo "  macOS:  brew install dos2unix"
		\echo "  Linux:  apt install dos2unix  /  dnf install dos2unix"
		\exit 1
	fi

	\cd "$Root"

	# dos2unix rewrites EVERY file it is handed - including one that is already
	# LF-only - through a temporary file created NEXT TO the target and renamed
	# over it. The temp is named d2utmpXXXXXX (`strings "$(command -v dos2unix)"`
	# shows the template), so a single pass creates a transient entry in every
	# directory of the tree. Two consequences, both of which broke the dev-server
	# loop while the site was being written (t_b107d9ee):
	#
	#   1. A temp file inside Source/pages/ makes Astro's createFileBasedRoutes()
	#      walk throw an unhandled ENOENT when it stats an entry that has already
	#      been renamed away - the whole dev server dies mid-edit.
	#   2. A temp file over tsconfig.json bumps its mtime with byte-identical
	#      content, and Vite's tsconfig watcher fires on the mtime alone:
	#      "changed tsconfig file detected" -> "Configuration file updated.
	#      Restarting...", once for the root config and once for Vendor/JellyUI.
	#
	# So: hand dos2unix only the files that actually carry a CRLF line ending
	# (-I skips binaries), and never let it write inside the routed tree -
	# Source/pages/ is converted to stdout and landed through a staging file
	# outside Source/, then renamed into place (the staging dir is on the same
	# volume, so the rename is atomic).
	#
	# Vendor/ is a git submodule: its formatting belongs to the vendor repo, and
	# a pass over it dirties the submodule and rewrites its tsconfig.
	CR=$(\printf '\r')
	List="$Root/.hermes/tmp/format-crlf.txt"

	\mkdir -p "$Root/.hermes/tmp"

	# shellcheck disable=SC2038
	\find . -type f \
		-not -path "*/node_modules/*" \
		-not -path "*/.git/*" \
		-not -path "*/Target/*" \
		-not -path "*/.astro/*" \
		-not -path "*/dist/*" \
		-not -path "*/.turbo/*" \
		-not -path "*/.cache/*" \
		-not -path "*/.swc/*" \
		-not -path "*/docs/*" \
		-not -path "*/Public/Asset/*" \
		-not -path "./Vendor/*" \
		-not -path "./.hermes/*" \
		-print0 |
		\xargs -0 \grep -lI -e "$CR$" -- 2>/dev/null >"$List" || true

	Count=$(\grep -c "" "$List" 2>/dev/null || true)
	[ -n "$Count" ] || Count=0

	if [ "$Count" -eq 0 ]; then
		\rm -f "$List"
		\echo "No CRLF found - nothing written (0 files)."
		\echo ""
		\echo "Line ending conversion complete."
		\echo ""
		return 0
	fi

	# Routed tree: staged outside Source/, renamed in. Never a temp inside
	# Source/pages/ - that is the directory Astro's route manifest walks.
	Stage="$Root/.hermes/tmp/format-stage"
	\mkdir -p "$Stage"

	\grep '^\./Source/pages/' "$List" 2>/dev/null | while IFS= \read -r Page; do
		\dos2unix -q -O -- "$Page" >"$Stage/Page" 2>/dev/null || \continue
		\chmod "$(\stat -f %Lp "$Page" 2>/dev/null || \stat -c %a "$Page" 2>/dev/null || \echo 644)" "$Stage/Page"
		\mv -f "$Stage/Page" "$Page"
		\echo "Converted (staged): $Page"
	done

	\rm -f "$Stage/Page"

	# Everything else: converted in place.
	\grep -v '^\./Source/pages/' "$List" >"$List.Rest" 2>/dev/null || true
	if [ -s "$List.Rest" ]; then
		while IFS= \read -r File; do \dos2unix -q "$File"; done <"$List.Rest"
	fi

	\rm -f "$List.Rest" "$List"

	\echo ""
	\echo "Line ending conversion complete ($Count CRLF file(s) converted)."
	\echo ""
}

FormatShell() {
	\echo "========================================"
	\echo "Format Shell"
	\echo "========================================"
	\echo "Tooling: shfmt"
	\echo "Config:  .editorconfig (tabs, indent=4)"
	\echo "========================================"
	\echo ""

	if ! \command -v shfmt >/dev/null 2>&1; then
		\echo "Error: shfmt is not installed."
		\echo "  macOS:  brew install shfmt"
		\echo "  Linux:  apt install shfmt  /  go install mvdan.cc/sh/v3/cmd/shfmt@latest"
		\echo "  https://github.com/mvdan/sh"
		\exit 1
	fi

	\cd "$Root"

	# shfmt reads .editorconfig for indent style/size automatically.
	#
	# shellcheck disable=SC2038
	\find . -name "*.sh" \
		-not -path "*/node_modules/*" \
		-not -path "*/.git/*" \
		-not -path "*/Target/*" \
		-not -path "*/dist/*" \
		-not -path "*/.turbo/*" \
		-not -path "*/.cache/*" \
		-not -path "./Vendor/*" \
		-not -path "./.hermes/*" |
		\xargs \shfmt -w

	\echo ""
	\echo "Shell formatting complete."
	\echo ""
}

FormatPrettier() {
	\echo "========================================"
	\echo "Format Prettier"
	\echo "========================================"
	\echo "Tooling: Format/TypeScript.py  (blank lines, first)"
	\echo "         Prettier              (TS/JS/Astro/JSON/CSS/MD, second)"
	\echo "Config:  prettier.config.js"
	\echo "Ignore:  .prettierignore"
	\echo "========================================"
	\echo ""

	\cd "$Root"

	# Pass 1: blank-line formatter. It inserts a blank line only where Prettier
	# keeps one - between statements, object/type-literal members, array elements
	# and call arguments - and never inside an expression or a JSX subtree. Its
	# output is therefore a fixed point of pass 2: a formatted tree reports
	# "0 files", and a second `npm run Format` writes nothing at all.
	#
	# Keep it that way. Any rule that inserts a blank line Prettier strips makes
	# every run rewrite the whole tree (~1,600 files), which is what kept the dev
	# server reloading (t_6b9a495a).
	\python3 "$Current/Format/TypeScript.py" --All

	# Pass 2: Prettier - formats TS/JS/JSX/TSX/JSON/MD/CSS/Astro.
	# prettier-plugin-astro is loaded automatically if installed.
	# `|| :` prevents file-level errors from aborting the pipeline. (`|| 	rue`
	# looks equivalent, but shfmt rewrites the escape to `rue` - a missing
	# command, which `set -e` then turns into a dead Format run.)
	if [ -x "$Root/node_modules/.bin/prettier" ]; then
		"$Root/node_modules/.bin/prettier" --write . \
			--ignore-path ".prettierignore" || :
	else
		\echo "Prettier not found in node_modules/.bin - skipping."
		\echo "Run: pnpm install"
	fi

	# Check the invariant instead of trusting it: after Prettier has run, pass 1
	# must have nothing left to say. Anything it still wants to change is a blank
	# line Prettier just stripped, i.e. the rewrite storm starting over. A clean
	# run reports 0; a number here names the drift.
	Drift=$(
		\python3 "$Current/Format/TypeScript.py" --DryRun --All 2>/dev/null |
			\grep -c "Would modify" || :
	)
	if [ "${Drift:-0}" -gt 0 ]; then
		\echo "WARNING: $Drift file(s) still want a blank line Prettier strips."
		\echo "  The blank-line pass has drifted from Prettier's policy - every"
		\echo "  Format run will keep rewriting them. Run it by hand to list them:"
		\echo "    python3 Maintain/Format/TypeScript.py --DryRun --All"
	fi

	\echo ""
	\echo "Prettier formatting complete."
	\echo ""
}

FormatMarkdown() {
	\echo "========================================"
	\echo "Format Markdown"
	\echo "========================================"
	\echo "Tooling: Maintain/Format/Markdown.py"
	\echo "========================================"
	\echo ""

	\cd "$Root"

	\python3 "$Current/Format/Markdown.py" --All

	\echo ""
	\echo "Markdown formatting complete."
	\echo ""
}

#===============================================================================
# Main Command Router
#===============================================================================

case "${1:-}" in
dos2unix)
	FormatLineEndings
	;;
shell)
	FormatShell
	;;
prettier)
	FormatPrettier
	;;
markdown)
	FormatMarkdown
	;;
"")
	FormatLineEndings
	FormatShell
	FormatMarkdown
	FormatPrettier
	;;
--help | -h)
	\echo "Usage: $0 [dos2unix|shell|prettier|markdown]"
	\echo ""
	\echo "  dos2unix  Normalize line endings (CRLF -> LF) with dos2unix"
	\echo "  shell     Format shell scripts with shfmt"
	\echo "  prettier  Format TS/JS/Astro/JSON/CSS/MD with Prettier + TypeScript.py"
	\echo "  markdown  Format Markdown HTML tables with Markdown.py"
	\echo "  (no arg)  Run all four in order"
	;;
*)
	\echo "Unknown target: $1"
	\echo "Use --help for usage information"
	\exit 1
	;;
esac
