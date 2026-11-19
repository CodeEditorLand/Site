#!/usr/bin/env python3
"""
TypeScript.py - Insert blank lines after ;  }  and , in TypeScript/JavaScript source files.

The pass runs BEFORE Prettier, so its output has to be a fixed point of
Prettier: every blank line it inserts must be one Prettier keeps. When the two
disagreed, `npm run Format` rewrote ~1,600 files on every run and never reached
"already formatted" (t_6b9a495a).

Prettier's blank-line policy, measured against this repo's prettier.config.js:

  kept                                    removed
  --------------------------------------  ------------------------------------
  between statements in a block           immediately after an opening brace
  between class / interface / type-        immediately before a closing brace
    literal members                        anywhere inside an expression:
  between object properties                  ternary branches, binary operands,
  between array elements                     type-argument lists, JSX attribute
  between call arguments                     lists, `} else`, `import { } from`
  before a comment or JSDoc block            (the whole expression is printed as
                                             one unit and its blanks dropped)

Two consequences, both learned by measuring the tree:

  - `{` is not a trigger. Prettier strips the leading blank of every brace pair,
    so "blank line after {" could only ever be undone by the next pass. The old
    --OpenBraceDepth option existed only for that rule and is gone with it.
  - `)` is not a trigger. With `semi: true` a formatted statement always ends in
    `;`, so a line ending in `)` is mid-expression by construction (`if (...)` on
    its own line, a broken call, a ternary branch). Inserting there was undone
    immediately.
  - JSX subtrees are skipped entirely. A JSX child is not a statement - it has no
    `;`, its `{ ... }` containers are expressions, and Prettier reflows the
    children as text. Paren/brace depth cannot tell `</span>{" "}` from a
    statement, so the scanner tracks the tags themselves (TagDepth) and inserts
    nothing while one is open. Every remaining churn site on the tree was inside
    JSX before this existed.

Rules (state-machine, line-by-line):

  After ;
  -------
  - Insert a blank line when the next line is non-blank, does not start with a
    closing delimiter (}  )  ]  ,  ;), is not a chain call (.method()), and does
    not continue the expression (see ContinueHeads).
  - Guards: skip lines inside block comments, inside import/export { ... }
    blocks, and while ParenDepth > 0 (inside function calls or arrow-function
    parameter lists) - except inside a brace opened within those parens.

  After }
  -------
  - Same gate as `;`. A `}` at line end is a member or statement boundary
    (function body, class body, object literal followed by `;` or `,`), which is
    exactly where Prettier keeps a blank line.

  After ,
  -------
  - At ParenDepth 0 the `,` has to close an element of an object literal or an
    array: the innermost open delimiter decides. Inside `{` the next line must
    look like a member (`key: value`, `"key": value`, `[computed]: value`,
    `...spread`, a comment) - that test is what keeps the pass out of type
    argument lists, where Prettier prints one type per line with no blanks.
    Inside `[` any element start is fine.
  - "Direct args" means ParenDepth > 0 AND the net brace depth since the
    enclosing paren opened is 0 - i.e., we have not entered an object literal or
    arrow-function body inside the call.
  - Commas inside object literals or closures within a call (e.g.
    foo({ key: val, }) or .catch((E) => { field = x, })) are left alone
    because RelativeBraceDepth > 0.
  - Template-literal interpolations ${ ... } are tracked as their own delimiter
    so commas inside ${} never trigger blank-line insertion.

  General
  -------
  - Strings (single-quote, double-quote, backtick), block comments, and
    template-literal interpolations are scanned so delimiters inside content
    never corrupt depth tracking or trigger insertion.
  - Never insert a second consecutive blank line (next line already blank -> skip).

Usage:
    # Dry-run on target file:
    python Maintain/Format/TypeScript.py --DryRun Package/Site/Source/Index.ts

    # Apply to one file:
    python Maintain/Format/TypeScript.py Package/Site/Source/Index.ts

    # Recursively apply to all .ts and .js files:
    python Maintain/Format/TypeScript.py --All

    # Dry-run everything (after a Format run this must report 0 files):
    python Maintain/Format/TypeScript.py --DryRun --All
"""

import re
import sys
from pathlib import Path
from typing import TypedDict


