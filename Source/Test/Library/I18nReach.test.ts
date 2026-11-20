/**
 * The routes whose copy lives in a page-specific namespace.
 *
 * `Client.ts` is imported first on purpose: it initialises the shared i18next
 * instance at import time with the four core namespaces, which is exactly the
 * order every prerendered route sees (it is in the module graph through
 * `Footer` -> `LocaleSwitcher`). A test that imported `Server.ts` alone would
 * let `GetI18n()`'s own `init` run with every bundle and would pass whether or
 * not the page declared its namespace - the defect this file guards.
 *
 * The sentinel `defaultValue` is the assertion: if the key resolves from the
 * locale file the sentinel is never returned, so a row cannot pass by printing
 * its fallback, which is written to match the file.
 *
 * Three halves, and none is enough alone: the first proves a declared bundle is
 * readable end to end, the second proves every key a page *asks* for is in the
 * bundle that page names, and the third proves each route declares the
 * namespaces it reads before the first `GetI18n()` call. A live bundle that no
 * route declares is the original defect; a declaration whose file is missing a
 * key still prints the fallback; and a call site in a bundle with no entry for
 * it is the same defect one level down - the page prints a sentence no file
 * holds, so no translator can see it and no edit to the file can change it.
 */
import { readFileSync, readdirSync } from "node:fs";

import { dirname, join, relative } from "node:path";

import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import "@/Library/I18n/Client.js";

import Account from "@/Library/I18n/Locale/En/Account.json";

import Download from "@/Library/I18n/Locale/En/Download.json";

import Footer from "@/Library/I18n/Locale/En/Footer.json";

import Home from "@/Library/I18n/Locale/En/Home.json";

import Verify from "@/Library/I18n/Locale/En/Verify.json";

import { GetI18n, LoadServerNamespace } from "@/Library/I18n/Server.js";

/** A value no locale file contains. */
const Sentinel = "__MISSING_KEY__";

/** `portal.<tier>.<kind>.<key>` as `Portal.ts` addresses it. */
const Portal = Account.portal as unknown as Record<
	string,
	Record<string, Record<string, string>>
>;

const TierList = ["cloud", "provider", "localfirst", "enterprise"] as const;

const KindList = ["feature", "capability"] as const;

LoadServerNamespace("verify", "account", "home", "download");

const T = GetI18n();

/** Every key `DynamicEmailVerification` / `VerifyContent` asks for. */
const VerifyKeys = [
	"auth.pendingStatus",
	"auth.verifyingStatus",
	"auth.verifiedStatus",
	"auth.failedStatus",
	"verifying.title",
	"verifying.description",
	"errorGeneric",
	"resendFailed",
	"resendSuccess",
	"resendCooldown",
	"emailLabel",
	"emailPlaceholder",
	"pending.title",
	"pending.description",
	"pending.resendButton",
	"success.title",
	"success.description",
	"success.continueButton",
	"error.title",
	"error.description",
	"error.backToSignInButton",
] as const;

/** Every Portal row, as the tier / kind / key triple `Portal.ts` builds. */
const PortalRows: readonly (readonly [string, string, string])[] =
	TierList.flatMap((Tier) =>
		KindList.flatMap((Kind) =>
			Object.keys(Portal[Tier]![Kind]!).map(
				(Key) => [Tier, Kind, Key] as const,
			),
		),
	);

/** Every leaf key of a bundle, in the dotted form `i18next` addresses it by. */
const LeafKeyList = (Node: unknown, Prefix = ""): string[] => {
	if (typeof Node === "string") {
		// An empty string is a deliberate blank (`home:hero.title`), not copy.
		return Prefix && Node !== "" ? [Prefix] : [];
	}

	if (Node && typeof Node === "object") {
		return Object.entries(Node as Record<string, unknown>).flatMap(
			([Key, Value]) =>
				LeafKeyList(Value, Prefix ? `${Prefix}.${Key}` : Key),
		);
	}

	return [];
};

/** The page-specific bundles a prerendered route can declare. */
const BundlePairList: ReadonlyArray<readonly [string, unknown]> = [
	["home", Home],
	["download", Download],
	["account", Account],
	["verify", Verify],
	["footer", Footer],
];

