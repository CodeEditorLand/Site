import { t as typeHandlers, b as types, A as AstroError, N as NoImageMetadata, c as FailedToFetchRemoteImageDimensions, i as isRemoteAllowed, R as RemoteImageNotAllowed, I as InvalidComponentArgs, d as createRenderInstruction, E as ExpectedImage, L as LocalImageUsedWrongly, e as MissingImageDimension, U as UnsupportedImageFormat, f as IncompatibleDescriptorOptions, g as UnsupportedImageConversion, h as ExpectedImageOptions, j as ExpectedNotESMImage, k as InvalidImageService, l as ImageMissingAlt, m as maybeRenderHead, n as addAttribute, s as spreadAttributes, a as renderTemplate, o as FontFamilyNotFound, u as unescapeHTML, r as renderComponent, p as renderSlot, q as renderHead } from './prerender_DmvbPVCR.mjs';
import 'piccolore';
import { j as joinPaths, i as isRemotePath } from './Vendor/React_CJ8Txpwi.mjs';
import { clsx } from 'clsx';
import * as mime from 'mrmime';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Component, createContext, useState, useEffect, useContext, useRef } from 'react';
import * as lucide from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { twMerge } from 'tailwind-merge';
import i18n from 'i18next';
import BgAccount from './Account_BKTiCaZl.mjs';
import BgCommon from './Common_B4_hZWTk.mjs';
import { E as EsDownload, D as DeDownload, B as BgDownload } from './Turbulence_Befh_LQB.mjs';
import { F as FrMeta, a as FrFooter, b as FrHeader, D as DeFooter, B as BgFooter, c as BgHeader, E as EnHeader } from './Meta_BwDJIdGz.mjs';
import BgHome from './Home_DUoeqFBN.mjs';
import { B as BgMeta, E as EnMeta } from './Meta_BB53_92C.mjs';
import { F as FrVerify, B as BgVerify } from './Verify_DF_my25B.mjs';
import DeAccount from './Account_6oWojYfO.mjs';
import DeCommon from './Common_lnR7C97W.mjs';
import { E as EsHeader, F as FrDownload, D as DeHeader, a as EnVerify } from './_virtual_astro_server-island-manifest_DfGB_8Yz.mjs';
import DeHome from './Home_D_pcptG0.mjs';
import { E as EsMeta, D as DeMeta } from './Meta_DTIR1Ufs.mjs';
import { E as EsVerify, D as DeVerify } from './Verify_BEAbsfy7.mjs';
import EnAccount from './Account_BOp5uuQd.mjs';
import EnCommon from './Common_DyJubsMi.mjs';
import { E as EsFooter, a as EnFooter, b as EnDownload } from './Parallax_CxMoNu1O.mjs';
import EnHome from './Home_DB-NDn7-.mjs';
import EsAccount from './Account_I3HxFODb.mjs';
import EsCommon from './Common_PvKORRpV.mjs';
import EsHome from './Home_CJXwYIDN.mjs';
import FrAccount from './Account_DMqJZHt_.mjs';
import FrCommon from './Common_DzRjA1N7.mjs';
import FrHome from './Home_BF2OpLHC.mjs';

function isESMImportedImage(src) {
  return typeof src === "object" || typeof src === "function" && "src" in src;
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  if (typeof src === "object" && "then" in src) {
    const resource = await src;
    return resource.default ?? resource;
  }
  return src;
}

const firstBytes = /* @__PURE__ */ new Map([
  [0, "heif"],
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((imageType) => typeHandlers.get(imageType).validate(input));
}

function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function imageMetadata(data, src) {
  let result;
  try {
    result = lookup(data);
  } catch {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  if (!result.height || !result.width || !result.type) {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  const { width, height, type, orientation } = result;
  const isPortrait = (orientation || 0) >= 5;
  return {
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type,
    orientation
  };
}

async function inferRemoteSize(url, imageConfig) {
  if (!URL.canParse(url)) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const allowlistConfig = imageConfig ? {
    domains: imageConfig.domains ?? [],
    remotePatterns: imageConfig.remotePatterns ?? []
  } : void 0;
  if (!allowlistConfig) {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(url)
      });
    }
  }
  if (allowlistConfig && !isRemoteAllowed(url, allowlistConfig)) {
    throw new AstroError({
      ...RemoteImageNotAllowed,
      message: RemoteImageNotAllowed.message(url)
    });
  }
  const response = await fetch(url, { redirect: "manual" });
  if (response.status >= 300 && response.status < 400) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  if (!response.body || !response.ok) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = await imageMetadata(accumulatedChunks, url);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch {
      }
    }
  }
  throw new AstroError({
    ...NoImageMetadata,
    message: NoImageMetadata.message(url)
  });
}

function validateArgs(args) {
  if (args.length !== 3) return false;
  if (!args[0] || typeof args[0] !== "object") return false;
  return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
  const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
  const fn = (...args) => {
    if (!validateArgs(args)) {
      throw new AstroError({
        ...InvalidComponentArgs,
        message: InvalidComponentArgs.message(name)
      });
    }
    return cb(...args);
  };
  Object.defineProperty(fn, "name", { value: name, writable: false });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  fn.propagation = propagation;
  return fn;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
  return cb;
}
function createComponent(arg1, moduleId, propagation) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId, propagation);
  } else {
    return createComponentWithOptions(arg1);
  }
}

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script crossorigin=\"anonymous\" type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script crossorigin=\"anonymous\" type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position",
  "background"
];

