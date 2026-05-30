# Color System

**Scope:** All `Source/Stylesheet/Base.css` token families  
**Audience:** Design system maintainers, contributors

---

## 1. Philosophy

Colors are expressed as **semantic custom properties** in `:root`, then mapped
to Tailwind utilities in `tailwind.config.js`. This means component JSX never
hardcodes raw hex values except for rare intentional state colors
(red/orange/green).

---

## 2. Neutral Palette (Flat White)

| Token                   | Value                 | Role                     |
| ----------------------- | --------------------- | ------------------------ |
| `--Background`          | `#ffffff`             | Page background          |
| `--Foreground`          | `#1a1a1a`             | Primary text             |
| `--Card`                | `#ffffff`             | Card interior            |
| `--CardForeground`      | `#1a1a1a`             | Text inside cards        |
| `--Popover`             | `#ffffff`             | Menu/tooltip background  |
| `--PopoverForeground`   | `#1a1a1a`             | Menu text                |
| `--Primary`             | `#1a1a1a`             | Emphasis / CTA base      |
| `--PrimaryForeground`   | `#ffffff`             | Text on Primary          |
| `--Secondary`           | `#f4f4f5`             | Elevated/hover surface   |
| `--SecondaryForeground` | `#1a1a1a`             | Text on Secondary        |
| `--Mute`                | `#fafafa`             | Subtle background        |
| `--MuteForeground`      | `#71717a`             | Placeholder, helper text |
| `--Accent`              | `#f4f4f5`             | Secondary hover          |
| `--AccentForeground`    | `#1a1a1a`             | Text on Accent           |
| `--Destruct`            | `#dc2626`             | Destructive actions      |
| `--DestructForeground`  | `#ffffff`             | Text on Destruct         |
| `--Border`              | `rgba(0, 0, 0, 0.08)` | Hairline border          |
| `--Input`               | `#ffffff`             | Input background         |
| `--Ring`                | `#1a1a1a`             | Focus ring               |
| `--BackgroundWhite`     | `#ffffff`             | Explicit white surface   |
| `--InputBackground`     | `#ffffff`             | Explicit input white     |
| `--PopoverBackground`   | `#ffffff`             | Explicit popover white   |

---

## 3. Neutral Depth Layers (Surface scale)

Use when layering is needed without color:

| Layer | Token        | Value     |
| ----- | ------------ | --------- |
| 0     | `--Surface0` | `#ffffff` |
| 1     | `--Surface1` | `#fafafa` |
| 2     | `--Surface2` | `#f4f4f5` |
| 3     | `--Surface3` | `#e7e7e9` |
| 4     | `--Surface4` | `#d4d4d8` |

---

## 4. Semantic Token Family Pattern

Every category below follows the same tuple per color:

```
[Category][Name]          → #hex (primary / saturated)
[Category][Name]Mute      → color-mix(in srgb, primary 10-12%, white)
[Category][Name]Surface   → color-mix(in srgb, primary 4-5%, white)
[Category][Name]Fore      → #hex (readable foreground on tint)
```

---

## 5. Protocol / Spine Colors

| Token family | Primary   | Mute | Surface | Fore      |
| ------------ | --------- | ---- | ------- | --------- |
| gRPC         | `#22c55e` | 12%  | 5%      | `#15803d` |
| IPC          | `#3b82f6` | 12%  | 5%      | `#1d4ed8` |
| TCP          | `#f97316` | 12%  | 5%      | `#c2410c` |
| WASM         | `#a855f7` | 12%  | 5%      | `#7e22ce` |

Usage: protocol spine pathways, status indicators, chip labels.

---

## 6. Authentication Tier Colors

| Tier        | Mapping                  |
| ----------- | ------------------------ |
| Cloud       | aliased to `--SpineIPC`  |
| Provider    | aliased to `--SpineWASM` |
| Local-First | aliased to `--SpineTCP`  |

Each retains its Mute / Surface / Fore variants.

---

## 7. Framework / Extension Colors

