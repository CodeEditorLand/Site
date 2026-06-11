#!/usr/bin/env sh

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

	# Convert CRLF -> LF on every text file. dos2unix skips binary files
	# automatically. Exclude build output, caches, and generated paths.
	#
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
		-not -path "*/Public/Asset/*" |
		\xargs \dos2unix -q

	\echo ""
	\echo "Line ending conversion complete."
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
		-not -path "*/.cache/*" |
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

	# Pass 1: blank-line formatter - inserts blank lines after statement and
	# block boundaries. Runs first so that Prettier can normalize the result.
	\python3 "$Current/Format/TypeScript.py" --All

	# Pass 2: Prettier - formats TS/JS/JSX/TSX/JSON/MD/CSS/Astro.
	# prettier-plugin-astro is loaded automatically if installed.
	# || \true prevents file-level errors from aborting the pipeline.
	if [ -x "$Root/node_modules/.bin/prettier" ]; then
		"$Root/node_modules/.bin/prettier" --write . \
			--ignore-path ".prettierignore" || \true
	else
		\echo "Prettier not found in node_modules/.bin - skipping."
		\echo "Run: pnpm install"
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