const DEFAULT_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  960,
  // older horizontal phones
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  1920,
  // 1080p
  2048,
  // QXGA
  2560,
  // WQXGA
  3200,
  // QHD+
  3840,
  // 4K
  4480,
  // 4.5K
  5120,
  // 5K
  6016
  // 6K
];
const LIMITED_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  2048,
  // QXGA
  2560
  // WQXGA
];
const getWidths = ({
  width,
  layout,
  breakpoints = DEFAULT_RESOLUTIONS,
  originalWidth
}) => {
  const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
  if (layout === "full-width") {
    return breakpoints.filter(smallerThanOriginal);
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
  if (layout === "fixed") {
    return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      ...breakpoints
    ].filter((w) => w <= maxSize).sort((a, b) => a - b);
  }
  return [];
};
const getSizesAttribute = ({
  width,
  layout
}) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    // If screen is wider than the max size then image width is the max size,
    // otherwise it's the width of the screen
    case "constrained":
      return `(min-width: ${width}px) ${width}px, 100vw`;
    // Image is always the same width, whatever the size of the screen
    case "fixed":
      return `${width}px`;
    // Image is always the width of the screen
    case "full-width":
      return `100vw`;
    case "none":
    default:
      return void 0;
  }
};

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = Number.parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const sortNumeric = (a, b) => a - b;
function verifyOptions(options) {
  if (!options.src || !isRemoteImage(options.src) && !isESMImportedImage(options.src)) {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        JSON.stringify(options.src),
        typeof options.src,
        JSON.stringify(options, (_, v) => v === void 0 ? null : v)
      )
    });
  }
  if (!isESMImportedImage(options.src)) {
    if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
      throw new AstroError({
        ...LocalImageUsedWrongly,
        message: LocalImageUsedWrongly.message(options.src)
      });
    }
    let missingDimension;
    if (!options.width && !options.height) {
      missingDimension = "both";
    } else if (!options.width && options.height) {
      missingDimension = "width";
    } else if (options.width && !options.height) {
      missingDimension = "height";
    }
    if (missingDimension) {
      throw new AstroError({
        ...MissingImageDimension,
        message: MissingImageDimension.message(missingDimension, options.src)
      });
    }
  } else {
    if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
      throw new AstroError({
        ...UnsupportedImageFormat,
        message: UnsupportedImageFormat.message(
          options.src.format,
          options.src.src,
          VALID_SUPPORTED_FORMATS
        )
      });
    }
    if (options.widths && options.densities) {
      throw new AstroError(IncompatibleDescriptorOptions);
    }
    if (options.src.format !== "svg" && options.format === "svg") {
      throw new AstroError(UnsupportedImageConversion);
    }
  }
}
const baseService = {
  validateOptions(options) {
    verifyOptions(options);
    if (!options.format) {
      if (isESMImportedImage(options.src) && options.src.format === "svg") {
        options.format = "svg";
      } else {
        options.format = DEFAULT_OUTPUT_FORMAT;
      }
    }
    if (options.width) options.width = Math.round(options.width);
    if (options.height) options.height = Math.round(options.height);
    if (options.layout) {
      delete options.layout;
    }
    if (options.fit === "none") {
      delete options.fit;
    }
    return options;
  },
  getHTMLAttributes(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const {
      src,
      width,
      height,
      format,
      quality,
      densities,
      widths,
      formats,
      layout,
      priority,
      fit,
      position,
      background,
      ...attributes
    } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getSrcSet(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const aspectRatio = targetWidth / targetHeight;
    const { widths, densities } = options;
    const targetFormat = options.format ?? DEFAULT_OUTPUT_FORMAT;
    let transformedWidths = (widths ?? []).sort(sortNumeric);
    let imageWidth = options.width;
    let maxWidth = Number.POSITIVE_INFINITY;
    if (isESMImportedImage(options.src)) {
      imageWidth = options.src.width;
      maxWidth = imageWidth;
      if (transformedWidths.length > 0 && transformedWidths.at(-1) > maxWidth) {
        transformedWidths = transformedWidths.filter((width) => width <= maxWidth);
        transformedWidths.push(maxWidth);
      }
    }
    transformedWidths = Array.from(new Set(transformedWidths));
    const {
      width: transformWidth,
      height: transformHeight,
      ...transformWithoutDimensions
    } = options;
    let allWidths = [];
    if (densities) {
      const densityValues = densities.map((density) => {
        if (typeof density === "number") {
          return density;
        } else {
          return Number.parseFloat(density);
        }
      });
      const densityWidths = densityValues.sort(sortNumeric).map((density) => Math.round(targetWidth * density));
      allWidths = densityWidths.map((width, index) => ({
        width,
        descriptor: `${densityValues[index]}x`
      }));
    } else if (transformedWidths.length > 0) {
      allWidths = transformedWidths.map((width) => ({
        width,
        descriptor: `${width}w`
      }));
    }
    return allWidths.map(({ width, descriptor }) => {
      const height = Math.round(width / aspectRatio);
      const transform = { ...transformWithoutDimensions, width, height };
      return {
        transform,
        descriptor,
        attributes: {
          type: `image/${targetFormat}`
        }
      };
    });
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format",
      fit: "fit",
      position: "position",
      background: "background"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", imageConfig.endpoint.route);
    let url = `${imageEndpoint}?${searchParams}`;
    if (imageConfig.assetQueryParams) {
      const assetQueryString = imageConfig.assetQueryParams.toString();
      if (assetQueryString) {
        url += "&" + assetQueryString;
      }
    }
    return url;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? Number.parseInt(params.get("w")) : void 0,
      height: params.has("h") ? Number.parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q"),
      fit: params.get("fit"),
      position: params.get("position") ?? void 0,
      background: params.get("background") ?? void 0
    };
    return transform;
  },
  getRemoteSize(url, imageConfig) {
    return inferRemoteSize(url, imageConfig);
  }
};
function getTargetDimensions(options) {
  let targetWidth = options.width;
  let targetHeight = options.height;
  if (isESMImportedImage(options.src)) {
    const aspectRatio = options.src.width / options.src.height;
    if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    } else if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (!targetWidth && !targetHeight) {
      targetWidth = options.src.width;
      targetHeight = options.src.height;
    }
  }
  return {
    targetWidth,
    targetHeight
  };
}

function isImageMetadata(src) {
  return src.fsPath && !("fsPath" in src);
}

const PLACEHOLDER_BASE = "astro://placeholder";
function createPlaceholderURL(pathOrUrl) {
  return new URL(pathOrUrl, PLACEHOLDER_BASE);
}
function stringifyPlaceholderURL(url) {
  return url.href.replace(PLACEHOLDER_BASE, "");
}