/**
 * The namespace each route declares, by the page it lives in.
 *
 * `/` reads `home` for the hero and the five bands, and `download` for the
 * download band's title and subtitle. `/Specimen` prints `home:features.item.*`
 * through the properties grid and the bands' own headings, but prints none of
 * `Download/Data.ts`'s sentences - proved by mutating `Download.json` and
 * finding no sentinel on the sheet - so it declares one namespace, not two.
 * `/Contents` reaches `Content/Home/Band.ts` but never calls `HomeBands`, so it
 * declares none.
 */
const RouteNamespace: ReadonlyArray<readonly [string, readonly string[]]> = [
	["pages/index.astro", ["home", "download"]],
	["pages/Download.astro", ["download"]],
	["pages/Dashboard.astro", ["account"]],
	["pages/OAuth/Success.astro", ["account"]],
	["pages/Specimen.astro", ["home"]],
	["pages/Portal.astro", ["account"]],
	["pages/Verify.astro", ["verify"]],
];

describe("page-specific namespaces reach the server translator", () => {
	it("resolves every key the verify card asks for", () => {
		const Unresolved = VerifyKeys.filter(
			(Key) =>
				T(`verify:${Key}`, { defaultValue: Sentinel }) === Sentinel,
		);

		expect(Unresolved).toEqual([]);
	});

	it("resolves all 49 Portal rows from Account.json", () => {
		const Unresolved = PortalRows.filter(
			([Tier, Kind, Key]) =>
				T(`account:portal.${Tier}.${Kind}.${Key}`, {
					defaultValue: Sentinel,
				}) === Sentinel,
		);

		expect(PortalRows).toHaveLength(49);

		expect(Unresolved).toEqual([]);
	});

	it("prints the file's sentence, not the row's fallback", () => {
		const Sentence = Portal["localfirst"]!["capability"]!["mtls"]!;

		expect(
			T("account:portal.localfirst.capability.mtls", {
				defaultValue: Sentinel,
			}),
		).toBe(Sentence);
	});
});

describe("a declared bundle is readable end to end", () => {
	it("resolves every leaf of Home.json, Download.json, Account.json and Verify.json", () => {
		const Unresolved = BundlePairList.flatMap(([Namespace, Bundle]) =>
			LeafKeyList(Bundle)
				.filter(
					(Key) =>
						T(`${Namespace}:${Key}`, {
							defaultValue: Sentinel,
						}) === Sentinel,
				)
				.map((Key) => `${Namespace}:${Key}`),
		);

		expect(Unresolved).toEqual([]);
	});

	it("returns the audited file text for the pairs the render fell back on", () => {
		expect(T("download:state.preparing", { defaultValue: Sentinel })).toBe(
			"STATUS: PREPARING",
		);

		expect(
			T("download:systemRequirements.subtitle", {
				defaultValue: Sentinel,
			}),
		).toBe(Download.systemRequirements.subtitle);

		expect(
			T("download:previousReleases.heading", {
				defaultValue: Sentinel,
			}),
		).toBe("Nothing to go back to yet.");

		expect(
			T("account:dashboardPage.surface.state.signedOut", {
				defaultValue: Sentinel,
			}),
		).toBe(Account.dashboardPage.surface.state.signedOut);

		expect(
			T("home:hero.claim.standfirst", { defaultValue: Sentinel }),
		).toBe(Home.hero.claim.standfirst);
	});
});

/**
 * The bundle behind each namespace a `T("ns:key")` call site can name.
 *
 * Measured over `Source/` (this tree excluded): 205 call sites, and they name
 * exactly these five namespaces. A call site in a namespace missing from this
 * map is reported rather than skipped, so a sixth namespace cannot enter the
 * source and leave the suite quietly resolving nothing.
 */
const CallSiteBundle: Readonly<Record<string, unknown>> = {
	account: Account,
	download: Download,
	footer: Footer,
	home: Home,
	verify: Verify,
};