MatchClosingToken = re.compile(r"^\s*[})\];,]")
MatchChainContinue = re.compile(r"^\s*\.")
MatchCommentLine = re.compile(r"^\s*(//|\*)")
MatchImportExportOpen = re.compile(r"^\s*(import|export)\s*(type\s*)?\{")

# First token of a line that CONTINUES the expression started on the line
# before. Prettier prints an expression as one unit and drops every blank line
# inside it, so an insertion before any of these is undone by the same run and
# re-inserted by the next one - the churn this pass used to cause. Matched as a
# prefix of the stripped line, so "?" also covers "?." and "??", ">" also covers
# ">=", and "</" (a closing JSX tag) is covered by "<".
ContinueHeads = (
	"?",
	":",
	"&&",
	"||",
	"=",
	"==",
	"!=",
	"=>",
	"+",
	"-",
	"*",
	"/",
	"%",
	"<",
	">",
	"|",
	"&",
	"^",
	"!",
	"as ",
	"satisfies ",
	"instanceof ",
	"in ",
	"of ",
	"from ",
	"extends",
	"implements",
	"else",
	"catch",
	"finally",
	"while",
)

# A line that opens an object-literal / type-literal / class member. Only used
# to decide whether a `,` at ParenDepth 0 inside `{` is a member boundary: the
# label is what distinguishes `mode?: "light"` (a member) from `HTMLElement` (a
# type argument, which Prettier prints with no blank lines at all).
MatchMemberLabel = re.compile(
	r"""^\s*(?:
		//|/\*                                        # comment
		|\.\.\.                                       # spread member
		|(?:[A-Za-z_$][\w$]*|"[^"]*"|'[^']*'|\[[^\]]*\]|\d+)\s*\??\s*:   # key:
	)""",
	re.VERBOSE,
)

# Directory components that are never formatted. Mirrors the exclusion sets in
# Maintain/Format.sh find paths and .prettierignore.
Exclude = frozenset(
	{
		"Archive",
		"Dependency",
		"Documentation",
		"Target",
		"target",
		"node_modules",
		".git",
		"dist",
		"build",
		# Vendored submodule - its formatting belongs to the vendor repo.
		"Vendor",
		".hermes",
		# Generated caches. `.astro/content.d.ts` in particular is written by the
		# dev server, so formatting it only ever makes work for the next build.
		".astro",
		".turbo",
		".cache",
		".swc",
		".parcel-cache",
	}
)


class ScanResult(TypedDict):
	ParenDelta: int
	BraceDelta: int
	LastChar: str | None
	EndsInBlock: bool
	EndsInStringSingle: bool
	EndsInStringDouble: bool
	EndsInStringTemplate: bool
	EndsInString: bool
	Delims: list[str]
	EndsInTag: bool
	TagClosing: bool
	TagDelta: int