const cssFitValues = ["fill", "contain", "cover", "scale-down"];
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './sharp_Cc9lyFjt.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  if (isImageMetadata(options)) {
    throw new AstroError(ExpectedNotESMImage);
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  let originalWidth;
  let originalHeight;
  if (resolvedOptions.inferSize) {
    delete resolvedOptions.inferSize;
    if (isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
      if (!isRemoteAllowed(resolvedOptions.src, imageConfig)) {
        throw new AstroError({
          ...RemoteImageNotAllowed,
          message: RemoteImageNotAllowed.message(resolvedOptions.src)
        });
      }
      const getRemoteSize = (url) => service.getRemoteSize?.(url, imageConfig) ?? inferRemoteSize(url, imageConfig);
      const result = await getRemoteSize(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      originalWidth = result.width;
      originalHeight = result.height;
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  if (isESMImportedImage(clonedSrc)) {
    originalWidth = clonedSrc.width;
    originalHeight = clonedSrc.height;
  }
  if (originalWidth && originalHeight) {
    const aspectRatio = originalWidth / originalHeight;
    if (resolvedOptions.height && !resolvedOptions.width) {
      resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
    } else if (resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
    } else if (!resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.width = originalWidth;
      resolvedOptions.height = originalHeight;
    }
  }
  resolvedOptions.src = clonedSrc;
  const layout = options.layout ?? imageConfig.layout ?? "none";
  if (resolvedOptions.priority) {
    resolvedOptions.loading ??= "eager";
    resolvedOptions.decoding ??= "sync";
    resolvedOptions.fetchpriority ??= "high";
    delete resolvedOptions.priority;
  } else {
    resolvedOptions.loading ??= "lazy";
    resolvedOptions.decoding ??= "async";
    resolvedOptions.fetchpriority ??= void 0;
  }
  if (layout !== "none") {
    resolvedOptions.widths ||= getWidths({
      width: resolvedOptions.width,
      layout,
      originalWidth,
      breakpoints: imageConfig.breakpoints?.length ? imageConfig.breakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
    });
    resolvedOptions.sizes ||= getSizesAttribute({ width: resolvedOptions.width, layout });
    delete resolvedOptions.densities;
    resolvedOptions["data-astro-image"] = layout;
    if (resolvedOptions.fit && cssFitValues.includes(resolvedOptions.fit)) {
      resolvedOptions["data-astro-image-fit"] = resolvedOptions.fit;
    }
    if (resolvedOptions.position) {
      resolvedOptions["data-astro-image-pos"] = resolvedOptions.position.replace(/\s+/g, "-");
    }
  }
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  const lazyImageURLFactory = (getValue) => {
    let cached = null;
    return () => cached ??= getValue();
  };
  const initialImageURL = await service.getURL(validatedOptions, imageConfig);
  let lazyImageURL = lazyImageURLFactory(() => initialImageURL);
  const matchesValidatedTransform = (transform) => transform.width === validatedOptions.width && transform.height === validatedOptions.height && transform.format === validatedOptions.format;
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? initialImageURL : await service.getURL(srcSet.transform, imageConfig),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    })
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && initialImageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    lazyImageURL = lazyImageURLFactory(
      () => globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalFilePath)
    );
    srcSets = srcSetTransforms.map((srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? lazyImageURL() : globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    });
  } else if (imageConfig.assetQueryParams) {
    const imageURLObj = createPlaceholderURL(initialImageURL);
    imageConfig.assetQueryParams.forEach((value, key) => {
      imageURLObj.searchParams.set(key, value);
    });
    lazyImageURL = lazyImageURLFactory(() => stringifyPlaceholderURL(imageURLObj));
    srcSets = srcSets.map((srcSet) => {
      const urlObj = createPlaceholderURL(srcSet.url);
      imageConfig.assetQueryParams.forEach((value, key) => {
        urlObj.searchParams.set(key, value);
      });
      return {
        ...srcSet,
        url: stringifyPlaceholderURL(urlObj)
      };
    });
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    get src() {
      return lazyImageURL();
    },
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

Function.prototype.toString.call(Object);

const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = Number.parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = Number.parseInt(props.height);
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  if (layout !== "none") {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  } else if (imageConfig.objectFit || imageConfig.objectPosition) {
    props.fit ??= imageConfig.objectFit;
    props.position ??= imageConfig.objectPosition;
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  const { class: className, ...attributes } = { ...additionalAttributes, ...image.attributes };
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/node_modules/.pnpm/astro@6.1.2_@types+node@25.5.0_jiti@1.21.7_lightningcss@1.32.0_rollup@2.80.0_sass-embed_283512088e578a1c539867f1ff39e8f4/node_modules/astro/components/Image.astro", void 0);

const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  const useResponsive = layout !== "none";
  if (useResponsive) {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  } else if (imageConfig.objectFit || imageConfig.objectPosition) {
    props.fit ??= imageConfig.objectFit;
    props.position ??= imageConfig.objectPosition;
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  const clonedSrc = isESMImportedImage(originalSrc) ? (
    // @ts-expect-error - clone is a private, hidden prop
    originalSrc.clone ?? originalSrc
  ) : originalSrc;
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(clonedSrc) && specialFormatsFallback.includes(clonedSrc.format)) {
    resultFallbackFormat = clonedSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  const { class: className, ...attributes } = {
    ...imgAdditionalAttributes,
    ...fallbackImage.attributes
  };
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })}  <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}> </picture>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/node_modules/.pnpm/astro@6.1.2_@types+node@25.5.0_jiti@1.21.7_lightningcss@1.32.0_rollup@2.80.0_sass-embed_283512088e578a1c539867f1ff39e8f4/node_modules/astro/components/Picture.astro", void 0);

const componentDataByCssVariable = new Map([]);

