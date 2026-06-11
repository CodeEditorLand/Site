---
title: "Invoking a Language Feature Hover Provider"
section: "Workflows"
order: 2
description:
    "How a user hover in Monaco triggers a round-trip through Wind, Mountain
    IPC, a Cocoon gRPC call to the registered extension provider, and back."
---

A hover provider demonstrates the full five-element request cycle: registration
flows from Cocoon to Mountain at activation time, then each live hover request
flows Sky → Wind → Mountain → Cocoon → extension → back the same way. Mountain
acts as the broker that maps language selectors to provider handles and routes
requests to the correct sidecar.

## Phase 1 - Extension registration (Cocoon → Mountain)

1. The extension is activated by Cocoon. Its `activate()` function runs and
   calls:

    ```ts
    vscode.languages.registerHoverProvider("mylang", provider);
    ```

2. Cocoon's `LanguageFeaturesProvider` stores the `provider` object in a local
   handle map - for example, under handle `123` - and sends a
   **`$registerHoverProvider` gRPC request** to Mountain. The request carries
   the handle, the language selector (`"mylang"`), and the owning extension ID.

3. Mountain's Vine gRPC server receives the request and dispatches it through
   the `track` module to `LanguageFeatureProvider.RegisterProvider()`.

4. `Registration.register_provider()` creates a `ProviderRegistrationDto`
   (handle `123`, type `Hover`, language `"mylang"`, sidecar `"cocoon-main"`)
   and stores it in `AppState.LanguageProviders`. Mountain now knows which
   sidecar owns which provider for which language.

## Phase 2 - User hover request (Sky → Wind → Mountain)

5. The user moves the mouse over a symbol in an editor showing a `"mylang"`
   file. Monaco's internal hover controller fires and calls
   `ILanguageFeaturesService.getHover()` in Wind.

6. The service constructs an Effect that calls:

    ```ts
    TauriInvoke("mountain://language-feature/provide-hover", {
    	uri,
    	position,
    });
    ```

    This crosses the webview boundary and reaches Mountain's IPC dispatcher.

## Phase 3 - Mountain orchestrates the request (Mountain → Cocoon)

7. Mountain's `LanguageFeatureProvider.ProvideHover()` queries
   `AppState.LanguageProviders` for all registered hover providers matching the
   document's language (`"mylang"`). It finds handle `123` belonging to
   `"cocoon-main"`.

8. Mountain sends a **`$provideHover` gRPC request** to Cocoon with the document
   URI, cursor position, and provider handle `123`.

## Phase 4 - Extension execution (Cocoon)

9. Cocoon's gRPC server dispatches the request to the language provider handler,
   which looks up handle `123` in its local map and retrieves the original
   `provider` object.

10. The handler calls:

    ```ts
    provider.provideHover(document, position, token);
    ```

    The extension's code executes and returns a `Hover` object, for example
    `{ contents: ["Hello World"] }`.

11. The handler serialises the result into a `HoverResultDto` and returns it to
    Mountain as the gRPC response.

## Phase 5 - Result reaches the UI (Mountain → Wind → Sky)

12. Mountain receives the `HoverResultDto`, serialises it, and sends it back as
    the response to the original `TauriInvoke` call from step 6.

13. Wind's `getHover` Effect resolves. The service passes the `Hover` data to
    Monaco's hover controller.

14. Monaco renders the tooltip widget on screen. The user sees the "Hello World"
    hover card.

## Resolve methods

Two-phase providers return a partial result from `$provide*` and then expect a
`$resolve*` call to fill in expensive-to-compute fields. The following resolve
methods are fully routed through `FeatureMethods.rs` via the same
`InvokeLanguageProvider` dispatch path as `$provideHover` and return results to
the caller rather than being dropped:

- `$resolveCodeAction`
- `$resolveCompletionItem`
- `$resolveHover`
- `$resolveInlayHint`
- `$resolveDocumentLink`
- `$resolveWorkspaceSymbol`

## Inline completions

The same gRPC dispatch path handles inline completion providers (used by Copilot
and similar tools). When an extension calls
`vscode.languages.registerInlineCompletionItemProvider()`, the handle is stored
in `AppState.LanguageProviders` under the `InlineCompletion` type. Sky registers
the provider with `ILanguageFeaturesService.inlineCompletionsProvider` via the
`sky://language/register-inline-completions` bridge channel. When the editor
requests completions, Mountain routes `language:provideInlineCompletions` through
the same `LanguageFeatureProviderRegistry` trait and gRPC path as hover,
returning `InlineCompletionItem[]` to the editor.

> [!IMPORTANT] The same registration and dispatch pattern applies to every
> language feature (`$registerCompletionItemProvider`,
> `$registerDefinitionProvider`, etc.). The only difference is the gRPC method
> name and the DTO shape. Mountain always stores handle → sidecar mappings in
> `AppState.LanguageProviders` and routes each `$provide*` call to the correct
> sidecar at request time.
