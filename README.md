<table>
	<tr>
		<td align="left" valign="middle">
			<h3 align="left">WebSite</h3>
		</td>
		<td align="left" valign="middle">
			<h3 align="left">🗾</h3>
		</td>
		<td align="left" valign="middle">
			<h3 align="left"> + </h3>
		</td>
		<td align="left" valign="middle">
			<h3 align="left">
				<a href="https://editor.land" target="_blank">
					<picture>
						<source media="(prefers-color-scheme: dark)" srcset="https://editor.land/Dark/Image/GitHub/Land.svg">
						<source media="(prefers-color-scheme: light)" srcset="https://editor.land/Image/GitHub/Land.svg">
						<img width="28" alt="Land Logo" src="https://editor.land/Image/GitHub/Land.svg">
					</picture>
				</a>
			</h3>
		</td>
		<td align="left" valign="middle">
			<h3 align="left">
				<a href="https://editor.land" target="_blank">
					Land
				</a>
			</h3>
		</td>
		<td align="left" valign="middle">
			<h3 align="left">🏞️</h3>
		</td>
		<td align="left" valign="middle">
			<h3 align="left"> + </h3>
		</td>
		<td align="left" valign="middle" width="190">
			<h3 align="left">
				<a href="https://Astro.Build" target="_blank">
					<picture>
						<source media="(prefers-color-scheme: dark)" srcset="https://Astro.Build/assets/press/astro-logo-light.svg">
						<source media="(prefers-color-scheme: light)" srcset="https://Astro.Build/assets/press/astro-logo-dark.svg">
						<img width="100" alt="Built With Astro" src="https://Astro.Build/assets/press/astro-logo-dark.svg">
					</picture>
				</a>
			</h3>
		</td>
	</tr>
</table>

---

# **WebSite** 🗾

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://github.com/CodeEditorLand/WebSite/tree/Current/LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D53.svg)](https://Astro.Build)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38BDF8.svg)](https://tailwindcss.com)

Marketing, download, and account portal for **Land**, hosted at
[editor.land](https://editor.land). Built with Astro 5, React 19, Tailwind CSS,
and shadcn/ui. Fully internationalized across 5 locales.

---

## Development 🛠️

**Prerequisites:** Node.js 24+, pnpm 10+

```bash
cd WebSite
pnpm install
cp .env.example .env

pnpm run Run                       # Dev server (port 9999)
pnpm run prepublishOnly            # Production build → Target/
pnpm run test                      # Unit tests
npx tsc --noEmit                   # Type check
npx @biomejs/biome check --write . # Lint + format
```

### Workers 🔗

WebSite connects to 4 Cloudflare Workers:

| Worker        | Port | Purpose                         |
| :------------ | :--- | :------------------------------ |
| **Auth**      | 8787 | Authentication, OAuth, sessions |
| **Download**  | 8788 | Binary distribution, versions   |
| **Analytics** | 8789 | Event tracking, statistics      |
| **Status**    | 8790 | Health monitoring, GitHub API   |

---

## Internationalization 🌍

**5 locales:** English (complete), Bulgarian, German, French, Spanish **8
namespaces:** `common`, `home`, `download`, `account`, `header`, `footer`,
`meta`, `verify`

---

## Design System 🎨

Flat white theme enforced in `Base.css` - no shadows, no dark mode, no rounded
corners. Only exception: `rounded-full` on spinners, badges, and avatars.

---

## License ⚖️

Released into the public domain under **Creative Commons CC0 Universal**. See
[`LICENSE`](https://github.com/CodeEditorLand/WebSite/tree/Current/).

---

## Funding 🙏🏻

Funded through [NGI0 Commons Fund](https://NLnet.NL/commonsfund) via
[NLnet](https://NLnet.NL) with support from the European Commission's
[Next Generation Internet](https://ngi.eu) program.

<table>
	<thead>
		<tr>
			<th align="left"><strong>Land</strong></th>
			<th align="left"><strong>PlayForm</strong></th>
			<th align="left"><strong>NLnet</strong></th>
			<th align="left"><strong>NGI0 Commons Fund</strong></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td align="left" valign="middle">
				<a href="https://editor.land">
					<img width="60" src="https://raw.githubusercontent.com/CodeEditorLand/Asset/refs/heads/Current/Logo/Land.svg" alt="Land">
				</a>
			</td>
			<td align="left" valign="middle">
				<a href="https://PlayForm.Cloud">
					<img width="76" src="https://raw.githubusercontent.com/PlayForm/Asset/refs/heads/Current/Logo/PlayForm.svg" alt="PlayForm">
				</a>
			</td>
			<td align="left" valign="middle">
				<a href="https://NLnet.NL">
					<img width="240" src="https://NLnet.NL/logo/banner.svg" alt="NLnet">
				</a>
			</td>
			<td align="left" valign="middle">
				<a href="https://NLnet.NL/commonsfund">
					<img width="240" src="https://NLnet.NL/image/logos/NGI0CommonsFund_tag_black_mono.svg" alt="NGI0 Commons Fund">
				</a>
			</td>
		</tr>
	</tbody>
</table>

---

**Project Maintainers**: Source Open
([Source/Open@editor.land](mailto:Source/Open@editor.land)) |
[GitHub Repository](https://github.com/CodeEditorLand/WebSite) |
[Report an Issue](https://github.com/CodeEditorLand/WebSite/issues) |
[Security Policy](https://github.com/CodeEditorLand/WebSite/security/policy)