function filterPreloads(data, preload) {
  if (!preload) {
    return null;
  }
  if (preload === true) {
    return data;
  }
  return data.filter(
    ({ weight, style, subset }) => preload.some((p) => {
      if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) {
        return false;
      }
      if (p.style !== void 0 && p.style !== style) {
        return false;
      }
      if (p.subset !== void 0 && p.subset !== subset) {
        return false;
      }
      return true;
    })
  );
}
function checkWeight(input, target) {
  const trimmedInput = input.trim();
  if (trimmedInput.includes(" ")) {
    return trimmedInput === target;
  }
  if (target.includes(" ")) {
    const [a, b] = target.split(" ");
    const parsedInput = Number.parseInt(input);
    return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
  }
  return input === target;
}

const $$Font = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Font;
  const { cssVariable, preload = false } = Astro2.props;
  const data = componentDataByCssVariable.get(cssVariable);
  if (!data) {
    throw new AstroError({
      ...FontFamilyNotFound,
      message: FontFamilyNotFound.message(cssVariable)
    });
  }
  const filteredPreloadData = filterPreloads(data.preloads, preload);
  return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin crossorigin=\"anonymous\">`)}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/node_modules/.pnpm/astro@6.1.2_@types+node@25.5.0_jiti@1.21.7_lightningcss@1.32.0_rollup@2.80.0_sass-embed_283512088e578a1c539867f1ff39e8f4/node_modules/astro/components/Font.astro", void 0);

const assetQueryParams = undefined;
					const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[],"responsiveStyles":false};
					Object.defineProperty(imageConfig, 'assetQueryParams', {
						value: assetQueryParams,
						enumerable: false,
						configurable: true,
					});
							const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Background = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="Layout" data-astro-cid-tdpc7p74> <div id="Background" class="Container" data-astro-cid-tdpc7p74> ${renderComponent($$result, "Image", $$Image, { "src": "/Asset/Background.svg", "alt": "", "role": "presentation", "class": "Image", "loading": "eager", "decoding": "async", "width": 1920, "height": 1080, "data-astro-cid-tdpc7p74": true })} </div> <div id="Rock" class="Container" data-astro-cid-tdpc7p74> <picture data-astro-cid-tdpc7p74> <source media="(min-width: 1920px)" srcset="/Asset/DesktopLargeRock.webp" data-astro-cid-tdpc7p74> <source media="(min-width: 1280px)" srcset="/Asset/DesktopRock.webp" data-astro-cid-tdpc7p74> <source media="(min-width: 768px)" srcset="/Asset/TabletRock.webp" data-astro-cid-tdpc7p74> <img src="/Asset/MobileRock.webp" alt="" role="presentation" class="Image" loading="eager" decoding="async" width="2400" height="1309" data-astro-cid-tdpc7p74> </picture> </div> </div>  ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Background.astro", void 0);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  HandleRetry = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ jsx("div", { className: "flex min-h-[200px] items-center justify-center p-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md border border-[var(--Border)] bg-white p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold text-[var(--Foreground)]", children: "Something went wrong" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm text-[var(--MuteForeground)]", children: "An unexpected error occurred. Please try again." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: this.HandleRetry,
            className: "inline-flex h-9 items-center justify-center border border-[var(--Border)] bg-[var(--Primary)] px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90",
            children: "Try again"
          }
        )
      ] }) });
    }
    return this.props.children;
  }
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}

