# Theme — Light + Dark (Cyberpunk HUD)

Two first-class themes. Light is the current austere flat-white system. Dark is the
cyberpunk terminal-HUD. `darkMode: "class"` is already set in `tailwind.config.js`, so dark
mode activates when `<html>` (or a wrapper) carries the `.dark` class.

## Mechanism

All semantic surface tokens live in `:root` (light) in `Source/Stylesheet/Base.css`. Add a
parallel `.dark` block that **overrides only the semantic surface + spine-Fore tokens** — the
raw ramps in `DesignToken.css` stay shared. Components already read tokens, so they re-skin
for free; this is why no per-component dark work is needed for the base pass.

```css
/* Source/Stylesheet/Base.css */
@layer theme {
  :root { /* existing light tokens — unchanged */ }

  .dark {
    /* ── Cyberpunk HUD canvas ── */
    --Background: #0a0a0c;        /* near-black, faint blue cast */
    --Foreground: #e7e7ea;        /* off-white, never pure #fff */
    --Card:       #0e0e12;        /* one step above canvas */
    --CardForeground: #e7e7ea;
    --Popover:    #0e0e12;
    --PopoverForeground: #e7e7ea;

    --Primary:    #e7e7ea;        /* inverts: light text-as-action on dark */
    --PrimaryForeground: #0a0a0c;
    --Secondary:  #16161c;
    --SecondaryForeground: #e7e7ea;
    --Mute:       #111116;
    --MuteForeground: #8a8a93;    /* HUD secondary text */
    --Accent:     #16161c;
    --AccentForeground: #e7e7ea;

    --Border:     rgba(255,255,255,0.10);   /* hairline grid lines */
    --Input:      #0e0e12;
    --Ring:       #22c55e;        /* gRPC green focus ring — neon signal */

    /* Surface depth (dark) */
    --Surface0: #0a0a0c;
    --Surface1: #0e0e12;
    --Surface2: #16161c;
    --Surface3: #1d1d25;
    --Surface4: #26262f;

    /* ── Neon spine accents ──
       Hues stay; *Fore brightens for legibility on dark; *Mute/*Surface
       become low-alpha tints OF the hue ON the dark canvas. */
    --SpinegRPCFore: #4ade80;
    --SpinegRPCMute: color-mix(in srgb, #22c55e 18%, #0a0a0c);
    --SpinegRPCSurface: color-mix(in srgb, #22c55e 8%, #0a0a0c);
    --SpineIPCFore:  #60a5fa;
    --SpineIPCMute:  color-mix(in srgb, #3b82f6 18%, #0a0a0c);
    --SpineIPCSurface: color-mix(in srgb, #3b82f6 8%, #0a0a0c);
    --SpineTCPFore:  #fb923c;
    --SpineTCPMute:  color-mix(in srgb, #f97316 18%, #0a0a0c);
    --SpineTCPSurface: color-mix(in srgb, #f97316 8%, #0a0a0c);
    --SpineWASMFore: #c084fc;
    --SpineWASMMute: color-mix(in srgb, #a855f7 18%, #0a0a0c);
    --SpineWASMSurface: color-mix(in srgb, #a855f7 8%, #0a0a0c);
  }
}
```

Repeat the `*Fore`/`*Mute`/`*Surface` dark overrides for the language/runtime/cloud tech
colors **only as they actually appear on dark surfaces** — don't pre-flip all ~80 unless used.

## Cyberpunk HUD details (dark only)

Restraint is the whole point. Add these as opt-in utilities, not global defaults.

- **Hairline grid backdrop** — a faint `--Border`-colored grid behind hero/section backgrounds
  (CSS `background-image` repeating linear-gradients, ~32–48px cells, very low alpha). Reads as
  blueprint/HUD without noise.
- **Mono eyebrows** — section kickers in Geist Mono, uppercase, tracked, in a spine accent
  `*Fore` color (e.g. `// SYSTEM ONLINE`, `RUST CORE · v2.1`).
- **Interaction-only glow** — focus/hover may add a single soft accent glow
  (`box-shadow: 0 0 0 1px <accent>, 0 0 16px -4px <accent>`). Never a resting-state glow.
- **Sharp corners** — keep `--BorderRadius: 0`. The angular geometry IS the cyberpunk read;
  rounded corners would soften it.
- **Scanline / grain** — optional, *extremely* subtle (≤3% opacity) overlay. The repo already
  has a noise system at `Source/Function/Noise/` and `Source/Background/` — prefer reusing it.

## Light mode — unchanged

Keep the existing flat-white treatment exactly: `#ffffff` canvas, `#1a1a1a` text, zinc
neutrals, spine accents as muted chips, no shadows/gradients/rounded. Light is the "daylight"
counterpart; do not bleed HUD glow/grid into it.

## Theme toggle

- Toggle `.dark` on `document.documentElement`.
- Persist to `localStorage`; initial value = stored pref → else `prefers-color-scheme`.
- Set the class **before first paint** (inline head script) to avoid a flash. Note
  `Base.astro:90` hard-codes `<meta name="theme-color" content="#ffffff">` — make it
  theme-aware (`#0a0a0c` in dark).
- A `Theme` provider/primitive fits `Source/Component/Provider/`; the toggle control fits
  `Source/Component/UI/` and can live in the header.
