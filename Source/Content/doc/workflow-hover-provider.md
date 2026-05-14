---
title: "Invoking a Language Feature (Hover Provider)"
section: "Workflow"
order: 14
description:
    "Bi-directional communication: extension registers a feature, Mountain
    orchestrates the request, result displayed in Wind UI."
---

# Invoking a Language Feature (Hover Provider)

A key example of bi-directional communication: an extension in Cocoon registers
a hover provider, Mountain orchestrates the request, and the result is displayed
in the Wind UI.

## Data Flow

```
Phase 1: Registration
  Extension calls vscode.languages.registerHoverProvider('mylang', provider)
  -> Cocoon stores provider with unique handle (e.g. 123)
  -> Cocoon sends $registerHoverProvider gRPC to Mountain
  -> Mountain creates ProviderRegistrationDto
  -> Mountain stores in AppState.LanguageProviders

Phase 2: User Hover Request
  User hovers over a word in a "mylang" file
  -> Monaco hover controller triggers
  -> LanguageFeaturesService.getHover()
  -> TauriInvoke('mountain://language-feature/provide-hover')

Phase 3: Host Orchestration
  -> Mountain queries AppState.LanguageProviders for "mylang" hover providers
  -> Finds registration (handle 123) belonging to cocoon-main
  -> Mountain sends $provideHover gRPC to Cocoon (handle, URI, position)

Phase 4: Extension Execution
  -> Cocoon looks up provider by handle
  -> Calls provider.provideHover(document, position, token)
  -> Extension returns Hover object { contents: ['Hello World'] }
  -> Cocoon serializes to HoverResultDto
  -> Returns to Mountain

Phase 5: UI Update
  -> Mountain returns hover data to Wind
  -> Wind passes data to Monaco controller
  -> Monaco renders tooltip widget
  -> User sees "Hello World" tooltip
```

## Phase 1: Extension Registration (Cocoon)

1. Extension is activated by Cocoon. Its `activate()` function runs.
2. Extension calls `vscode.languages.registerHoverProvider('mylang', provider)`.
3. `LanguageFeaturesProvider` in Cocoon stores the provider in a local map with
   a unique handle.
4. Sends `$registerHoverProvider` gRPC request to Mountain with the handle and
   metadata.

## Phase 2: Host-Side Provider Registration (Mountain)

5. gRPC server receives `$registerHoverProvider` and dispatches to `track`.
6. `LanguageFeatureProvider.RegisterProvider()` executes via `AppRuntime`.
7. `Registration.register_provider()` creates a `ProviderRegistrationDto` and
   stores it in `AppState.LanguageProviders`. Mountain now knows that for
   language "mylang", `cocoon-main` has a hover provider with handle `123`.

## Phase 3: User Interaction and UI Request (Wind/Sky)

8. User hovers over a word in a "mylang" file. Monaco's hover controller
   triggers.
9. `ILanguageFeaturesService.getHover()` creates an Effect that calls
   `TauriInvoke('mountain://language-feature/provide-hover')`.

## Phase 4: Host-Side Orchestration (Mountain -> Cocoon)

10. `LanguageFeatureProvider.ProvideHover()` queries
    `AppState.LanguageProviders` and finds handle `123` belonging to
    `cocoon-main`.
11. Makes `$provideHover` gRPC request to Cocoon with document URI, position,
    and provider handle.

## Phase 5: Extension Execution and Response (Cocoon)

12. Cocoon's gRPC server dispatches to the handler, which looks up the provider
    by handle.
13. Calls `provider.provideHover(document, position, token)`. Extension code
    executes.
14. Extension returns `Hover` object. Handler serializes to `HoverResultDto` and
    returns to Mountain.

## Phase 6: Final UI Update (Mountain -> Wind/Sky)

15. gRPC call resolves with `HoverResultDto`. Result sent back as response to
    the original Tauri invoke.
16. Wind receives hover data, passes to Monaco's hover controller.
17. Monaco renders the tooltip widget on screen.

## Key Source Files

- `Cocoon/src/Service/LanguageFeatures.ts` -- language feature provider
- `Mountain/Source/Environment/LanguageFeatureProvider/Registration.rs` --
  provider registration
- `Mountain/Source/Environment/LanguageFeatureProvider/FeatureMethods.rs` --
  feature execution
- `Mountain/Source/track/TrackLogic.rs` -- track dispatcher

---

## See Also

- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [VS Code API Coverage](https://Editor.Land/Doc/vscode-api-coverage)