const Footer = ({ content }) => {
  const { t: T } = useTranslation("footer");
  const FooterData = content || {
    brand: {
      name: T("brand.name", "Land"),
      description: T(
        "brand.description",
        "The next-generation code editor. Open source and free forever."
      )
    },
    columns: [
      {
        title: T("columns.product.title", "Product"),
        links: [
          {
            label: T("columns.product.features", "Features"),
            href: "/#features"
          },
          {
            label: T("columns.product.downloads", "Downloads"),
            href: "/Download"
          },
          {
            label: T("columns.product.docs", "Docs"),
            href: "https://github.com/CodeEditorLand/Land#readme"
          }
        ]
      },
      {
        title: T("columns.company.title", "Community"),
        links: [
          {
            label: T("columns.company.issues", "Issues"),
            href: "https://github.com/CodeEditorLand/Land/issues"
          },
          {
            label: T(
              "columns.company.contributing",
              "Contributing"
            ),
            href: "https://github.com/CodeEditorLand/Land/blob/Current/CONTRIBUTING.md"
          },
          {
            label: T("columns.company.github", "GitHub"),
            href: "https://github.com/CodeEditorLand/Land"
          }
        ]
      },
      {
        title: T("columns.legal.title", "Legal"),
        links: [
          {
            label: T("columns.legal.privacy", "Privacy"),
            href: "/Legal/Privacy"
          },
          {
            label: T("columns.legal.terms", "Terms"),
            href: "/Legal/Term"
          },
          {
            label: T("columns.legal.license", "License"),
            href: "/License"
          }
        ]
      }
    ],
    bottomBar: { madeWith: true }
  };
  return /* @__PURE__ */ jsx("footer", { className: "Footer", role: "contentinfo", "aria-label": "Site footer", children: /* @__PURE__ */ jsxs("div", { className: "FooterContent container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            className: "mb-4 flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": `${FooterData.brand?.name || "Land"} - Go to homepage`,
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/Asset/Logo/Glyph/Land.svg",
                  alt: "Code Editor Land",
                  title: "Code Editor Land",
                  width: "32",
                  height: "32",
                  className: "h-8 w-8",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: FooterData.brand?.name || "Land" })
            ]
          }
        ),
        FooterData.brand?.description && /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-md text-muted-foreground", children: FooterData.brand.description })
      ] }),
      FooterData.columns?.map((Column, ColumnIndex) => /* @__PURE__ */ jsxs("nav", { "aria-label": Column.title, children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 font-medium", children: Column.title }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: Column.links.map((Link, LinkIndex) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: Link.href,
            className: "StaccatoNavLink transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            ...Link.href.startsWith("http") ? {
              target: "_blank",
              rel: "noopener noreferrer"
            } : {},
            children: Link.label
          }
        ) }, LinkIndex)) })
      ] }, ColumnIndex))
    ] }),
    /* @__PURE__ */ jsx(Separator, { className: "StaccatoSeparator my-8" }),
    /* @__PURE__ */ jsx("div", { className: "StaccatoCard StaccatoBorderShimmer mb-6 border border-[var(--Border)] bg-white p-4", children: /* @__PURE__ */ jsxs("p", { className: "text-xs leading-relaxed text-muted-foreground", children: [
      T(
        "funding.prefix",
        "This project has been funded through the "
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://nlnet.nl/commonsfund",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-[var(--Primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
          children: T("funding.ngiFund", "NGI0 Commons Fund")
        }
      ),
      T("funding.nlnetIntro", ", a fund established by "),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://nlnet.nl",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-[var(--Primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
          children: T("funding.nlnet", "NLnet")
        }
      ),
      T(
        "funding.euSupport",
        " with financial support from the European Commission’s Next Generation Internet programme, under grant agreement No. 101135429. "
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://nlnet.nl/project/Land/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-[var(--Primary)] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
          children: T("funding.projectPage", "View project page")
        }
      ),
      "."
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-4 md:mb-0", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/CodeEditorLand",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "StaccatoSocial transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Code Editor Land on GitHub (opens in new tab)",
            children: /* @__PURE__ */ jsx(lucide.Github, { className: "h-5 w-5", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "InlineSeparator", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://x.com/CodeEditorLand",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "StaccatoSocial transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Code Editor Land on X (opens in new tab)",
            children: /* @__PURE__ */ jsx(lucide.Twitter, { className: "h-5 w-5", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "InlineSeparator", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: T("bottomBar.copyright", {
          year: (/* @__PURE__ */ new Date()).getFullYear(),
          defaultValue: "© {{year}} Code Editor Land. All rights reserved."
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://PlayForm.Cloud",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "PlayForm (opens in new tab)",
            children: [
              "PlayForm",
              /* @__PURE__ */ jsx("span", { className: "InlineSeparator", children: "→" })
            ]
          }
        ),
        FooterData.bottomBar?.madeWith && /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://tauri.app",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Made with Tauri (opens in new tab)",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://playform.cloud/Image/GitHub/Made/Tauri.svg",
                alt: "Made with Tauri",
                width: "160",
                height: "32",
                className: "h-8",
                loading: "lazy"
              }
            )
          }
        )
      ] })
    ] })
  ] }) });
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1e3;
function Delay(Millisecond) {
  return new Promise((Resolve) => setTimeout(Resolve, Millisecond));
}
function WithRetry(Function, Retries = MAX_RETRIES) {
  return Function().catch(async (Error2) => {
    if (Retries > 0) {
      console.warn(
        `Retrying request... (${Retries} retries left)`,
        Error2.message
      );
      await Delay(RETRY_DELAY);
      return WithRetry(Function, Retries - 1);
    }
    return { success: false, error: Error2.message };
  });
}
function GetAuthToken() {
  try {
    const CookieList = document.cookie.split(";");
    const SessionCookie = CookieList.find(
      (Cookie) => Cookie.trim().startsWith("session=")
    );
    if (SessionCookie) {
      const Token = SessionCookie.split("=")[1];
      return Token ?? null;
    }
  } catch {
  }
  return localStorage.getItem("session_token");
}
function CreateWorkerClient(BaseURL) {
  const FetchWithAuthentication = async (Endpoint, Option = {}) => {
    const Token = GetAuthToken();
    const Header = {
      "Content-Type": "application/json",
      ...Token ? { Authorization: `Bearer ${Token}` } : {},
      ...Option.headers
    };
    const Response = await fetch(`${BaseURL}${Endpoint}`, {
      ...Option,
      headers: Header
    });
    const Data = await Response.json().catch(() => ({
      success: false,
      error: "Invalid response"
    }));
    if (!Response.ok || !Data.success) {
      return {
        success: false,
        error: Data.error || Data.message || `HTTP ${Response.status}`
      };
    }
    return Data;
  };
  return {
    Authentication: {
      Login: (Email, Password) => WithRetry(
        () => FetchWithAuthentication("/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: Password
          })
        })
      ),
      Register: (Email, Password, Username, DisplayName) => WithRetry(
        () => FetchWithAuthentication("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: Password,
            username: Username,
            displayName: DisplayName
          })
        })
      ),
      Logout: () => WithRetry(
        () => FetchWithAuthentication("/auth/logout", {
          method: "POST"
        })
      ),
      Refresh: (Token) => WithRetry(
        () => FetchWithAuthentication("/auth/refresh", {
          method: "POST",
          headers: { Authorization: `Bearer ${Token}` }
        })
      ),
      VerifyEmail: (Token) => WithRetry(
        () => FetchWithAuthentication(
          `/auth/verify-email/${Token}`,
          { method: "GET" }
        )
      ),
      ResendVerification: () => WithRetry(
        () => FetchWithAuthentication("/auth/resend-verification", {
          method: "POST"
        })
      ),
      ForgotPassword: (Email) => WithRetry(
        () => FetchWithAuthentication(
          "/auth/forgot-password",
          {
            method: "POST",
            body: JSON.stringify({ email: Email })
          }
        )
      ),
      ResetPassword: (Token, Password) => WithRetry(
        () => FetchWithAuthentication(
          `/auth/reset-password/${Token}`,
          {
            method: "POST",
            body: JSON.stringify({ password: Password })
          }
        )
      ),
      GetSession: () => WithRetry(
        () => FetchWithAuthentication("/auth/session")
      ),
      OAuth: (Provider) => {
        const RedirectURL = `${BaseURL}/auth/oauth/${Provider}`;
        window.location.href = RedirectURL;
        return Promise.resolve({ success: true });
      },
      HandleOAuthCallback: () => {
        throw new Error(
          "HandleOAuthCallback should not be called as a fetch. OAuth callback redirects to frontend URL with token parameter."
        );
      }
    },
    Download: {
      GetBinaries: (Platform, Architecture) => {
        const Parameter = new URLSearchParams();
        if (Platform) Parameter.append("platform", Platform);
        if (Architecture)
          Parameter.append("architecture", Architecture);
        const Query = Parameter.toString();
        return WithRetry(
          () => FetchWithAuthentication(
            `/downloads${Query ? `?${Query}` : ""}`
          )
        );
      },
      GetVersionList: (Limit) => {
        const Query = Limit ? `?limit=${Limit}` : "";
        return WithRetry(
          () => FetchWithAuthentication(`/downloads${Query}`)
        );
      },
      GetDownload: (Id) => WithRetry(
        () => FetchWithAuthentication(`/downloads/${Id}`)
      ),
      GetSHA256: (Id) => WithRetry(
        () => FetchWithAuthentication(
          `/downloads/${Id}/sha256`
        )
      ),
      GetSignature: (Id) => WithRetry(
        () => FetchWithAuthentication(
          `/downloads/${Id}/signature`
        )
      ),
      GetInfo: (Id) => WithRetry(
        () => FetchWithAuthentication(`/downloads/${Id}/info`)
      ),
      GetByVersion: (Version, Platform, Architecture) => {
        const Parameter = new URLSearchParams();
        if (Platform) Parameter.append("platform", Platform);
        if (Architecture)
          Parameter.append("architecture", Architecture);
        const Query = Parameter.toString();
        return WithRetry(
          () => FetchWithAuthentication(
            `/downloads/version/${Version}${Query ? `?${Query}` : ""}`
          )
        );
      },
      GetLatest: (Platform, Architecture) => {
        const Parameter = new URLSearchParams();
        if (Platform) Parameter.append("platform", Platform);
        if (Architecture)
          Parameter.append("architecture", Architecture);
        const Query = Parameter.toString();
        return WithRetry(
          () => FetchWithAuthentication(
            `/downloads/latest${Query ? `?${Query}` : ""}`
          )
        );
      },
      TrackDownload: (Id) => WithRetry(
        () => FetchWithAuthentication(
          `/downloads/${Id}/track`,
          { method: "POST" }
        )
      ),
      GetAnalytics: (Limit, Offset) => {
        const Parameter = new URLSearchParams();
        if (Limit) Parameter.append("limit", Limit.toString());
        if (Offset) Parameter.append("offset", Offset.toString());
        const Query = Parameter.toString();
        return WithRetry(
          () => FetchWithAuthentication(`/analytics/downloads${Query ? `?${Query}` : ""}`)
        );
      }
    },
    Analytics: {
      Track: (Type, Properties = {}) => WithRetry(
        () => FetchWithAuthentication("/track", {
          method: "POST",
          body: JSON.stringify({
            type: Type,
            properties: Properties
          })
        })
      ),
      TrackBatch: (Events) => WithRetry(
        () => FetchWithAuthentication("/track/batch", {
          method: "POST",
          body: JSON.stringify({ events: Events })
        })
      ),
      TrackPageView: (Path, Title, Referrer) => WithRetry(
        () => FetchWithAuthentication("/pageview", {
          method: "POST",
          body: JSON.stringify({
            path: Path,
            title: Title,
            referrer: Referrer
          })
        })
      ),
      GetEvents: (Type, Limit, Offset, StartDate, EndDate) => {
        const Parameter = new URLSearchParams();
        if (Type) Parameter.append("type", Type);
        if (Limit) Parameter.append("limit", Limit.toString());
        if (Offset) Parameter.append("offset", Offset.toString());
        if (StartDate) Parameter.append("start", StartDate);
        if (EndDate) Parameter.append("end", EndDate);
        return WithRetry(
          () => FetchWithAuthentication(
            `/events?${Parameter.toString()}`
          )
        );
      },
      GetEvent: (Id) => WithRetry(
        () => FetchWithAuthentication(`/events/${Id}`)
      ),
      GetSummary: (Days, Type) => {
        const Parameter = new URLSearchParams();
        if (Days) Parameter.append("days", Days.toString());
        if (Type) Parameter.append("type", Type);
        return WithRetry(
          () => FetchWithAuthentication(`/summary?${Parameter.toString()}`)
        );
      },
      GetTimeline: (Days, Type) => {
        const Parameter = new URLSearchParams();
        if (Days) Parameter.append("days", Days.toString());
        if (Type) Parameter.append("type", Type);
        return WithRetry(
          () => FetchWithAuthentication(`/timeline?${Parameter.toString()}`)
        );
      },
      GetPageViewStats: (Days, Limit) => {
        const Parameter = new URLSearchParams();
        if (Days) Parameter.append("days", Days.toString());
        if (Limit) Parameter.append("limit", Limit.toString());
        return WithRetry(
          () => FetchWithAuthentication(`/stats/pageviews?${Parameter.toString()}`)
        );
      },
      GetEventStats: (Days) => {
        const Parameter = new URLSearchParams();
        if (Days) Parameter.append("days", Days.toString());
        return WithRetry(
          () => FetchWithAuthentication(`/stats/events?${Parameter.toString()}`)
        );
      },
      GetSessionStats: (Days) => {
        const Parameter = new URLSearchParams();
        if (Days) Parameter.append("days", Days.toString());
        return WithRetry(
          () => FetchWithAuthentication(`/stats/sessions?${Parameter.toString()}`)
        );
      }
    },
    Status: {
      GetOverallStatus: () => WithRetry(
        () => FetchWithAuthentication("/status")
      ),
      GetChecks: () => WithRetry(
        () => FetchWithAuthentication("/status/checks")
      ),
      GetCheck: (Id) => WithRetry(
        () => FetchWithAuthentication(`/status/checks/${Id}`)
      ),
      GetHistory: (Limit, CheckId) => {
        const Parameter = new URLSearchParams();
        if (Limit) Parameter.append("limit", Limit.toString());
        if (CheckId) Parameter.append("checkId", CheckId);
        return WithRetry(
          () => FetchWithAuthentication(`/status/history?${Parameter.toString()}`)
        );
      },
      GetGitHubCommits: (Branch, Limit) => {
        const Parameter = new URLSearchParams();
        if (Branch) Parameter.append("branch", Branch);
        if (Limit) Parameter.append("limit", Limit.toString());
        return WithRetry(
          () => FetchWithAuthentication(
            `/status/github/commits?${Parameter.toString()}`
          )
        );
      },
      GetGitHubActions: (Limit) => {
        const Parameter = new URLSearchParams();
        if (Limit) Parameter.append("limit", Limit.toString());
        return WithRetry(
          () => FetchWithAuthentication(
            `/status/github/actions?${Parameter.toString()}`
          )
        );
      },
      GetGitHubIssues: (State, Limit) => {
        const Parameter = new URLSearchParams();
        if (State) Parameter.append("state", State);
        if (Limit) Parameter.append("limit", Limit.toString());
        return WithRetry(
          () => FetchWithAuthentication(
            `/status/github/issues?${Parameter.toString()}`
          )
        );
      }
    }
  };
}
let ClientInstance = null;
function GetWorkersClient() {
  if (ClientInstance) {
    return ClientInstance;
  }
  const AuthenticationURL = "http://localhost:8787";
  const DownloadURL = "http://localhost:8788";
  const AnalyticsURL = "http://localhost:8789";
  ClientInstance = {
    Authentication: CreateWorkerClient(AuthenticationURL).Authentication,
    Download: CreateWorkerClient(DownloadURL).Download,
    Analytics: CreateWorkerClient(AnalyticsURL).Analytics,
    Status: CreateWorkerClient(AnalyticsURL).Status 
  };
  return ClientInstance;
}
function ClearWorkersClient() {
  ClientInstance = null;
}

