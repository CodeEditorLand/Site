import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import * as z from 'zod/v4';
export { z };
import { x as renderElement, s as generateCspDigest, C as spreadAttributes, D as unescapeHTML, B as renderTemplate, A as AstroError, L as LiveContentConfigError, a as AstroUserError, k as RenderUndefinedEntryError, U as UnknownContentCollectionError, G as GetEntryDeprecationError, p as createHeadAndContent, w as renderComponent } from './prerender_DFdx8cgm.mjs';
import { c as createComponent } from './astro-component_e9mGl8K_.mjs';
import 'clsx';
import { r as removeBase, e as isRemotePath, p as prependForwardSlash } from './Vendor/React_DEMYkl39.mjs';
import { V as VALID_INPUT_FORMATS } from './OpenGraph_BCmYe4V8.mjs';
import 'piccolore';
import * as devalue from 'devalue';

function renderScriptElement({ props, children }) {
  return renderElement("script", {
    props,
    children
  });
}
function renderUniqueStylesheet(result, sheet) {
  if (sheet.type === "external") {
    if (Array.from(result.styles).some((s) => s.props.href === sheet.src)) return "";
    return renderElement("link", { props: { rel: "stylesheet", href: sheet.src }, children: "" });
  }
  if (sheet.type === "inline") {
    if (Array.from(result.styles).some((s) => s.children.includes(sheet.content))) return "";
    return renderElement("style", { props: {}, children: sheet.content });
  }
}

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
const CONTENT_LAYER_TYPE = "content_layer";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