| Token                       | Primary   | Primary   |
| --------------------------- | --------- | --------- |
| `ExtensionRust`             | `#f87171` | `#b91c1c` |
| `ExtensionTauri`            | `#fbbf24` | `#92400e` |
| `ExtensionEffectTypeScript` | `#22d3d8` | `#0e7490` |
| `ExtensionReact`            | `#60a5fa` | `#1d4ed8` |
| `ExtensionVue`              | `#4ade80` | `#15803d` |
| `ExtensionSvelte`           | `#fb923c` | `#c2410c` |
| `ExtensionNext`             | `#171717` | `#171717` |
| `ExtensionNuxt`             | `#16a34a` | `#14532d` |
| `ExtensionSolid`            | `#446b9e` | `#1e3a5f` |
| `ExtensionAstro`            | `#9333ea` | `#6b21a8` |
| `ExtensionAngular`          | `#dd0031` | `#9b0022` |
| `ExtensionEmber`            | `#e04e39` | `#9b2617` |
| `ExtensionQwik`             | `#18b6f6` | `#0369a1` |
| `ExtensionRemix`            | `#121212` | `#121212` |
| `ExtensionTanStack`         | `#ff4154` | `#be123c` |
| `ExtensionElectron`         | `#47848f` | `#155e75` |

---

## 8. Language Colors

| Token                | Primary   | Fore      |
| -------------------- | --------- | --------- |
| `LanguageTypeScript` | `#3178c6` | `#1e3a8a` |
| `LanguageJavaScript` | `#f7df1e` | `#78350f` |
| `LanguageRust`       | `#ce422b` | `#7f1d1d` |
| `LanguageGo`         | `#00add8` | `#155e75` |
| `LanguagePython`     | `#3572a5` | `#1e3a8a` |
| `LanguageJava`       | `#b07219` | `#78350f` |
| `LanguageKotlin`     | `#7f52ff` | `#4c1d95` |
| `LanguageSwift`      | `#fa7343` | `#c2410c` |
| `LanguageCSharp`     | `#178600` | `#14532d` |
| `LanguageCPlusPlus`  | `#f34b7d` | `#9d174d` |
| `LanguageC`          | `#555555` | `#1c1917` |
| `LanguageZig`        | `#f7a41d` | `#92400e` |
| `LanguageElixir`     | `#6e4a7e` | `#4c1d95` |
| `LanguageElm`        | `#60b5cc` | `#155e75` |
| `LanguageHaskell`    | `#5e5086` | `#3b0764` |
| `LanguageRuby`       | `#701516` | `#450a0a` |
| `LanguagePhp`        | `#4f5d95` | `#1e1b4b` |
| `LanguageDart`       | `#00b4ab` | `#134e4a` |
| `LanguageScala`      | `#dc322f` | `#7f1d1d` |
| `LanguageLua`        | `#000080` | `#1e1b4b` |
| `LanguageShell`      | `#89e051` | `#166534` |
| `LanguageNix`        | `#7e7eff` | `#3730a3` |

---

## 9. Runtime Colors

| Token         | Primary                  | Fore      |
| ------------- | ------------------------ | --------- |
| `RuntimeNode` | `#5fa04e`                | `#166534` |
| `RuntimeDeno` | `#070707`                | `#070707` |
| `RuntimeBun`  | `#fbf0df`                | `#92400e` |
| `RuntimeWASM` | aliased to `--SpineWASM` | -         |

---

## 10. Database Colors

| Token                 | Primary   | Fore      |
| --------------------- | --------- | --------- |
| `DatabasePostgres`    | `#336791` | `#1e3a5f` |
| `DatabaseMySQL`       | `#4479a1` | `#1e3a5f` |
| `DatabaseSQLite`      | `#003b57` | `#1e3a5f` |
| `DatabaseMongoDB`     | `#47a248` | `#14532d` |
| `DatabaseRedis`       | `#dc382d` | `#7f1d1d` |
| `DatabasePlanetScale` | `#000000` | `#000000` |
| `DatabaseTurso`       | `#4ff8d2` | `#134e4a` |
| `DatabaseNeon`        | `#00e699` | `#064e3b` |
| `DatabaseSupabase`    | `#3ecf8e` | `#065f46` |

---

## 11. Cloud / Deployment Colors

| Token             | Primary   | Fore      |
| ----------------- | --------- | --------- |
| `CloudAWS`        | `#ff9900` | `#92400e` |
| `CloudAzure`      | `#0078d4` | `#1e3a8a` |
| `CloudGCP`        | `#4285f4` | `#1d4ed8` |
| `CloudCloudflare` | `#f48120` | `#c2410c` |
| `CloudVercel`     | `#000000` | `#000000` |
| `CloudNetlify`    | `#00c7b7` | `#134e4a` |
| `CloudFly`        | `#7b3fe4` | `#4c1d95` |
| `CloudRailway`    | `#0b0d0e` | `#0b0d0e` |

---

## 12. Build Tool / Bundler Colors