const WorkerClient = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClearWorkersClient,
  GetWorkersClient
}, Symbol.toStringTag, { value: 'Module' }));

const AnalyticsContext = createContext(null);
const AnalyticsProvider = ({ children }) => {
  const [Client, SetClient] = useState(null);
  useEffect(() => {
    try {
      SetClient(GetWorkersClient());
    } catch (AnalyticsError) {
      console.error(
        "Failed to initialize analytics client:",
        AnalyticsError
      );
    }
  }, []);
  const Track = async (Event, Properties = {}) => {
    if (!Client) {
      console.warn("Analytics client not initialized");
      return;
    }
    try {
      await Client.Analytics.Track(Event, Properties);
    } catch (TrackError) {
      console.error("Failed to track event:", TrackError);
    }
  };
  const TrackPageView = async (Path, Title) => {
    await Track("pageview", {
      path: Path,
      title: Title,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  };
  const Identify = async (UserIdentifier, Traits = {}) => {
    await Track("user_identified", { userId: UserIdentifier, ...Traits });
  };
  const Value = {
    track: Track,
    trackPageView: TrackPageView,
    identify: Identify
  };
  return /* @__PURE__ */ jsx(AnalyticsContext.Provider, { value: Value, children });
};
const useAnalytics = () => {
  const Context = useContext(AnalyticsContext);
  if (!Context) {
    throw new Error(
      "useAnalytics must be used within an AnalyticsProvider"
    );
  }
  return Context;
};

const PageviewTracker = () => {
  const [IsMounted, SetIsMounted] = useState(false);
  const HasTrackedReference = useRef(false);
  const TrackPageViewReference = useRef(null);
  useEffect(() => {
    SetIsMounted(true);
  }, []);
  useEffect(() => {
    if (!IsMounted) return;
    const { trackPageView: TrackPageView } = useAnalytics();
    TrackPageViewReference.current = TrackPageView;
    const HandleRouteChange = () => {
      if (HasTrackedReference.current) return;
      HasTrackedReference.current = true;
      try {
        const CurrentPath = window.location.pathname;
        const CurrentTitle = document.title;
        TrackPageViewReference.current?.(
          CurrentPath,
          CurrentTitle
        ).catch((TrackError) => {
          if (process.env["NODE_ENV"] !== "production") {
            console.error("Failed to track page view:", TrackError);
          }
        });
      } catch (TrackError) {
        if (process.env["NODE_ENV"] !== "production") {
          console.error("Failed to track page view:", TrackError);
        }
      }
    };
    HandleRouteChange();
    const HandlePopState = () => {
      HasTrackedReference.current = false;
      HandleRouteChange();
    };
    window.addEventListener("popstate", HandlePopState);
    const OriginalPushState = history.pushState;
    const OriginalReplaceState = history.replaceState;
    history.pushState = function(...Arguments) {
      OriginalPushState.apply(this, Arguments);
      HasTrackedReference.current = false;
      HandleRouteChange();
    };
    history.replaceState = function(...Arguments) {
      OriginalReplaceState.apply(this, Arguments);
      HasTrackedReference.current = false;
      HandleRouteChange();
    };
    return () => {
      window.removeEventListener("popstate", HandlePopState);
      history.pushState = OriginalPushState;
      history.replaceState = OriginalReplaceState;
    };
  }, [IsMounted]);
  return null;
};

const MetaTags = ({
  title,
  description,
  image = "/Favicon/og-image.png",
  url = "",
  type = "website",
  lang = "en",
  siteName = "Code Editor Land",
  publishedTime,
  author,
  noIndex = false
}) => {
  const SafeTitle = title || siteName;
  const SafeDescription = description || "The next-generation code editor";
  const BaseURL = "https://editor.land";
  const SiteURL = url.startsWith("http") ? url : url.startsWith("/") ? `${BaseURL}${url}` : BaseURL;
  const JSONLD = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": SiteURL,
    "description": SafeDescription
  };
  if (type === "article" && publishedTime) {
    JSONLD.datePublished = publishedTime;
  }
  JSONLD.author = author ? { "@type": "Organization", "name": author } : [
    {
      "@type": "Person",
      "name": "Nikola R. Hristov",
      "url": "https://github.com/NikolaRHristov"
    },
    {
      "@type": "Organization",
      "name": "Code Editor Land",
      "url": "https://editor.land"
    },
    {
      "@type": "Organization",
      "name": "PlayForm",
      "url": "https://PlayForm.Cloud"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("title", { children: SafeTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: SafeDescription }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        name: "author",
        content: "Nikola R. Hristov, Code Editor Land, PlayForm"
      }
    ),
    /* @__PURE__ */ jsx(
      "meta",
      {
        name: "robots",
        content: noIndex ? "noindex, nofollow" : "index, follow"
      }
    ),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: SiteURL }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: SiteURL }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: SafeTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: SafeDescription }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        property: "og:image",
        content: image.startsWith("http") ? image : `https://editor.land${image}`
      }
    ),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteName }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: lang }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: SiteURL }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: SafeTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: SafeDescription }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        name: "twitter:image",
        content: image.startsWith("http") ? image : `https://editor.land${image}`
      }
    ),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@CodeEditorLand" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:creator", content: "@CodeEditorLand" }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }
    ),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "var(--ColorBackground)" }),
    /* @__PURE__ */ jsx("meta", { name: "format-detection", content: "telephone=no" }),
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(JSONLD)
        }
      }
    )
  ] });
};