function getImporterFilename() {
  const stackLine = new Error().stack?.split("\n").find(
    (line) => !line.includes("defineCollection") && !line.includes("defineLiveCollection") && !line.includes("getImporterFilename") && !line.startsWith("Error")
  );
  if (!stackLine) {
    return void 0;
  }
  const match = /\/((?:src|chunks)\/.*?):\d+:\d+/.exec(stackLine);
  return match?.[1] ?? void 0;
}
function defineCollection$1(config) {
  const importerFilename = getImporterFilename();
  if (importerFilename?.includes("live.config")) {
    throw new AstroError({
      ...LiveContentConfigError,
      message: LiveContentConfigError.message(
        "Collections in a live config file must use `defineLiveCollection`.",
        importerFilename
      )
    });
  }
  if ("loader" in config) {
    if (config.type && config.type !== CONTENT_LAYER_TYPE) {
      throw new AstroUserError(
        `A content collection is defined with legacy features (e.g. missing a \`loader\` or has a \`type\`). Check your collection definitions in ${importerFilename ?? "your content config file"} to ensure that all collections are defined using the current properties.`
      );
    }
    if (typeof config.loader === "object" && typeof config.loader.load !== "function" && ("loadEntry" in config.loader || "loadCollection" in config.loader)) {
      throw new AstroUserError(
        `Live content collections must be defined in "src/live.config.ts" file. Check the loaders used in "${importerFilename ?? "your content config file"}" to ensure you are not using a live loader to define a build-time content collection.`
      );
    }
    config.type = CONTENT_LAYER_TYPE;
  }
  if (!config.type) config.type = "content";
  return config;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_CPbLBNSo.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

function formatZodError(error) {
  return error.issues.map((issue) => `  **${issue.path.join(".")}**: ${issue.message}`);
}
class LiveCollectionError extends Error {
  collection;
  message;
  cause;
  constructor(collection, message, cause) {
    super(message);
    this.collection = collection;
    this.message = message;
    this.cause = cause;
    this.name = "LiveCollectionError";
    if (cause?.stack) {
      this.stack = cause.stack;
    }
  }
  static is(error) {
    return error instanceof LiveCollectionError;
  }
}
class LiveEntryNotFoundError extends LiveCollectionError {
  constructor(collection, entryFilter) {
    super(
      collection,
      `Entry ${collection} \u2192 ${typeof entryFilter === "string" ? entryFilter : JSON.stringify(entryFilter)} was not found.`
    );
    this.name = "LiveEntryNotFoundError";
  }
  static is(error) {
    return error?.name === "LiveEntryNotFoundError";
  }
}
class LiveCollectionValidationError extends LiveCollectionError {
  constructor(collection, entryId, error) {
    super(
      collection,
      [
        `**${collection} \u2192 ${entryId}** data does not match the collection schema.
`,
        ...formatZodError(error),
        ""
      ].join("\n")
    );
    this.name = "LiveCollectionValidationError";
  }
  static is(error) {
    return error?.name === "LiveCollectionValidationError";
  }
}
class LiveCollectionCacheHintError extends LiveCollectionError {
  constructor(collection, entryId, error) {
    super(
      collection,
      [
        `**${String(collection)}${entryId ? ` \u2192 ${String(entryId)}` : ""}** returned an invalid cache hint.
`,
        ...formatZodError(error),
        ""
      ].join("\n")
    );
    this.name = "LiveCollectionCacheHintError";
  }
  static is(error) {
    return error?.name === "LiveCollectionCacheHintError";
  }
}

const cacheHintSchema = z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
async function parseLiveEntry(entry, schema, collection) {
  try {
    const parsed = await z.safeParseAsync(schema, entry.data);
    if (!parsed.success) {
      return {
        error: new LiveCollectionValidationError(collection, entry.id, parsed.error)
      };
    }
    if (entry.cacheHint) {
      const cacheHint = cacheHintSchema.safeParse(entry.cacheHint);
      if (!cacheHint.success) {
        return {
          error: new LiveCollectionCacheHintError(collection, entry.id, cacheHint.error)
        };
      }
      entry.cacheHint = cacheHint.data;
    }
    return {
      entry: {
        ...entry,
        data: parsed.data
      }
    };
  } catch (error) {
    return {
      error: new LiveCollectionError(
        collection,
        `Unexpected error parsing entry ${entry.id} in collection ${collection}`,
        error
      )
    };
  }
}
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./Turbulence_YRmMp-rm.mjs').then(n => n.d);
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
function createGetEntry({ liveCollections }) {
  return async function getEntry(collectionOrLookupObject, lookup) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!lookup)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = lookup;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveEntry() instead of getEntry().`
      });
    }
    if (typeof lookupId === "object") {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `The entry identifier must be a string. Received object.`
      });
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry = store.get(collection, lookupId);
      if (!entry) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import('./Turbulence_YRmMp-rm.mjs').then(n => n.d);
      const data = updateImageReferencesInData(entry.data, entry.filePath, imageAssetMap);
      const result = {
        ...entry,
        data,
        collection
      };
      warnForPropertyAccess(
        result.data,
        "slug",
        `[content] Attempted to access deprecated property on "${collection}" entry.
The "slug" property is no longer automatically added to entries. Please use the "id" property instead.`
      );
      warnForPropertyAccess(
        result,
        "render",
        `[content] Invalid attempt to access "render()" method on "${collection}" entry.
To render an entry, use "render(entry)" from "astro:content".`
      );
      return result;
    }
    return void 0;
  };
}
function warnForPropertyAccess(entry, prop, message) {
  if (!(prop in entry)) {
    let _value = void 0;
    Object.defineProperty(entry, prop, {
      get() {
        if (_value === void 0) {
          console.error(message);
        }
        return _value;
      },
      set(v) {
        _value = v;
      },
      enumerable: false
    });
  }
}
function createGetEntries(getEntry) {
  return async function getEntries(entries) {
    return Promise.all(entries.map((e) => getEntry(e)));
  };
}
function createGetLiveCollection({
  liveCollections
}) {
  return async function getLiveCollection(collection, filter) {
    if (!(collection in liveCollections)) {
      return {
        error: new LiveCollectionError(
          collection,
          `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveCollection() to load regular content collections.`
        )
      };
    }
    try {
      const context = {
        filter,
        collection
      };
      const response = await liveCollections[collection].loader?.loadCollection?.(context);
      if (response && "error" in response) {
        return { error: response.error };
      }
      const { schema } = liveCollections[collection];
      let processedEntries = response.entries;
      if (schema) {
        const entryResults = await Promise.all(
          response.entries.map((entry) => parseLiveEntry(entry, schema, collection))
        );
        for (const result of entryResults) {
          if (result.error) {
            return { error: result.error };
          }
        }
        processedEntries = entryResults.map((result) => result.entry);
      }
      let cacheHint = response.cacheHint;
      if (cacheHint) {
        const cacheHintResult = cacheHintSchema.safeParse(cacheHint);
        if (!cacheHintResult.success) {
          return {
            error: new LiveCollectionCacheHintError(collection, void 0, cacheHintResult.error)
          };
        }
        cacheHint = cacheHintResult.data;
      }
      if (processedEntries.length > 0) {
        const entryTags = /* @__PURE__ */ new Set();
        let latestModified;
        for (const entry of processedEntries) {
          if (entry.cacheHint) {
            if (entry.cacheHint.tags) {
              entry.cacheHint.tags.forEach((tag) => entryTags.add(tag));
            }
            if (entry.cacheHint.lastModified instanceof Date) {
              if (latestModified === void 0 || entry.cacheHint.lastModified > latestModified) {
                latestModified = entry.cacheHint.lastModified;
              }
            }
          }
        }
        if (entryTags.size > 0 || latestModified || cacheHint) {
          const mergedCacheHint = {};
          if (cacheHint?.tags || entryTags.size > 0) {
            mergedCacheHint.tags = [.../* @__PURE__ */ new Set([...cacheHint?.tags || [], ...entryTags])];
          }
          if (cacheHint?.lastModified && latestModified) {
            mergedCacheHint.lastModified = cacheHint.lastModified > latestModified ? cacheHint.lastModified : latestModified;
          } else if (cacheHint?.lastModified || latestModified) {
            mergedCacheHint.lastModified = cacheHint?.lastModified ?? latestModified;
          }
          cacheHint = mergedCacheHint;
        }
      }
      return {
        entries: processedEntries,
        cacheHint
      };
    } catch (error) {
      return {
        error: new LiveCollectionError(
          collection,
          `Unexpected error loading collection ${collection}${error instanceof Error ? `: ${error.message}` : ""}`,
          error
        )
      };
    }
  };
}
function createGetLiveEntry({
  liveCollections
}) {
  return async function getLiveEntry(collection, lookup) {
    if (!(collection in liveCollections)) {
      return {
        error: new LiveCollectionError(
          collection,
          `Collection "${collection}" is not a live collection. Use getCollection() instead of getLiveEntry() to load regular content collections.`
        )
      };
    }
    try {
      const lookupObject = {
        filter: typeof lookup === "string" ? { id: lookup } : lookup,
        collection
      };
      let entry = await liveCollections[collection].loader?.loadEntry?.(lookupObject);
      if (entry && "error" in entry) {
        return { error: entry.error };
      }
      if (!entry) {
        return {
          error: new LiveEntryNotFoundError(collection, lookup)
        };
      }
      const { schema } = liveCollections[collection];
      if (schema) {
        const result = await parseLiveEntry(entry, schema, collection);
        if (result.error) {
          return { error: result.error };
        }
        entry = result.entry;
      }
      return {
        entry,
        cacheHint: entry.cacheHint
      };
    } catch (error) {
      return {
        error: new LiveCollectionError(
          collection,
          `Unexpected error loading entry ${collection} → ${typeof lookup === "string" ? lookup : JSON.stringify(lookup)}`,
          error
        )
      };
    }
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./Turbulence_YRmMp-rm.mjs').then(n => n.d);
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_virtual_astro_get-image_CEjdJZKK.mjs');
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(
        imagePath.replace(/&(?:#x22|quot);/g, '"').replace(/&(?:#x27|apos);/g, "'")
      );
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...{}
    }).filter(([, value]) => value != null).map(([key, value]) => value === "" ? `${key}=""` : `${key}="${escape(String(value))}"`).join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  const copy = structuredClone(data);
  new Traverse(copy).forEach(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
  return copy;
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./OpenGraph_BCmYe4V8.mjs').then(n => n.d);
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: isRemotePath(link) ? link : prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function createReference() {
  return function reference(collection) {
    return z.union([
      z.string(),
      z.object({
        id: z.string(),
        collection: z.string()
      }),
      z.object({
        slug: z.string(),
        collection: z.string()
      })
    ]).transform((lookup, ctx) => {
      if (typeof lookup === "object") {
        if (lookup.collection !== collection) {
          const flattenedErrorPath = ctx.issues[0]?.path?.join(".");
          ctx.addIssue({
            code: "custom",
            message: `**${flattenedErrorPath}**: Reference to ${collection} invalid. Expected ${collection}. Received ${lookup.collection}.`
          });
          return;
        }
        return lookup;
      }
      return { id: lookup, collection };
    });
  };
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}
function defineCollection(config) {
  if (config.type === "live") {
    throw new AstroError({
      ...LiveContentConfigError,
      message: LiveContentConfigError.message(
        "Collections with type `live` must be defined in a `src/live.config.ts` file."
      )
    });
  }
  return defineCollection$1(config);
}
function defineLiveCollection() {
  throw new AstroError({
    ...LiveContentConfigError,
    message: LiveContentConfigError.message(
      "Live collections must be defined in a `src/live.config.ts` file."
    )
  });
}
function createDeprecatedFunction(functionName) {
  return (collection) => {
    const error = new AstroError({
      ...GetEntryDeprecationError,
      message: GetEntryDeprecationError.message(collection, functionName)
    });
    const stackLines = error.stack?.split("\n");
    if (stackLines && stackLines.length > 1) {
      stackLines.splice(1, 1);
      error.stack = stackLines.join("\n");
    }
    throw error;
  };
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

const getEntry = createGetEntry({
	liveCollections,
});

const getEntries = createGetEntries(getEntry);

const reference = createReference();

const getLiveCollection = createGetLiveCollection({
	liveCollections,
});

const getLiveEntry = createGetLiveEntry({
	liveCollections,
});

// TODO: remove in Astro 7
const getEntryBySlug = createDeprecatedFunction('getEntryBySlug');

// TODO: remove in Astro 7
const getDataEntryById = createDeprecatedFunction('getDataEntryById');

export { defineCollection, defineLiveCollection, getCollection, getDataEntryById, getEntries, getEntry, getEntryBySlug, getLiveCollection, getLiveEntry, reference, renderEntry as render };