def ScanLine(
	Line: str,
	MidBlockComment: bool = False,
	MidSingle: bool = False,
	MidDouble: bool = False,
	MidTemplate: bool = False,
	MidTag: bool = False,
	TagClosing: bool = False,
) -> ScanResult:
	"""
	Scan a single TypeScript/JavaScript source line, skipping string,
	template literal, and block-comment content.

	Parameters
	----------
	Line             : the source line to scan.
	MidBlockComment  : True if the line starts inside an open /*.
	MidSingle        : True if the line starts mid-single-quoted string.
	MidDouble        : True if the line starts mid-double-quoted string.
	MidTemplate      : True if the line starts mid-template literal.
	MidTag           : True if the line starts inside a JSX tag (<Foo ...).
	TagClosing       : True if that tag is a closing tag (</Foo).

	Returns
	-------
	ParenDelta            : int  - net parenthesis depth change
	BraceDelta            : int  - net brace depth change
	LastChar              : str|None - last non-whitespace code char
	EndsInBlock           : bool - line ends with unclosed /*
	EndsInStringSingle    : bool - line ends mid-single-quoted string
	EndsInStringDouble    : bool - line ends mid-double-quoted string
	EndsInStringTemplate  : bool - line ends mid-template literal
	EndsInString          : bool - any of the above three
	Delims                : list[str] - delimiters opened ( [ { T ) or closed
	                        ) ] } in code order; T opens a ${ } interpolation
	EndsInTag             : bool - line ends inside a JSX tag
	TagClosing            : bool - that tag is a closing tag
	TagDelta              : int  - JSX elements opened minus closed on this line
	"""
	ParenDelta = 0
	BraceDelta = 0
	LastChar = None
	Delims: list[str] = []
	TagDelta = 0
	TagNest = 0
	SelfClose = False
	PrevCode: str | None = None
	Position = 0
	Length = len(Line)

	InBlock = MidBlockComment
	InSingle = MidSingle
	InDouble = MidDouble
	InTemplateText = MidTemplate
	InTemplateExpr = 0

	while Position < Length:
		Character = Line[Position]

		if InDouble:
			if Character == "\\":
				Position += 2
				continue
			if Character == '"':
				InDouble = False
			Position += 1
			continue

		if InSingle:
			if Character == "\\":
				Position += 2
				continue
			if Character == "'":
				InSingle = False
			Position += 1
			continue

		if InTemplateText and InTemplateExpr == 0:
			if Character == "`":
				InTemplateText = False
				Position += 1
				continue
			if Character == "$" and Position + 1 < Length and Line[Position + 1] == "{":
				InTemplateExpr = 1
				Delims.append("T")
				Position += 2
				continue
			Position += 1
			continue

		if InTemplateExpr > 0:
			if Character == "\\":
				Position += 2
				continue
			if Character == '"':
				InDouble = not InDouble
				Position += 1
				continue
			if Character == "'":
				InSingle = not InSingle
				Position += 1
				continue
			if Character == "`":
				InTemplateText = True
				Position += 1
				continue
			if Character == "{":
				InTemplateExpr += 1
				BraceDelta += 1
				Delims.append("{")
				LastChar = Character
				Position += 1
				continue
			if Character == "}":
				InTemplateExpr -= 1
				Delims.append("}")
				if InTemplateExpr == 0:
					InTemplateText = True
					Position += 1
					continue
				BraceDelta -= 1
				LastChar = Character
				Position += 1
				continue
			if Character == "(":
				ParenDelta += 1
				Delims.append("(")
			elif Character == ")":
				ParenDelta -= 1
				Delims.append(")")

			if Character not in (" ", "\t", "\r", "\n"):
				LastChar = Character
			Position += 1
			continue

		if InBlock:
			if Character == "*" and Position + 1 < Length and Line[Position + 1] == "/":
				InBlock = False
				Position += 2
				continue
			Position += 1
			continue

		# JSX tags. A tag runs from `<` to its `>` and may span lines; what sits
		# between a tag and its closing tag is children (text and expression
		# containers), not statements. Transform uses TagDelta to know when it is
		# inside one and stops inserting there - Prettier reflows JSX children and
		# drops the blanks. `>` preceded by `=` is an arrow, never a tag close;
		# `{ ... }` attribute expressions may carry their own nested element, which
		# TagNest keeps from ending the outer tag early.
		if MidTag:
			if Character == "/" and Position + 1 < Length and Line[Position + 1] == ">":
				SelfClose = True
				Position += 1
				continue
			if Character == "<" and Position + 1 < Length and (
				Line[Position + 1] == ">"
				or Line[Position + 1] == "/"
				or Line[Position + 1].isalpha()
			):
				TagNest += 1
			elif Character == ">":
				if PrevCode == "=":
					pass
				elif TagNest > 0:
					TagNest -= 1
				else:
					MidTag = False
					if TagClosing:
						TagDelta -= 1
					elif not SelfClose:
						TagDelta += 1
					TagClosing = False
					SelfClose = False
			if Character not in (" ", "	", "\r", "\n"):
				PrevCode = Character
			Position += 1
			continue

		if Character == "<" and (PrevCode is None or PrevCode in "([{,;=><?:&|!"):
			Following = Line[Position + 1] if Position + 1 < Length else ""
			if Following == "/" or Following == ">" or Following.isalpha():
				MidTag = True
				TagClosing = Following == "/"
				TagNest = 0
				SelfClose = False
				PrevCode = Character
				Position += 1
				continue

		if Character == "`":
			InTemplateText = not InTemplateText
			Position += 1
			continue

		if Character == '"':
			InDouble = True
			Position += 1
			continue

		if Character == "'":
			InSingle = True
			Position += 1
			continue

		if Character == "/" and Position + 1 < Length and Line[Position + 1] == "/":
			break

		if Character == "/" and Position + 1 < Length and Line[Position + 1] == "*":
			InBlock = True
			Position += 2
			continue

		if Character == "(":
			ParenDelta += 1
			Delims.append("(")
		elif Character == ")":
			ParenDelta -= 1
			Delims.append(")")
		elif Character == "{":
			BraceDelta += 1
			Delims.append("{")
		elif Character == "}":
			BraceDelta -= 1
			Delims.append("}")

		if Character not in (" ", "	", "\r", "\n"):
			LastChar = Character
			PrevCode = Character

		Position += 1

	return {
		"ParenDelta": ParenDelta,
		"BraceDelta": BraceDelta,
		"LastChar": LastChar,
		"EndsInBlock": InBlock,
		"EndsInStringSingle": InSingle,
		"EndsInStringDouble": InDouble,
		"EndsInStringTemplate": InTemplateText,
		"EndsInString": InDouble or InSingle or InTemplateText,
		"Delims": Delims,
		"EndsInTag": MidTag,
		"TagClosing": TagClosing,
		"TagDelta": TagDelta,
	}