const { readdir: ReadDirectory } = await import('node:fs/promises');
const { join: Join, relative: Relative } = await import('node:path');
const CanonicalPath = /* @__PURE__ */ new Set([
  "/Download",
  "/Doc",
  "/Blog",
  "/Portal",
  "/Dashboard",
  "/Contributing",
  "/License",
  "/Verify",
  "/Contact/Sale",
  "/Account/SignIn",
  "/Account/SignUp",
  "/Account/ForgotPassword",
  "/Account/ResetPassword",
  "/Legal/Term",
  "/Legal/Privacy",
  "/OAuth/Success"
]);
const PascalCaseCanonical = Object.fromEntries(
  [...CanonicalPath].map((PascalPath) => [
    PascalPath.toLowerCase(),
    PascalPath
  ])
);

function GetI18n() {
  if (!i18n.isInitialized) {
    i18n.init({
      resources: {
        en: {
          common: EnCommon,
          home: EnHome,
          download: EnDownload,
          account: EnAccount,
          verify: EnVerify,
          header: EnHeader,
          footer: EnFooter,
          meta: EnMeta
        },
        bg: {
          common: BgCommon,
          home: BgHome,
          download: BgDownload,
          account: BgAccount,
          verify: BgVerify,
          header: BgHeader,
          footer: BgFooter,
          meta: BgMeta
        },
        de: {
          common: DeCommon,
          home: DeHome,
          download: DeDownload,
          account: DeAccount,
          verify: DeVerify,
          header: DeHeader,
          footer: DeFooter,
          meta: DeMeta
        },
        fr: {
          common: FrCommon,
          home: FrHome,
          download: FrDownload,
          account: FrAccount,
          verify: FrVerify,
          header: FrHeader,
          footer: FrFooter,
          meta: FrMeta
        },
        es: {
          common: EsCommon,
          home: EsHome,
          download: EsDownload,
          account: EsAccount,
          verify: EsVerify,
          header: EsHeader,
          footer: EsFooter,
          meta: EsMeta
        }
      },
      lng: "en",
      fallbackLng: "en",
      defaultNS: "common",
      ns: [
        "common",
        "home",
        "download",
        "account",
        "verify",
        "header",
        "footer",
        "meta"
      ],
      interpolation: { escapeValue: false }
    });
  }
  return i18n.getFixedT("en");
}

