---
title: "Cocoon - VS Code Validation Checklist"
section: "Reference"
order: 3
description:
    "How to verify that a vscode.* API method is correctly implemented in
    Cocoon, with failure modes, a per-API validation matrix, and the steps to
    wire a new method."
---

Cocoon is Land's Node.js extension-host sidecar. It exposes the `vscode`
namespace to extensions by assembling shim modules under
`Source/Services/Handler/VscodeAPI/` and communicating with Mountain over gRPC
(`Vine.proto`) and with Sky via Tauri IPC events. Verifying that an API method
works correctly requires tracing all three layers: the Cocoon shim, the Mountain
handler, and the Sky workbench render path. This checklist documents the
patterns for that trace, the common failure modes, and the steps to add a new
API method.

## How to verify a method is correctly implemented

### Step 1 - enable dual-track logging

Launch with `LAND_DEV_LOG=dual-track,provider-register`. Every IPC dispatch in
Mountain logs the channel name and the route decision (Mountain / Node /
NodeDeferred). Every provider registration in Cocoon logs the namespace and
method name.

Expected output after an extension activates:

```
[dual-track] commands:register → Mountain (fast-path)
[provider-register] hover provider registered for languageId=typescript
```

If an expected line is absent the registration never reached Mountain.

### Step 2 - gRPC round-trip trace

For Track B (Rust-native) methods, verify that the gRPC call completes by
checking Mountain's dev log for the matching handler:

```
[Mountain] GetHoverAtPosition: uri=file:///path/to/file.ts line=12 char=5
[Mountain] GetHoverAtPosition: returning 1 hover item(s)
```

Absence of the second line means Mountain received the request but the Cocoon
provider returned nothing (check the provider registration step above) or the
gRPC response was dropped.

### Step 3 - test extension pattern

The fastest way to exercise a single API method in isolation is a minimal test
extension placed in
`Land/Element/Mountain/Target/debug/extensions/test-<method>/`:

```typescript
// extension.js
const vscode = require("vscode");
exports.activate = (ctx) => {
	// Replace with the method under test
	vscode.window.showInformationMessage("test: showInformationMessage OK");
};
```

```json
// package.json
{
	"name": "test-method",
	"version": "0.0.1",
	"engines": { "vscode": "^1.85.0" },
	"activationEvents": ["onStartupFinished"],
	"main": "./extension.js"
}
```

Launch Land, open DevTools (Cmd+Shift+I), and check the console for the message.
For APIs that require a UI response (dialogs, quick-pick), interact and verify
the return value is surfaced to the extension.

### Step 4 - zero-error assertion

After exercising the feature, grep the Mountain log for failure markers:

```bash
# No activation failures
grep "Activation failed" /tmp/land-mountain.log

# No unhandled IPC methods
grep "(no handler)" /tmp/land-mountain.log
```

Both greps must return empty output for the method under test to be considered
passing.

## Common failure modes

### Missing namespace shim

**Symptom**: Extension calls `vscode.someNamespace.someMethod()` and gets
`TypeError: vscode.someNamespace is undefined` or
`vscode.someNamespace.someMethod is not a function`.

**Cause**: The namespace is not included in the `vscode` object assembled by
`APIFactory.ts`, or the method is not declared on the namespace shim.

**Fix**: Open `Source/Services/Handler/VscodeAPI/APIFactory.ts` and verify the
namespace is assembled. Open the corresponding `<Namespace>/Namespace.ts` and
verify the method is exported.

### Wrong return type

**Symptom**: Extension receives `undefined` or a plain object where it expects a
`vscode.Uri` or `vscode.Position` instance, causing downstream property access
to fail.

**Cause**: Cocoon's shim returns a raw JSON object from Mountain rather than
constructing the correct VS Code type wrapper.

**Fix**: In the shim method, wrap the Mountain response with the appropriate
constructor:

```typescript
// Wrong
return MountainClient.sendRequest("file:stat", { uri });

// Correct
const result = await MountainClient.sendRequest("file:stat", { uri });
return new vscode.FileStat(
	result.type,
	result.ctime,
	result.mtime,
	result.size,
);
```

### Promise not resolved

**Symptom**: Extension awaits a method that hangs indefinitely. Mountain log
shows the request arrived and a response was sent, but the Cocoon `await` never
returns.

**Cause**: The Cocoon shim called `SendNotification` instead of `SendRequest`,
or the Mountain handler returned `Ok(Value::Null)` without wiring the actual
response payload.

**Fix**: Check that the Mountain handler returns a meaningful `Value` (not just
`Value::Null`) and that the Cocoon side uses `SendRequest` (which awaits a
reply) rather than `SendNotification` (fire-and-forget).