def LineContinues(NextLine: str) -> bool:
	"""True when NextLine carries on the expression the previous line started."""
	Head = NextLine.strip()
	if not Head:
		return False
	for Prefix in ContinueHeads:
		if Head.startswith(Prefix):
			return True
	return False


def CommaEndsListMember(NextLine: str, DelimStack: list[str]) -> bool:
	"""
	True when the `,` ending the current line closes a list element that
	Prettier keeps a blank line after.

	Only an object/array literal qualifies, and inside `{` the next line has to
	look like a member - a bare type name after a `,` is a type-argument list,
	which Prettier prints one per line with no blank lines.
	"""
	if not DelimStack:
		return False

	Enclosing = DelimStack[-1]

	if Enclosing == "[":
		return True

	if Enclosing == "{":
		return bool(MatchMemberLabel.match(NextLine))

	return False


def Transform(Source: str) -> str:
	LineList = Source.split("\n")
	Output: list[str] = []

	BlockCommentOpen = False
	ParenDepth = 0
	BraceDepth = 0
	BraceDepthImport = 0
	InImportBlock = False
	InSingleQuote = False
	InDoubleQuote = False
	InTemplateText = False
	MidTag = False
	TagClosing = False
	TagDepth = 0

	ParenOpenBraceStack: list[int] = []
	DelimStack: list[str] = []

	for Index, Line in enumerate(LineList):
		Scan = ScanLine(
			Line,
			MidBlockComment=BlockCommentOpen,
			MidSingle=InSingleQuote,
			MidDouble=InDoubleQuote,
			MidTemplate=InTemplateText,
			MidTag=MidTag,
			TagClosing=TagClosing,
		)
		BlockCommentOpen = Scan["EndsInBlock"]
		InSingleQuote = Scan["EndsInStringSingle"]
		InDoubleQuote = Scan["EndsInStringDouble"]
		InTemplateText = Scan["EndsInStringTemplate"]
		MidTag = Scan["EndsInTag"]
		TagClosing = Scan["TagClosing"]
		TagDepth = max(0, TagDepth + Scan["TagDelta"])

		if not BlockCommentOpen and not Scan["EndsInString"]:
			if MatchImportExportOpen.match(Line):
				InImportBlock = True
			if InImportBlock:
				BraceDepthImport += Line.count("{") - Line.count("}")
				if BraceDepthImport <= 0:
					InImportBlock = False
					BraceDepthImport = 0

			CloseCount = max(0, -Scan["ParenDelta"])
			for _ in range(CloseCount):
				if ParenOpenBraceStack:
					ParenOpenBraceStack.pop()
			for _ in range(max(0, Scan["ParenDelta"])):
				ParenOpenBraceStack.append(BraceDepth)

			ParenDepth = max(0, ParenDepth + Scan["ParenDelta"])
			BraceDepth = max(0, BraceDepth + Scan["BraceDelta"])

			for Delim in Scan["Delims"]:
				if Delim in "([{T":
					DelimStack.append(Delim)
				elif DelimStack:
					DelimStack.pop()

		Output.append(Line)

		InComment = BlockCommentOpen or bool(MatchCommentLine.match(Line))

		if InComment or InImportBlock or Scan["EndsInString"]:
			continue

		# Inside a JSX subtree nothing on the line is a statement: children are
		# text and `{...}` containers are expressions. Prettier reflows them and
		# drops any blank line, so the pass never proposes one there.
		if TagDepth > 0 or MidTag:
			continue

		Stripped = Line.rstrip()
		if not Stripped:
			continue

		Last = Scan["LastChar"]
		if Last is None:
			continue

		if Index + 1 >= len(LineList):
			continue

		NextLine = LineList[Index + 1]
		NextBlank = NextLine.strip() == ""
		NextClosing = bool(MatchClosingToken.match(NextLine))
		NextChain = bool(MatchChainContinue.match(NextLine))

		if NextBlank or NextClosing or NextChain:
			continue

		# A blank line inside an expression does not survive Prettier, so it
		# would be re-inserted on every run. Never propose one.
		if LineContinues(NextLine):
			continue

		if Last in (";", "}"):
			if ParenDepth == 0:
				Output.append("")
			elif ParenOpenBraceStack:
				RelativeBraceDepth = BraceDepth - ParenOpenBraceStack[-1]
				if RelativeBraceDepth > 0:
					Output.append("")

		elif Last == ",":
			if ParenDepth == 0:
				if CommaEndsListMember(NextLine, DelimStack):
					Output.append("")
			elif ParenOpenBraceStack:
				RelativeBraceDepth = BraceDepth - ParenOpenBraceStack[-1]
				if RelativeBraceDepth == 0:
					Output.append("")

	return "\n".join(Output)