/** A `T("ns:key")` call whose first argument is a qualified literal. */
const QualifiedCall = /(?<![\w$.])(?:T|t)\(\s*"([a-z]+):([^"]+)"/g;

/** The string a dotted key addresses in a bundle, or `undefined`. */
const ResolveKey = (Bundle: unknown, Key: string): string | undefined => {
	let Node: unknown = Bundle;

	for (const Part of Key.split(".")) {
		if (!Node || typeof Node !== "object") return undefined;

		Node = (Node as Record<string, unknown>)[Part];
	}

	return typeof Node === "string" ? Node : undefined;
};

/** Every source file under a directory, skipping this suite's own tree. */
const SourceFileList = (Directory: string): string[] =>
	readdirSync(Directory, { withFileTypes: true }).flatMap((Entry) => {
		const Path = join(Directory, Entry.name);

		if (Entry.isDirectory()) {
			return Entry.name === "Test" ? [] : SourceFileList(Path);
		}

		return /\.(?:ts|tsx|astro|js|jsx)$/.test(Entry.name) ? [Path] : [];
	});

describe("every key a page prints is in the bundle it names", () => {
	it("has no call site whose key the English bundle lacks", () => {
		const SourceRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

		const ProblemList: string[] = [];

		for (const Path of SourceFileList(SourceRoot)) {
			/* Prose is not a call: a docblock may name a key the route does not
			   read (`verify:...` in `DynamicEmailVerification`'s head), so
			   comments are stripped before the scan - the same way the route
			   declaration test below compares positions. A block comment is
			   blanked in place, keeping its newlines, so the line a failure
			   names is the line the call site is on. */
			const Code = readFileSync(Path, "utf8")
				.replace(/\/\*[\s\S]*?\*\//g, (Comment) =>
					Comment.replace(/[^\n]/g, " "),
				)
				.replace(/^[ 	]*\/\/.*$/gm, "");

			for (const Match of Code.matchAll(QualifiedCall)) {
				const Namespace = Match[1]!;
				const Key = Match[2]!;
				const Line = Code.slice(0, Match.index ?? 0).split("\n").length;
				const Where = `${relative(SourceRoot, Path)}:${Line}`;

				if (!(Namespace in CallSiteBundle)) {
					ProblemList.push(
						`${Where} ${Namespace}:${Key} - namespace this suite does not resolve`,
					);

					continue;
				}

				if (ResolveKey(CallSiteBundle[Namespace], Key) === undefined) {
					ProblemList.push(
						`${Where} ${Namespace}:${Key} - no such leaf in ${Namespace}.json`,
					);
				}
			}
		}

		expect(ProblemList).toEqual([]);
	});
});

describe("each route declares the namespaces it reads", () => {
	it("calls LoadServerNamespace with them, before the first GetI18n()", () => {
		const ProblemList: string[] = [];

		/* `new URL("...", import.meta.url)` is rewritten by Vite's asset pass,
		   which hands back `undefined` for a computed path; the source root is
		   resolved from this module's own file instead. */
		const SourceRoot = join(
			dirname(fileURLToPath(import.meta.url)),

			"../..",
		);

		for (const [Route, NamespaceList] of RouteNamespace) {
			const Source = readFileSync(join(SourceRoot, Route), "utf8");

			/* Prose in a comment is not a call: the page's own comment may name
			   `GetI18n()` before the declaration line, so comments are stripped
			   before the two positions are compared. */
			const Code = Source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(
				/^\s*\/\/.*$/gm,

				" ",
			);

			const Call = /LoadServerNamespace\(([^)]*)\)/.exec(Code);

			if (!Call) {
				ProblemList.push(`${Route}: no LoadServerNamespace call`);

				continue;
			}

			for (const Namespace of NamespaceList) {
				if (!Call[1]!.includes(`"${Namespace}"`)) {
					ProblemList.push(
						`${Route}: ${Namespace} is read but not declared`,
					);
				}
			}

			const FirstGet = Source.indexOf("GetI18n()");

			if (FirstGet !== -1 && Call.index > FirstGet) {
				ProblemList.push(`${Route}: declared after GetI18n()`);
			}
		}

		expect(ProblemList).toEqual([]);
	});
});
