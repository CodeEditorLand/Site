# Copy & Voice

Tone is part of the design language. The serif display headline + benefit sentence + mono
technical sub-label is the intended rhythm — the *words* have to match that rhythm too.

## The problem we're fixing

There are two English voices in the wild:

- **Default site copy (`En/*.json`) — needlessly super-technical.** Dense engineering prose,
  internal codenames in the first sentence, and hedged disclaimers that undercut the pitch
  (*"before a reproducible suite exists"*, *"still in progress"*, *"still being filled in"*).
  It reads like an internal design doc, not a product page.
- **An older, more marketing-toned English variant** (reachable via the language selector).
  Benefit-led, confident, human.

**Decision:** standardize on the **marketing-led voice for top-of-funnel** (hero, features,
pricing, footer CTA) and reserve the **deep-technical voice for docs** (`Source/Content/doc/`).
Don't ship two competing English strings.

## Voice rules (top-of-funnel)

1. **Lead with the benefit, not the mechanism.** What the user gets, before how it's built.
2. **One proof point, then stop.** A single concrete technical detail earns trust; three
   bury it. Move the rest to docs.
3. **No hedging on marketing pages.** Cut "still in progress", "before X exists", "depends on".
   Status belongs on a roadmap/status page (`Source/Content/en/status.md` already exists) or a
   mono sub-label — not mid-pitch.
4. **Codenames second, not first.** A newcomer doesn't know "Mountain", "Cocoon", "Wind". Say
   what it does, *then* (optionally) name it. See glossary below.
5. **Confident, plain, technical-respectful.** The audience is developers — don't dumb down,
   don't show off. Short declarative sentences.
6. **Rhythm pairs with type:** serif headline (benefit) → Geist body sentence (proof) → Geist
   Mono sub-label (the spec/caveat in small caps).

## Before → after (grounded in current strings)

**Hero subtitle**
- *Now:* "VS Code runs on Electron. Land is rebuilding the editor stack around Rust, Tauri, and
  Effect-TS while keeping the VS Code extension API as the compatibility target. The primary
  path is source-build first today, with public installers and long-tail extension coverage
  still in progress."
- *Marketing:* "A native code editor with the soul of VS Code — and none of the browser. Built
  on Rust and Tauri, compatible with the extensions you already use."
  `mono sub-label → SOURCE-BUILD FIRST · INSTALLERS SOON`

**Feature: "Native services where they count."**
- *Now:* "Mountain handles window management, file I/O, child processes, terminal IPC, and
  extension communication through Tauri — using the ActionEffect system for declarative,
  dispatchable operations. Echo provides work-stealing scheduler primitives for bounded
  background work…"
- *Marketing:* "Heavy editor work runs natively — not trapped in a web view. Window management,
  file I/O, and terminal IPC go straight through a Rust + Tauri services layer."
  (Drop the benchmark caveat here; it lives in docs.)

**Feature: "Fibers, not Promises."**
- Keep the headline — it's a great technical hook for this audience — but pair it with a plain
  benefit line: "Failures are typed, traceable, and cancellable, so the editor fails loudly in
  development instead of silently in production." (Effect-TS detail → docs.)

**Feature: "Unmodified extensions, no fork path."**
- *Marketing:* "Your VS Code extensions run unmodified — no forks, no rewrites." One proof:
  "A compatibility host speaks the VS Code extension API directly." Coverage caveats → docs.

## Where the strings live

```
Source/Library/I18n/Locale/<Lang>/   En, Bg, De, Es, Fr
  Home.json     hero + features (the main offenders)
  Header.json   nav
  Footer.json   footer + CTA
  Meta.json     <title>/<meta> SEO copy
  Download.json Doc.json Blog.json Account.json Verify.json Common.json
```

`Source/Library/I18n/Client.ts` / `Server.ts` load + select locale. When rewriting English,
**mirror the new keys across all five locales** (or leave a clear TODO) so the language
selector stays consistent — the whole point is to not have divergent variants again.

## Product glossary (keep names consistent)

| Codename | What it is | Say in marketing copy |
|---|---|---|
| **Land** | The product / editor | "Land", "the editor" |
| **Mountain** | Rust + Tauri native services (windows, FS, IPC) | "the native services layer" |
| **Cocoon** | VS Code extension host (Effect-TS, compat) | "the extension host" |
| **Wind** | Effect-TS Layer composition of services | "typed service composition" |
| **Echo** | Work-stealing scheduler primitives | "background work scheduler" |
| **Air** | Background daemon: updates, indexing, signing | "the background daemon" |

Lead with the plain phrase; the codename is flavor, not the headline.