### Event not fired

**Symptom**: Extension registers `vscode.workspace.onDidOpenTextDocument` but
the callback is never called when a document opens.

**Cause**: Mountain fires the Sky event (`sky://lifecycle/documentOpened`) but
Cocoon's notification handler does not call `EmitDidOpenTextDocument`, or the
Mountain handler fires the Cocoon gRPC notification but the Cocoon
`NotificationHandler.ts` does not route it to the correct event emitter.

**Fix**: Trace the three-piece event path: Mountain emits → Cocoon
`NotificationHandler.ts` receives → event emitter fires. Each step must be
wired. The VS Code API three-piece pattern is:

1. Mountain fires `sky://` Tauri event **and** sends Cocoon gRPC notification.
2. `Cocoon/Source/Services/Handler/Notification/Handler.ts` routes the gRPC
   notification to the correct `EventEmitter.fire()` call.
3. The namespace shim exposes the emitter as a public `onDid*` event to the
   extension.

### Activation order race

**Symptom**: Extension's `activate()` runs before a dependency extension has
exported its API, causing `vscode.extensions.getExtension('id').exports` to be
`undefined`.

**Cause**: Cocoon's activation queue does not respect `extensionDependencies`
ordering.

**Fix**: Cocoon's `Handler/Extension/Host/Handler.ts` implements topological
activation with an `InProgress` Set for cycle detection. Verify the dependent
extension's `package.json` lists the dependency in `extensionDependencies` -
Cocoon reads this field to order activation.

## Validation matrix for key APIs

| API method                                 | Track | Cocoon shim file                       | Mountain handler                                            | Verified |
| ------------------------------------------ | ----- | -------------------------------------- | ----------------------------------------------------------- | -------- |
| `window.showInformationMessage`            | A     | `Window/Namespace.ts`                  | `sky://ui/show-message-request` → Sky DOM toast             | ✅       |
| `window.showQuickPick`                     | A     | `Window/Namespace.ts`                  | `sky://ui/show-quickpick-request` via `ResolveUIRequest`    | 🟡       |
| `window.showInputBox`                      | A     | `Window/Namespace.ts`                  | `sky://ui/show-inputbox-request` via `ResolveUIRequest`     | 🟡       |
| `window.createTerminal`                    | B     | `Window/Namespace.ts`                  | `terminal:create` → `TerminalProvider` PTY                  | 🟡       |
| `window.createTreeView`                    | A+S   | `Window/Namespace.ts`                  | `tree.register` + `tree:getChildren` gRPC                   | ✅       |
| `window.createStatusBarItem`               | S     | `Window/CreateStatusBarItem.ts`        | `sky://statusbar/update`                                    | ✅       |
| `workspace.openTextDocument`               | A+B   | `Workspace/Namespace/Text/Document.ts` | `file:read` gRPC                                            | ✅       |
| `workspace.applyEdit`                      | A+S   | `Workspace/Namespace/Text/Document.ts` | `sky://workspace/applyEdit`                                 | 🟡       |
| `workspace.getConfiguration`               | A+B   | `Configuration.ts`                     | `Configuration` cache in Mountain                           | ✅       |
| `workspace.findFiles`                      | B     | `Workspace/Namespace/Index.ts`         | `search:findFiles` (globset)                                | ✅       |
| `workspace.fs.readFile`                    | B     | `Workspace/Namespace/Index.ts`         | `file:read` gRPC                                            | ✅       |
| `workspace.onDidChangeTextDocument`        | A     | `Notification/Handler.ts`              | `$acceptModelChanged` gRPC from Mountain                    | ✅       |
| `languages.registerHoverProvider`          | A     | `Languages/Namespace.ts`               | `register_hover_provider` + `GetHoverAtPosition` gRPC       | 🟡       |
| `languages.registerCompletionItemProvider` | A     | `Languages/Namespace.ts`               | `register_completion_item_provider` + `GetCompletions` gRPC | 🟡       |
| `languages.createDiagnosticCollection`     | A+S   | `Languages/Namespace.ts`               | `sky://diagnostics/changed`                                 | ✅       |
| `commands.registerCommand`                 | A+S   | `Commands/Namespace.ts`                | `commands` channel + Sky `CommandRegistry`                  | ✅       |
| `commands.executeCommand`                  | A+S   | `Commands/Namespace.ts`                | `commands:execute` + Sky `ICommandService`                  | ✅       |
| `extensions.getExtension`                  | A     | `Extensions/Namespace.ts`              | `extensions:get`                                            | ✅       |
| `debug.registerDebugConfigurationProvider` | A     | `Debug/Namespace.ts`                   | `register_debug_configuration_provider`                     | 🟡       |
| `debug.startDebugging`                     | A+B   | `Debug/Namespace.ts`                   | `debug:start` **missing**                                   | 🔴       |
| `scm.createSourceControl`                  | A+S   | `Scm/Namespace.ts`                     | `register_scm_provider` + `sky://scm/register`              | 🟡       |
| `authentication.getSession`                | A     | `Authentication/Namespace.ts`          | `$getSession` gRPC                                          | 🟡       |