const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Base;
  const RawPath = Astro2.url.pathname === "/" ? "/" : Astro2.url.pathname.replace(/\/$/, "");
  const CanonicalPath = PascalCaseCanonical[RawPath] ?? RawPath;
  const DefaultURL = `https://editor.land${CanonicalPath === "/" ? "" : CanonicalPath}`;
  const {
    Title,
    Description,
    Language = "en",
    Direction = "ltr",
    Image = "/Favicon/og-image.png",
    Url = DefaultURL,
    Type = "website",
    NoIndex = false
  } = Astro2.props;
  const T = GetI18n();
  return renderTemplate`<html${addAttribute(Language, "lang")} class="no-js"${addAttribute(Direction, "dir")}> <head>${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=0&lang.ts")}<!-- Dynamic Meta Tags -->${renderComponent($$result, "MetaTags", MetaTags, { "title": Title || T("meta.title", { defaultValue: "Land" }), "description": Description || T("meta.description", { defaultValue: "Code Editor" }), "image": Image, "url": Url, "type": Type, "lang": Language, "noIndex": NoIndex })}<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#ffffff"><meta name="format-detection" content="telephone=no"><meta name="twitter:dnt" content="on"><!-- Links --><link rel="preconnect" href="https://fonts.googleapis.com" crossorigin crossorigin=\"anonymous\"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin crossorigin=\"anonymous\"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap" crossorigin=\"anonymous\">${renderSlot($$result, $$slots["Head"])}<!-- Favicon --><link rel="icon" type="image/png" href="/Favicon/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/Favicon/favicon.svg"><link rel="shortcut icon" href="/Favicon/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="Code Editor Land"><link rel="manifest" href="/Favicon/site.webmanifest">${renderHead()}</head> <body> <a href="#main-content" class="sr-only fixed left-2 top-2 z-[100] -translate-y-full bg-[var(--Primary)] px-4 py-2 text-sm font-medium text-white transition-transform focus:not-sr-only focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">
Skip to main content
</a> ${renderComponent($$result, "Background", $$Background, {})} ${renderComponent($$result, "AnalyticsProvider", AnalyticsProvider, {}, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "PageviewTracker", PageviewTracker, {})} <main id="main-content" class="grow" tabindex="-1"> ${renderComponent($$result2, "ErrorBoundary", ErrorBoundary, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary", "client:component-export": "ErrorBoundary" }, { "default": async ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["default"])} ` })} </main> ` })} <div id="Footer" class="shrink"> ${renderComponent($$result, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer", "client:component-export": "Footer" })} </div> ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=2&lang.ts")} ${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=3&lang.ts")} <a class="absolute left-0 top-0 hidden" rel="me" href="https://x.com/CodeEditorLand" aria-hidden="true" tabindex="-1"></a> </body></html>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro", void 0);

export { $$Base as $, GetI18n as G, WorkerClient as W, cn as a, GetWorkersClient as b, createComponent as c, baseService as d, parseQuality as p, renderScript as r };