# ── CLI ───────────────────────────────────────────────────────────────────────


def ProcessFile(FilePath: Path, DryRun: bool) -> bool:
	try:
		Text = FilePath.read_text(encoding="utf-8")
	except Exception as Error:
		print(f"  ERROR reading {FilePath}: {Error}", file=sys.stderr)
		return False

	NewText = Transform(Text)
	if NewText == Text:
		return False

	if DryRun:
		print(f"[DRY RUN] Would modify: {FilePath}")
	else:
		FilePath.write_text(NewText, encoding="utf-8")
		print(f"Modified: {FilePath}")
	return True


def Main() -> None:
	import argparse

	Parser = argparse.ArgumentParser(
		description=__doc__,
		formatter_class=argparse.RawDescriptionHelpFormatter,
	)
	Parser.add_argument(
		"Files",
		nargs="*",
		help=".ts / .js / .tsx / .jsx file paths (shell globs ok if quoted)",
	)
	Parser.add_argument(
		"--All",
		action="store_true",
		help="Recursively process every .ts / .js / .tsx / .jsx file under the current directory",
	)
	Parser.add_argument(
		"--DryRun",
		action="store_true",
		help="Show what would change without writing anything",
	)
	Args = Parser.parse_args()

	Extensions = {".ts", ".js", ".tsx", ".jsx"}
	Target: list[Path] = []

	if Args.All:
		Target = sorted(
			File
			for File in Path(".").rglob("*")
			if File.is_file()
			and File.suffix in Extensions
			and not any(Part in Exclude for Part in File.parts)
			# Config files belong to Prettier. This blank-line pass and Prettier
			# disagree about blank lines inside expressions, so including the
			# Astro config rewrote it on every run - and Astro restarts the dev
			# server whenever astro.config.* changes.
			and File.name not in ("astro.config.ts", "prettier.config.js")
		)
	else:
		for Pattern in Args.Files:
			Candidate = Path(Pattern)
			if Candidate.is_absolute():
				if Candidate.exists():
					Target.append(Candidate)
				else:
					print(f"Warning: no match for '{Pattern}'", file=sys.stderr)
			else:
				Expanded = sorted(Path(".").glob(Pattern))
				if Expanded:
					Target.extend(Expanded)
				elif Candidate.exists():
					Target.append(Candidate)
				else:
					print(f"Warning: no match for '{Pattern}'", file=sys.stderr)

	if not Target:
		Parser.print_help()
		sys.exit(1)

	Changed = sum(ProcessFile(File, Args.DryRun) for File in Target)
	Total = len(Target)
	Verb = "would change" if Args.DryRun else "changed"
	print(f"\nDone - {Verb} {Changed}/{Total} file(s).")


if __name__ == "__main__":
	Main()
