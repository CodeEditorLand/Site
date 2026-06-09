# Internationalization

**Implementation:** `Source/Library/I18n/Server.ts`,
`Source/Library/I18n/Client.js`, locale JSON files  
**Audience:** Content contributors, translators

---

## 1. Supported Locales

| Code | Language  | Status                     |
| ---- | --------- | -------------------------- |
| `en` | English   | Complete (source of truth) |
| `bg` | Bulgarian | Active                     |
| `de` | German    | Active                     |
| `fr` | French    | Active                     |
| `es` | Spanish   | Active                     |

Add new locales by creating JSON files under the locale directory alongside
existing `en.json`.

---

## 2. Translation Namespaces

| Namespace  | Purpose                   | Example key root                      |
| ---------- | ------------------------- | ------------------------------------- |
| `common`   | Shared UI strings         | buttons, labels, errors               |
| `home`     | Homepage content          | hero, features, pricing, testimonials |
| `download` | Download page             | build instructions, tables            |
| `account`  | Auth flows                | sign-in, sign-up, reset, verification |
| `header`   | Navigation labels         | menu items, logo                      |
| `footer`   | Footer text and links     | legal, social                         |
| `meta`     | Page SEO                  | title, description                    |
| `verify`   | Email verification states | success, retry, error                 |

Usage in React:

```tsx
const { t } = useTranslation("home");
return <h1>{t("myComponent.title")}</h1>;
```

Usage in Astro (server):

```ts
const T = GetI18n();
<h1>{T('meta.title', { defaultValue: 'Land' })}</h1>
```

---

## 3. Initialization Order

`Base.astro` bootstraps the client `I18n/Client.js` script in `<head>` to ensure
translations are ready before any React component hydrates.

```astro
<script>
	import "@/Library/I18n/Client.js";
</script>
```

React islands carry their own locale context via `I18nProvider` /
`I18nClientProvider`.

---

## 4. Fallbacks & Defaults

- Every `T()` and `t()` call should provide a `defaultValue` unless the string
  is mandatory and covered in `en.json`.
- Missing keys must not throw; they should render the requested key path for
  visibility.

---

## 5. Hardcoded String Policy

Production UI components must not contain hardcoded user-facing strings.
Permitted exceptions:

- Brand terms that appear in every locale (`Land`, `FIDDEE`).
- Developer-facing logs and test files.

---

## 6. Pluralization & Interpolation

Use ICU-style placeholders provided by the i18n library:

```json
{ "downloads": "{count} download", "downloads_plural": "{count} downloads" }
```

```tsx
t("downloads", { count });
```

---

## 7. Locale-Aware Formatting

- Dates and numbers should be formatted within translations rather than via raw
  JS `toLocaleString`.
- Where format strings are reused across locales (e.g., dates in `meta.json`),
  document the expected format shape.

---

## 8. Related Documents

- `BrandManual.md`
- `Internationalization.md` ← you are here
- `ComponentReference.md`, `Typography.md`