| Token         | Primary   | Fore      |
| ------------- | --------- | --------- |
| `ToolVite`    | `#646cff` | `#3730a3` |
| `ToolWebpack` | `#8dd6f9` | `#0369a1` |
| `ToolRollup`  | `#ec4a3f` | `#7f1d1d` |
| `ToolTurbo`   | `#ef4444` | `#7f1d1d` |
| `ToolEsBuild` | `#ffcf00` | `#78350f` |
| `ToolBiome`   | `#f7891c` | `#9a3412` |
| `ToolOxc`     | `#f97316` | `#c2410c` |

---

## 13. Operating System Colors

| Token       | Primary   | Fore      |
| ----------- | --------- | --------- |
| `OSLinux`   | `#fcc624` | `#78350f` |
| `OSMacOS`   | `#999999` | `#1c1917` |
| `OSWindows` | `#00a4ef` | `#1d4ed8` |
| `OSAndroid` | `#3ddc84` | `#14532d` |
| `OSIOS`     | `#000000` | `#000000` |

---

## 14. Platform Indicator Colors

| Token               | Primary   | Fore      |
| ------------------- | --------- | --------- |
| `PlatformWeb`       | `#60a5fa` | `#1d4ed8` |
| `PlatformDesktop`   | `#94a3b8` | `#334155` |
| `PlatformMobile`    | `#f472b6` | `#9d174d` |
| `PlatformCLI`       | `#22c55e` | `#15803d` |
| `PlatformExtension` | `#a855f7` | `#7e22ce` |
| `PlatformEmbedded`  | `#f97316` | `#c2410c` |

---

## 15. Identity Provider / OAuth Colors

| Token               | Primary   | Fore      |
| ------------------- | --------- | --------- |
| `ProviderGitHub`    | `#171515` | `#171515` |
| `ProviderGoogle`    | `#4285f4` | `#1d4ed8` |
| `ProviderGitLab`    | `#fc6d26` | `#c2410c` |
| `ProviderMicrosoft` | `#00a4ef` | `#1d4ed8` |
| `ProviderOkta`      | `#007dc1` | `#1e3a8a` |
| `ProviderAuth0`     | `#eb5424` | `#c2410c` |
| `ProviderBitbucket` | `#0052cc` | `#1e3a8a` |
| `ProviderLinkedIn`  | `#0a66c2` | `#1e3a8a` |
| `ProviderApple`     | `#000000` | `#000000` |

---

## 16. Chart / Data Visualization Colors

| Token    | Hex       |
| -------- | --------- |
| `Chart1` | `#3b82f6` |
| `Chart2` | `#22c55e` |
| `Chart3` | `#f97316` |
| `Chart4` | `#a855f7` |
| `Chart5` | `#f43f5e` |
| `Chart6` | `#06b6d4` |
| `Chart7` | `#eab308` |
| `Chart8` | `#8b5cf6` |

---

## 17. Direct State Colors (intentional exceptions)

When semantic tokens are not expressive enough, these literal hue sets are used
directly:

| State               | Background               | Border                        | Text                   | Used in                      |
| ------------------- | ------------------------ | ----------------------------- | ---------------------- | ---------------------------- |
| Error / destructive | `red-50` or `bg-red-200` | `red-200` or `border-red-200` | `red-600` or `red-700` | Validation, destructive CTAs |
| Warning             | `yellow-50`              | `yellow-200`                  | `yellow-700`           | Account warnings             |
| Success             | `green-50`               | `green-200`                   | `green-700`            | Verification, success toasts |
| Local-first / scan  | `orange-50`              | `orange-300`                  | `orange-700`           | Local-first scan action      |

Rule: always pair bg + border + text; do not mix these with neutral semantic
tokens.

---

## 18. Token Extension Workflow

1. Add token in `:root` in `Source/Stylesheet/Base.css`.
2. Repeat with `/Mute`, `/Surface`, `/Fore` suffix variants (or document why
   not).
3. Add Tailwind mapping in `tailwind.config.js -> theme.extend.colors`.
4. Document here in the correct section.

---

## 19. Related Documents

- `BrandManual.md` - design philosophy and core principles
- `ColorSystem.md` ← you are here
- `Typography.md`, `SpacingLayout.md`, `ShapeEdgeSystem.md`, `LogoAssets.md`,
  `ComponentReference.md`, `StaccatoSystem.md`, `StateFeedbackColors.md`,
  `LayoutPatterns.md`, `Accessibility.md`, `MotionPerformance.md`,
  `Internationalization.md`, `NamingVisualLanguage.md`