## How to add a new API method

Adding a new `vscode.*` method requires up to four changes depending on the
track. The full three-piece pattern (Sky → Mountain → Cocoon) applies to any
method that has a UI side effect or needs persistent state.

### 1. Add the proto entry (Track B only)

Open `Land/Element/Vine/Proto/Vine.proto` and add the RPC method to the
appropriate service:

```protobuf
rpc GetNewFeature(GetNewFeatureRequest) returns (GetNewFeatureResponse);

message GetNewFeatureRequest {
    string Uri = 1;
}

message GetNewFeatureResponse {
    string Result = 1;
}
```

### 2. Implement the Mountain handler

Create a new file under `WindServiceHandlers/<Domain>/NewMethod.rs` (one file,
one struct, PascalCase - see
[Mountain naming conventions](/Doc/mountain-naming-conventions)):

```rust
#![allow(non_snake_case, non_camel_case_types)]

use crate::Environment::MountainEnvironment;
use serde_json::Value;

pub struct NewMethod;

impl NewMethod {
    pub async fn Handle(
        Environment: &MountainEnvironment,
        Argument: Value,
    ) -> Result<Value, String> {
        // implementation
        Ok(Value::Null)
    }
}
```

Wire the dispatch arm in `mod.rs`:

```rust
"namespace:newMethod" => NewMethod::Handle(&Environment, Argument).await,
```

Add the channel to `Common/Source/IPC/Channel.rs` (Rust enum) and keep
`Wind/Source/IPC/Channel.ts` in lockstep.

### 3. Add the Cocoon shim method

Open the relevant namespace file under
`Source/Services/Handler/VscodeAPI/<Namespace>/Namespace.ts` and add the method:

```typescript
newMethod: async (param: string): Promise<string> => {
    const Result = await MountainClient.sendRequest(
        Channel.NamespaceNewMethod,
        { param },
    );
    return Result as string;
},
```

If the method fires an event on the extension side, register an `EventEmitter`
and wire it in `Notification/Handler.ts` to fire when Mountain sends the
corresponding gRPC notification.

### 4. Add the Sky bridge handler (if there is a UI side effect)

Open the relevant `Bridge/Install*.ts` file and add a handler for the
`sky://namespace/new-method` URL:

```typescript
window.addEventListener("sky://namespace/new-method", (Event) => {
	const Payload = (Event as CustomEvent).detail;
	// call the live workbench service
	__CEL_SERVICES__.SomeService.doThing(Payload);
});
```

### Verification after wiring

Run the test extension pattern from the verification section above. Check
`LAND_DEV_LOG=dual-track,provider-register` for the new channel appearing in the
dispatch log. Confirm zero `(no handler)` lines for the new channel name.

## Architecture notes

### Effect-TS in Cocoon

Cocoon uses Effect-TS for dependency injection and error management where VS
Code's stock extension host uses a service-collection pattern. The two are
bridged in `Source/Services/Handler/VscodeAPI/` - each namespace shim is a plain
TypeScript module (not an Effect layer) that calls into the Effect-TS service
layer via the `MountainClientService` and `RPCServerService` handles injected at
bootstrap. When adding a new method, stay in plain TypeScript at the namespace
shim level; only reach into Effect-TS if the method requires access to a service
that is already an Effect layer.

### gRPC vs Tauri IPC

Cocoon reaches Mountain in two ways:

- **gRPC** (`Vine.proto`, port 50052) - used for request/response calls from
  Cocoon to Mountain (`CocoonService` RPC methods) and for notifications from
  Mountain to Cocoon (`VineService` / `MountainVineGRPCService`).
- **Tauri IPC** (`sky://` events and `invoke("MountainIPCInvoke", …)`) - used
  for Sky-to-Mountain calls and for Mountain-to-Sky push events.

A method that only needs to call Mountain and return a value uses gRPC. A method
that needs to update the workbench UI uses Tauri IPC to reach Sky. Most Track A
methods use gRPC for the data path and Tauri IPC for the render path.
