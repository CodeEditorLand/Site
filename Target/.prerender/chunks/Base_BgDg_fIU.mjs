import { c as createComponent } from './astro-component_X770d8M8.mjs';
import 'piccolore';
import { q as createRenderInstruction, A as AstroError, N as NoImageMetadata, t as isRemoteAllowed, F as FailedToFetchRemoteImageDimensions, R as RemoteImageNotAllowed, E as ExpectedImage, i as LocalImageUsedWrongly, M as MissingImageDimension, m as UnsupportedImageFormat, f as IncompatibleDescriptorOptions, l as UnsupportedImageConversion, b as ExpectedImageOptions, c as ExpectedNotESMImage, h as InvalidImageService, I as ImageMissingAlt, v as maybeRenderHead, n as addAttribute, C as spreadAttributes, B as renderTemplate, d as FontFamilyNotFound, D as unescapeHTML, w as renderComponent, y as renderHead, z as renderSlot } from './prerender_AmZqEYF9.mjs';
import { k as removeQueryString, j as joinPaths, e as isRemotePath } from './Vendor/React_DEMYkl39.mjs';
import { c as DEFAULT_OUTPUT_FORMAT, h as VALID_SUPPORTED_FORMATS, D as DEFAULT_HASH_PROPS, g as EnHeader, E as EnDoc } from './PageMetadata_DYW59jf6.mjs';
import { clsx } from 'clsx';
import * as mime from 'mrmime';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Component, createContext, useState, useEffect, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { twMerge } from 'tailwind-merge';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { P as PascalCaseCanonical } from './Map_ATi1yrkS.mjs';
import i18n from 'i18next';
import { D as DeHeader, B as BgAccount } from './Doc_CGmzPUkD.mjs';
import BgCommon from './Common_BqcJAYVG.mjs';
import { B as BgDownload, E as EnDownload } from './Download_Bei4lrNM.mjs';
import { b as FrAccount, B as BgFooter } from './Blog_BJ75-13H.mjs';
import { B as BgHeader, E as EnAccount } from './Doc_upvpGoFM.mjs';
import { E as EsFooter, B as BgHome } from './Turbulence_BT9qYdjt.mjs';
import { E as EsMeta, B as BgMeta } from './Meta_hHADzK8O.mjs';
import { B as BgVerify, E as EnMeta } from './Verify_CEfXaH2C.mjs';
import { F as FrHeader, D as DeAccount } from './Account_B9kC2AMl.mjs';
import DeCommon from './Common_RDgAMe-1.mjs';
import { E as EsDownload, D as DeDownload } from './Download_Ck1ZgmMa.mjs';
import { E as EsVerify, b as FrFooter, D as DeFooter } from './Verify_REInX2eZ.mjs';
import { E as EsHeader, D as DeHome } from './Home_ktMVnhLc.mjs';
import { F as FrVerify, D as DeMeta } from './Verify_D63uTEAh.mjs';
import { F as FrMeta, D as DeVerify } from './Verify_SYGfOzvI.mjs';
import { E as EnBlog } from './OpenGraph_BjPLYAEW.mjs';
import EnCommon from './Common_B5Tpd7O0.mjs';
import { a as EsHome, E as EnFooter } from './Home_BwaCdcQj.mjs';
import EnHome from './Home_D1bEzr6B.mjs';
import { F as FrDownload, E as EnVerify } from './Download_DFvhDwcB.mjs';
import EsAccount from './Account_D2JkIviN.mjs';
import EsCommon from './Common_vX1rs6M9.mjs';
import FrCommon from './Common_BcevmFMg.mjs';
import FrHome from './Home_Bs5JpymL.mjs';

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

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin) pointer-events-none z-50 w-fit text-balance rounded-none bg-primary px-3 py-1.5 text-primary-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" })
      ]
    }
  ) });
}

const IconTooltip = ({
  Label,
  Icon,
  Color,
  SizeClass = "h-4 w-4",
  ClassName = "",
  DocHref: _DocHref,
  children
}) => {
  const LabelFlat = Array.isArray(Label) ? Label.join(" ") : Label;
  if (process.env.NODE_ENV === "development" && !LabelFlat) {
    console.warn("IconTooltip: Label (aria-label) is required");
  }
  const Content = children ?? (Icon ? /* @__PURE__ */ jsx(
    Icon,
    {
      className: `${SizeClass} ${ClassName}`,
      style: Color ? { color: Color } : void 0,
      "aria-hidden": "true"
    }
  ) : null);
  if (!Content) return null;
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, tabIndex: -1, children: /* @__PURE__ */ jsx(
      "span",
      {
        className: "inline-flex items-center",
        "aria-label": LabelFlat,
        title: LabelFlat,
        role: "img",
        children: Content
      }
    ) }),
    /* @__PURE__ */ jsx(TooltipContent, { children: Array.isArray(Label) ? Label.map((Line, Index) => /* @__PURE__ */ jsx("p", { children: Line }, Index)) : Label })
  ] }) });
};

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

const DATA_PREFIX = "data:";
function inferSourceFormat(src) {
  if (src.startsWith(DATA_PREFIX)) {
    const sepIndex = src.indexOf(";");
    const commaIndex = src.indexOf(",");
    const mimeEnd = sepIndex === -1 ? commaIndex : commaIndex === -1 ? sepIndex : Math.min(sepIndex, commaIndex);
    if (mimeEnd === -1) return void 0;
    const mime = src.slice(DATA_PREFIX.length, mimeEnd);
    if (mime === "image/svg+xml") return "svg";
    const sub = mime.split("/")[1];
    return sub || void 0;
  }
  try {
    const cleanSrc = removeQueryString(src).split("#")[0];
    const lastSlash = cleanSrc.lastIndexOf("/");
    const basename = lastSlash === -1 ? cleanSrc : cleanSrc.slice(lastSlash + 1);
    const lastDot = basename.lastIndexOf(".");
    if (lastDot === -1) return void 0;
    return basename.slice(lastDot + 1).toLowerCase();
  } catch {
    return void 0;
  }
}
function resolveDefaultOutputFormat(sourceFormat) {
  return sourceFormat === "svg" ? "svg" : DEFAULT_OUTPUT_FORMAT;
}

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + `0${i.toString(16)}`.slice(-2), "");
const getView = (input, offset) => new DataView(input.buffer, input.byteOffset + offset);
const readInt16LE = (input, offset = 0) => getView(input, offset).getInt16(0, true);
const readUInt16BE = (input, offset = 0) => getView(input, offset).getUint16(0, false);
const readUInt16LE = (input, offset = 0) => getView(input, offset).getUint16(0, true);
const readUInt24LE = (input, offset = 0) => {
  const view = getView(input, offset);
  return view.getUint16(0, true) + (view.getUint8(2) << 16);
};
const readInt32LE = (input, offset = 0) => getView(input, offset).getInt32(0, true);
const readUInt32BE = (input, offset = 0) => getView(input, offset).getUint32(0, false);
const readUInt32LE = (input, offset = 0) => getView(input, offset).getUint32(0, true);
const readUInt64 = (input, offset, isBigEndian) => getView(input, offset).getBigUint64(0, !isBigEndian);
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset = 0, isBigEndian = false) {
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = `readUInt${bits}${endian}`;
  return methods[methodName](input, offset);
}
function readBox(input, offset) {
  if (input.length - offset < 4) return;
  const boxSize = readUInt32BE(input, offset);
  if (input.length - offset < boxSize) return;
  return {
    name: toUTF8String(input, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(input, boxName, currentOffset) {
  while (currentOffset < input.length) {
    const box = readBox(input, currentOffset);
    if (!box) break;
    if (box.name === boxName) return box;
    currentOffset += box.size > 0 ? box.size : 8;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const images = [];
    for (let imageIndex = 0; imageIndex < nbImages; imageIndex += 1) {
      images.push(getImageSize$1(input, imageIndex));
    }
    return {
      width: imageSize.width,
      height: imageSize.height,
      images
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  avis: "avif",
  // avif-sequence
  mif1: "heif",
  msf1: "heif",
  // heif-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectType(input, start, end) {
  let hasAvif = false;
  let hasHeic = false;
  let hasHeif = false;
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(input, i, i + 4);
    if (brand === "avif" || brand === "avis") hasAvif = true;
    else if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "hevx") hasHeic = true;
    else if (brand === "mif1" || brand === "msf1") hasHeif = true;
  }
  if (hasAvif) return "avif";
  if (hasHeic) return "heic";
  if (hasHeif) return "heif";
}
const HEIF = {
  validate(input) {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "ftyp") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand in brandMap;
  },
  calculate(input) {
    const metaBox = findBox(input, "meta", 0);
    const iprpBox = metaBox && findBox(input, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(input, "ipco", iprpBox.offset + 8);
    if (!ipcoBox) {
      throw new TypeError("Invalid HEIF, no ipco box found");
    }
    const type = detectType(input, 8, metaBox.offset);
    const images = [];
    let currentOffset = ipcoBox.offset + 8;
    while (currentOffset < ipcoBox.offset + ipcoBox.size) {
      const ispeBox = findBox(input, "ispe", currentOffset);
      if (!ispeBox) break;
      const rawWidth = readUInt32BE(input, ispeBox.offset + 12);
      const rawHeight = readUInt32BE(input, ispeBox.offset + 16);
      const clapBox = findBox(input, "clap", currentOffset);
      let width = rawWidth;
      let height = rawHeight;
      if (clapBox && clapBox.offset < ipcoBox.offset + ipcoBox.size) {
        const cropRight = readUInt32BE(input, clapBox.offset + 12);
        width = rawWidth - cropRight;
      }
      images.push({ height, width });
      currentOffset = ispeBox.offset + ispeBox.size;
    }
    if (images.length === 0) {
      throw new TypeError("Invalid HEIF, no sizes found");
    }
    return {
      width: images[0].width,
      height: images[0].height,
      type,
      ...images.length > 1 ? { images } : {}
    };
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    const images = [];
    while (imageOffset < fileLength && imageOffset < inputLength) {
      const imageHeader = readImageHeader(input, imageOffset);
      const imageSize = getImageSize(imageHeader[0]);
      images.push(imageSize);
      imageOffset += imageHeader[1];
    }
    if (images.length === 0) {
      throw new TypeError("Invalid ICNS, no sizes found");
    }
    return {
      width: images[0].width,
      height: images[0].height,
      ...images.length > 1 ? { images } : {}
    };
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => readUInt32BE(input, 0) === 4283432785,
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "jP  ") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand === "jp2 ";
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(_input) {
    let input = _input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      validateInput(input, i);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

class BitReader {
  // Skip the first 16 bits (2 bytes) of signature
  byteOffset = 2;
  bitOffset = 0;
  input;
  endianness;
  constructor(input, endianness) {
    this.input = input;
    this.endianness = endianness;
  }
  /** Reads a specified number of bits, and move the offset */
  getBits(length = 1) {
    let result = 0;
    let bitsRead = 0;
    while (bitsRead < length) {
      if (this.byteOffset >= this.input.length) {
        throw new Error("Reached end of input");
      }
      const currentByte = this.input[this.byteOffset];
      const bitsLeft = 8 - this.bitOffset;
      const bitsToRead = Math.min(length - bitsRead, bitsLeft);
      if (this.endianness === "little-endian") {
        const mask = (1 << bitsToRead) - 1;
        const bits = currentByte >> this.bitOffset & mask;
        result |= bits << bitsRead;
      } else {
        const mask = (1 << bitsToRead) - 1 << 8 - this.bitOffset - bitsToRead;
        const bits = (currentByte & mask) >> 8 - this.bitOffset - bitsToRead;
        result = result << bitsToRead | bits;
      }
      bitsRead += bitsToRead;
      this.bitOffset += bitsToRead;
      if (this.bitOffset === 8) {
        this.byteOffset++;
        this.bitOffset = 0;
      }
    }
    return result;
  }
}

function calculateImageDimension(reader, isSmallImage) {
  if (isSmallImage) {
    return 8 * (1 + reader.getBits(5));
  }
  const sizeClass = reader.getBits(2);
  const extraBits = [9, 13, 18, 30][sizeClass];
  return 1 + reader.getBits(extraBits);
}
function calculateImageWidth(reader, isSmallImage, widthMode, height) {
  if (isSmallImage && widthMode === 0) {
    return 8 * (1 + reader.getBits(5));
  }
  if (widthMode === 0) {
    return calculateImageDimension(reader, false);
  }
  const aspectRatios = [1, 1.2, 4 / 3, 1.5, 16 / 9, 5 / 4, 2];
  return Math.floor(height * aspectRatios[widthMode - 1]);
}
const JXLStream = {
  validate: (input) => {
    return toHexString(input, 0, 2) === "ff0a";
  },
  calculate(input) {
    const reader = new BitReader(input, "little-endian");
    const isSmallImage = reader.getBits(1) === 1;
    const height = calculateImageDimension(reader, isSmallImage);
    const widthMode = reader.getBits(3);
    const width = calculateImageWidth(reader, isSmallImage, widthMode, height);
    return { width, height };
  }
};

function extractCodestream(input) {
  const jxlcBox = findBox(input, "jxlc", 0);
  if (jxlcBox) {
    return input.slice(jxlcBox.offset + 8, jxlcBox.offset + jxlcBox.size);
  }
  const partialStreams = extractPartialStreams(input);
  if (partialStreams.length > 0) {
    return concatenateCodestreams(partialStreams);
  }
  return void 0;
}
function extractPartialStreams(input) {
  const partialStreams = [];
  let offset = 0;
  while (offset < input.length) {
    const jxlpBox = findBox(input, "jxlp", offset);
    if (!jxlpBox) break;
    partialStreams.push(
      input.slice(jxlpBox.offset + 12, jxlpBox.offset + jxlpBox.size)
    );
    offset = jxlpBox.offset + jxlpBox.size;
  }
  return partialStreams;
}
function concatenateCodestreams(partialCodestreams) {
  const totalLength = partialCodestreams.reduce(
    (acc, curr) => acc + curr.length,
    0
  );
  const codestream = new Uint8Array(totalLength);
  let position = 0;
  for (const partial of partialCodestreams) {
    codestream.set(partial, position);
    position += partial.length;
  }
  return codestream;
}
const JXL = {
  validate: (input) => {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "JXL ") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand === "jxl ";
  },
  calculate(input) {
    const codestream = extractCodestream(input);
    if (codestream) return JXLStream.calculate(codestream);
    throw new Error("No codestream found in JXL container");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: Number.parseInt(dimensions[1], 10),
        width: Number.parseInt(dimensions[0], 10)
      };
    }
    throw new TypeError("Invalid PNM");
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = Number.parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    }
    throw new TypeError("Invalid PAM");
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = extractorRegExps.root.exec(toUTF8String(input));
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width != null && attrs.height != null) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

const CONSTANTS = {
  TAG: {
    WIDTH: 256,
    HEIGHT: 257,
    COMPRESSION: 259
  },
  TYPE: {
    SHORT: 3,
    LONG: 4,
    LONG8: 16
  },
  ENTRY_SIZE: {
    STANDARD: 12,
    BIG: 20
  },
  COUNT_SIZE: {
    STANDARD: 2,
    BIG: 8
  }
};
function readIFD(input, { isBigEndian, isBigTiff }) {
  const ifdOffset = isBigTiff ? Number(readUInt64(input, 8, isBigEndian)) : readUInt(input, 32, 4, isBigEndian);
  const entryCountSize = isBigTiff ? CONSTANTS.COUNT_SIZE.BIG : CONSTANTS.COUNT_SIZE.STANDARD;
  return input.slice(ifdOffset + entryCountSize);
}
function readTagValue(input, type, offset, isBigEndian) {
  switch (type) {
    case CONSTANTS.TYPE.SHORT:
      return readUInt(input, 16, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG:
      return readUInt(input, 32, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG8: {
      const value = Number(readUInt64(input, offset, isBigEndian));
      if (value > Number.MAX_SAFE_INTEGER) {
        throw new TypeError("Value too large");
      }
      return value;
    }
    default:
      return 0;
  }
}
function nextTag(input, isBigTiff) {
  const entrySize = isBigTiff ? CONSTANTS.ENTRY_SIZE.BIG : CONSTANTS.ENTRY_SIZE.STANDARD;
  if (input.length > entrySize) {
    return input.slice(entrySize);
  }
}
function extractTags(input, { isBigEndian, isBigTiff }) {
  const tags = {};
  let temp = input;
  while (temp?.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = isBigTiff ? Number(readUInt64(temp, 4, isBigEndian)) : readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) break;
    if (length === 1 && (type === CONSTANTS.TYPE.SHORT || type === CONSTANTS.TYPE.LONG || isBigTiff && type === CONSTANTS.TYPE.LONG8)) {
      const valueOffset = isBigTiff ? 12 : 8;
      tags[code] = readTagValue(temp, type, valueOffset, isBigEndian);
    }
    temp = nextTag(temp, isBigTiff);
  }
  return tags;
}
function determineFormat(input) {
  const signature = toUTF8String(input, 0, 2);
  const version = readUInt(input, 16, 2, signature === "MM");
  return {
    isBigEndian: signature === "MM",
    isBigTiff: version === 43
  };
}
function validateBigTIFFHeader(input, isBigEndian) {
  const byteSize = readUInt(input, 16, 4, isBigEndian);
  const reserved = readUInt(input, 16, 6, isBigEndian);
  if (byteSize !== 8 || reserved !== 0) {
    throw new TypeError("Invalid BigTIFF header");
  }
}
const signatures = /* @__PURE__ */ new Set([
  "49492a00",
  // Little Endian
  "4d4d002a",
  // Big Endian
  "49492b00",
  // BigTIFF Little Endian
  "4d4d002b"
  // BigTIFF Big Endian
]);
const TIFF = {
  validate: (input) => {
    const signature = toHexString(input, 0, 4);
    return signatures.has(signature);
  },
  calculate(input) {
    const format = determineFormat(input);
    if (format.isBigTiff) {
      validateBigTIFFHeader(input, format.isBigEndian);
    }
    const ifdBuffer = readIFD(input, format);
    const tags = extractTags(ifdBuffer, format);
    const info = {
      height: tags[CONSTANTS.TAG.HEIGHT],
      width: tags[CONSTANTS.TAG.WIDTH],
      type: format.isBigTiff ? "bigtiff" : "tiff"
    };
    if (tags[CONSTANTS.TAG.COMPRESSION]) {
      info.compression = tags[CONSTANTS.TAG.COMPRESSION];
    }
    if (!info.width || !info.height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return info;
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(_input) {
    const chunkHeader = toUTF8String(_input, 12, 16);
    const input = _input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      }
      throw new TypeError("Invalid WebP");
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["jxl", JXL],
  ["jxl-stream", JXLStream],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

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
  if (result.height == null || result.width == null || !result.type) {
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

async function fetchWithRedirects(options) {
  const {
    url,
    headers,
    imageConfig,
    fetchFn = globalThis.fetch,
    redirectLimit = 10,
    onMaxRedirectsExceeded = (_u) => new Error("Maximum redirect depth exceeded"),
    onMissingLocationHeader = (_s, _u) => new Error(`Redirect response ${_s} missing Location header`),
    onDisallowedRedirect = (_current, _target) => new Error(
      `The image at ${_current} redirected to ${_target}, which is not an allowed remote location.`
    )
  } = options;
  if (redirectLimit <= 0) {
    throw onMaxRedirectsExceeded(typeof url === "string" ? url : url.toString());
  }
  const urlString = typeof url === "string" ? url : url.toString();
  const req = new Request(url, { headers });
  const res = await fetchFn(req, { redirect: "manual" });
  if ([301, 302, 303, 307, 308].includes(res.status)) {
    const location = res.headers.get("Location");
    if (!location) {
      throw onMissingLocationHeader(res.status, urlString);
    }
    const redirectUrl = new URL(location, urlString).toString();
    if (!isRemoteAllowed(redirectUrl, {
      domains: imageConfig.domains ?? [],
      remotePatterns: imageConfig.remotePatterns ?? []
    })) {
      throw onDisallowedRedirect(urlString, redirectUrl);
    }
    return fetchWithRedirects({
      url: redirectUrl,
      headers,
      imageConfig,
      fetchFn,
      redirectLimit: redirectLimit - 1,
      onMaxRedirectsExceeded,
      onMissingLocationHeader,
      onDisallowedRedirect
    });
  }
  return res;
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
  let response;
  try {
    response = await fetchWithRedirects({
      url,
      onMaxRedirectsExceeded: (u) => new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(u)
      }),
      onMissingLocationHeader: (_status, u) => new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(u)
      }),
      imageConfig: imageConfig ?? {
        remotePatterns: [],
        domains: []
      }
    });
  } catch (_err) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  if (allowlistConfig && !isRemoteAllowed(response.url, allowlistConfig)) {
    throw new AstroError({
      ...RemoteImageNotAllowed,
      message: RemoteImageNotAllowed.message(url)
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
      if (isESMImportedImage(options.src)) {
        options.format = resolveDefaultOutputFormat(options.src.format);
      } else {
        const inferred = inferSourceFormat(options.src);
        if (inferred) options.format = resolveDefaultOutputFormat(inferred);
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
    const targetFormat = options.format;
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
        attributes: targetFormat ? { type: `image/${targetFormat}` } : {}
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
      format: params.has("f") ? params.get("f") : void 0,
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
      './sharp_Blx5iPJZ.mjs'
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
      if (result.format) {
        resolvedOptions.format ??= resolveDefaultOutputFormat(result.format);
      }
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
    const currentPosition = resolvedOptions.position || "center";
    resolvedOptions["data-astro-image-pos"] = currentPosition.replace(/\s+/g, "-");
  }
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  validatedOptions.format ??= await peekRemoteFormatForStaticEmit(
    validatedOptions,
    imageConfig,
    service
  );
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
async function peekRemoteFormatForStaticEmit(options, imageConfig, service) {
  if (!isRemoteImage(options.src) || !isRemoteAllowed(options.src, imageConfig) || !globalThis.astroAsset?.addStaticImage || !isLocalService(service) || !service.getRemoteSize) {
    return void 0;
  }
  try {
    const probed = await service.getRemoteSize(options.src, imageConfig);
    return resolveDefaultOutputFormat(probed.format);
  } catch {
    return void 0;
  }
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
}, "/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/astro@6.4.2_@types+node@25.9.1_aws4fetch@1.0.20_jiti@1.21.7_lightningcss@1.32.0_rollup@_3cd6db198ab083558def80ccd14cf248/node_modules/astro/components/Image.astro", void 0);

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
}, "/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/astro@6.4.2_@types+node@25.9.1_aws4fetch@1.0.20_jiti@1.21.7_lightningcss@1.32.0_rollup@_3cd6db198ab083558def80ccd14cf248/node_modules/astro/components/Picture.astro", void 0);

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
}, "/Volumes/CORSAIR/Developer/macOS/node_modules/.pnpm/astro@6.4.2_@types+node@25.9.1_aws4fetch@1.0.20_jiti@1.21.7_lightningcss@1.32.0_rollup@_3cd6db198ab083558def80ccd14cf248/node_modules/astro/components/Font.astro", void 0);

class RemoteRuntimeFontFileUrlResolver {
  #urls;
  #address;
  constructor({
    urls,
    address
  }) {
    this.#urls = urls;
    this.#address = address;
  }
  resolve(url) {
    if (!this.#urls.has(url)) {
      return null;
    }
    if (!this.#address) {
      throw new Error("Server address unavailable, this should not happen. Open an issue.");
    }
    if (!url.startsWith("/")) {
      url = new URL(url).pathname;
    }
    const host = this.#address.family === "IPv6" ? `[${this.#address.address}]` : this.#address.address;
    return `http://${host}:${this.#address.port}${url}`;
  }
}

new RemoteRuntimeFontFileUrlResolver({
								urls: new Set([]),
								address: null,
							});

const assetQueryParams = undefined;
					const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"dangerouslyProcessSVG":false,"domains":[],"remotePatterns":[],"responsiveStyles":false};
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
      const CaughtError = this.state.error ?? new Error("Unknown error");
      if (this.props.FallbackComponent) {
        return this.props.FallbackComponent(
          CaughtError,
          this.HandleRetry
        );
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ jsx("div", { className: "flex min-h-[200px] items-center justify-center p-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md border border-[var(--Destruct)] bg-white p-8 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 h-1 w-8 bg-[var(--Destruct)]" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold text-[var(--Foreground)]", children: "Something went wrong" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-[var(--MuteForeground)]", children: CaughtError.message || "An unexpected error occurred. Please try again." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: this.HandleRetry,
            className: "inline-flex h-9 items-center justify-center border border-[var(--Destruct)] bg-white px-4 py-2 font-medium text-[var(--Destruct)] transition-all hover:bg-[var(--Destruct)] hover:text-white",
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

const Footer = ({ Content }) => {
  const { t: T } = useTranslation("footer");
  const FooterData = Content || {
    Brand: {
      Name: T("brand.name", { defaultValue: "Code Editor Land" }),
      Description: T("brand.description", {
        defaultValue: "Rust and Tauri editor stack. CC0."
      })
    },
    Columns: [
      {
        Title: T("columns.product.title", "Product"),
        Links: [
          {
            Label: T("columns.product.features", "Features"),
            Href: "/#features"
          },
          {
            Label: T("columns.product.downloads", "Downloads"),
            Href: "/Download"
          },
          {
            Label: T("columns.product.docs", "Documentation"),
            Href: "/Doc"
          },
          {
            Label: T("columns.product.blog", "Blog"),
            Href: "/Blog"
          }
        ]
      },
      {
        Title: T("columns.company.title", "Community"),
        Links: [
          {
            Label: T("columns.company.issues", "Issues"),
            Href: "https://github.com/CodeEditorLand/Land/issues"
          },
          {
            Label: T(
              "columns.company.contributing",
              "Contributing"
            ),
            Href: "/Contributing"
          },
          {
            Label: T("columns.company.github", "GitHub"),
            Href: "https://github.com/CodeEditorLand/Land"
          },
          {
            Label: T("columns.company.enterprise", "Enterprise"),
            Href: "/Contact/Sale"
          }
        ]
      },
      {
        Title: T("columns.legal.title", "Legal"),
        Links: [
          {
            Label: T("columns.legal.privacy", "Privacy"),
            Href: "/Legal/Privacy"
          },
          {
            Label: T("columns.legal.terms", "Terms"),
            Href: "/Legal/Term"
          },
          {
            Label: T("columns.legal.license", "License"),
            Href: "/License"
          }
        ]
      }
    ],
    BottomBar: { MadeWith: true }
  };
  return /* @__PURE__ */ jsx("footer", { className: "Footer", role: "contentinfo", "aria-label": "Site footer", children: /* @__PURE__ */ jsxs("div", { className: "FooterContent container mx-auto px-4 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            className: "mb-4 flex items-center space-x-3 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": `${FooterData.Brand?.Name || "Land"} - Go to homepage`,
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
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: FooterData.Brand?.Name || "Land" })
            ]
          }
        ),
        FooterData.Brand?.Description && /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-md text-muted-foreground", children: FooterData.Brand.Description })
      ] }),
      FooterData.Columns?.map((Column, ColumnIndex) => /* @__PURE__ */ jsxs("nav", { "aria-label": Column.Title, children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 font-medium", children: Column.Title }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-muted-foreground", children: Column.Links.map((Link, LinkIndex) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: Link.Href,
            className: "StaccatoNavLink transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            ...Link.Href.startsWith("http") ? {
              target: "_blank",
              rel: "noopener noreferrer"
            } : {},
            children: Link.Label
          }
        ) }, LinkIndex)) })
      ] }, ColumnIndex))
    ] }),
    /* @__PURE__ */ jsx(Separator, { className: "StaccatoSeparator my-8" }),
    /* @__PURE__ */ jsx("div", { className: "StaccatoCard mb-6 bg-[var(--Mute)] p-4", children: /* @__PURE__ */ jsxs("p", { className: "leading-relaxed text-muted-foreground", children: [
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
            className: "StaccatoSocial focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Code Editor Land on GitHub (opens in new tab)",
            children: /* @__PURE__ */ jsx(IconTooltip, { Label: "GitHub", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/Image/GitHub.svg",
                alt: "GitHub",
                width: "20",
                height: "20",
                className: "h-5 w-5"
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "InlineSeparator", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://x.com/CodeEditorLand",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "StaccatoSocial focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "Code Editor Land on X (opens in new tab)",
            children: /* @__PURE__ */ jsx(IconTooltip, { Label: "X (Twitter)", children: /* @__PURE__ */ jsx(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "currentColor",
                width: "20",
                height: "20",
                className: "h-5 w-5",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
              }
            ) })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "InlineSeparator", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: T("bottomBar.copyright", {
          year: (/* @__PURE__ */ new Date()).getFullYear(),
          defaultValue: `© ${(/* @__PURE__ */ new Date()).getFullYear()} Code Editor Land. All rights reserved.`
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://PlayForm.Cloud",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-muted-foreground transition-colors hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
            "aria-label": "PlayForm (opens in new tab)",
            children: [
              "PlayForm",
              /* @__PURE__ */ jsx("span", { className: "InlineSeparator", children: "→" })
            ]
          }
        ),
        FooterData.BottomBar?.MadeWith && /* @__PURE__ */ jsx(
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

const PostAuthToServiceWorker = (Token, UserId) => {
  try {
    if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller)
      return;
    navigator.serviceWorker.controller.postMessage({
      Type: "Auth:Write",
      Token,
      ExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1e3,
      UserId
    });
  } catch {
  }
};
const ClearAuthFromServiceWorker = () => {
  try {
    if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller)
      return;
    navigator.serviceWorker.controller.postMessage({ Type: "Auth:Clear" });
  } catch {
  }
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
      ).then(async (Result) => {
        if (Result.success && Result.data?.session) {
          PostAuthToServiceWorker(
            Result.data.session.token,
            Result.data.user.id
          );
        }
        return Result;
      }),
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
      ).then(async (Result) => {
        if (Result.success && Result.data?.session) {
          PostAuthToServiceWorker(
            Result.data.session.token,
            Result.data.user.id
          );
        }
        return Result;
      }),
      Logout: () => WithRetry(
        () => FetchWithAuthentication("/auth/logout", {
          method: "POST"
        })
      ).then((Result) => {
        ClearAuthFromServiceWorker();
        try {
          localStorage.removeItem("session_token");
          document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        } catch {
        }
        return Result;
      }),
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
    } catch {
    }
  }, []);
  const Track = async (Event, Properties = {}) => {
    if (!Client) return;
    try {
      await Client.Analytics.Track(Event, Properties);
    } catch {
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
const UseAnalytics = () => useContext(AnalyticsContext);

const PageviewTracker = () => {
  const Analytics = UseAnalytics();
  const [IsMounted, SetIsMounted] = useState(false);
  const HasTrackedReference = useRef(false);
  const TrackPageViewReference = useRef(null);
  useEffect(() => {
    SetIsMounted(true);
  }, []);
  useEffect(() => {
    if (!Analytics || !IsMounted) return;
    TrackPageViewReference.current = Analytics.trackPageView;
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
  }, [IsMounted, Analytics]);
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
  const SafeDescription = description || "Rust and Tauri editor stack with VS Code API compatibility in progress.";
  const SiteURL = url;
  const SiteOrigin = SiteURL.startsWith("http") ? new URL(SiteURL).origin : "";
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
      "url": SiteOrigin
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
        content: image.startsWith("http") ? image : `${SiteOrigin}${image}`
      }
    ),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "675" }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        property: "og:image:type",
        content: image.endsWith(".svg") ? "image/svg+xml" : "image/png"
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
        content: image.startsWith("http") ? image : `${SiteOrigin}${image}`
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
    /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: "bg" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: "de" }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#ffffff" }),
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

function GetI18n() {
  if (!i18n.isInitialized) {
    i18n.init({
      resources: {
        en: {
          blog: EnBlog,
          common: EnCommon,
          doc: EnDoc,
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
        "blog",
        "common",
        "doc",
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

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Base;
  const RawPath = Astro2.url.pathname === "/" ? "/" : Astro2.url.pathname.replace(/\/$/, "");
  const CanonicalPath = PascalCaseCanonical[RawPath] ?? RawPath;
  const DefaultURL = Astro2.url.href;
  const OpenGraphSlug = CanonicalPath === "/" ? "" : CanonicalPath.replace(/^\//, "");
  const DefaultOpenGraphImage = OpenGraphSlug ? `/OpenGraph/${OpenGraphSlug}.svg` : "/OpenGraph.svg";
  const {
    Title,
    Description,
    Language = "en",
    Direction = "ltr",
    Image = DefaultOpenGraphImage,
    Url = DefaultURL,
    Type = "website",
    NoIndex = false
  } = Astro2.props;
  const T = GetI18n();
  return renderTemplate(_a || (_a = __template(["<html", ' class="no-js"', '> <head><meta charset="utf-8">', "<!-- Dynamic Meta Tags -->", `<meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#ffffff"><meta name="format-detection" content="telephone=no"><meta name="twitter:dnt" content="on"><!-- Fonts: preconnect to Google Fonts origins, then preload the CSS
		 stylesheet as a high-priority fetch. The font CSS file itself is small
		 (~1 KB) and declares the @font-face rules that trigger woff2 downloads.
		 Preloading the stylesheet eliminates the render-blocking parser delay
		 while keeping font-display: optional to prevent CLS from font swap. --><link rel="preconnect" href="https://fonts.googleapis.com" crossorigin=\"anonymous\"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin crossorigin=\"anonymous\"><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=optional" crossorigin=\"anonymous\"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=optional" media="print" onload="this.media='all'" crossorigin=\"anonymous\">`, '<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=optional" crossorigin=\"anonymous\"></noscript><!-- LCP optimization: preload hero logo used in DynamicHeroSection --><link rel="preload" as="image" href="/Asset/Logo/Glyph/Land.svg"><!-- i18n client - must initialize before any React component hydrates -->', '<script crossorigin=\"anonymous\" type="application/ld+json">', "<\/script>", '<!-- Favicon --><link rel="icon" type="image/png" href="/Favicon/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/Favicon/favicon.svg"><link rel="shortcut icon" href="/Favicon/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="Code Editor Land"><link rel="manifest" href="/Favicon/site.webmanifest">', '</head> <body> <a href="#main-content" class="sr-only fixed left-2 top-2 z-[100] -translate-y-full bg-[var(--Primary)] px-4 py-2 font-medium text-white transition-transform focus:not-sr-only focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]">\nSkip to main content\n</a> ', " ", ' <div id="Footer" class="shrink"> ', " </div> ", " ", " ", ' <a class="absolute left-0 top-0 hidden" rel="me" href="https://x.com/CodeEditorLand" aria-hidden="true" tabindex="-1"></a> </body></html>'])), addAttribute(Language, "lang"), addAttribute(Direction, "dir"), renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=0&lang.ts"), renderComponent($$result, "MetaTags", MetaTags, { "title": Title || T("meta.title", { defaultValue: "Land" }), "description": Description || T("meta.description", { defaultValue: "Code Editor" }), "image": Image, "url": Url, "type": Type, "lang": Language, "noIndex": NoIndex }), maybeRenderHead(), renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=1&lang.ts"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Code Editor Land",
    "operatingSystem": "Windows, macOS, Linux",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "url": Astro2.site?.href ?? "",
    "downloadUrl": `${Astro2.site?.href ?? ""}Download`,
    "license": "https://creativecommons.org/publicdomain/zero/1.0/"
  })), renderSlot($$result, $$slots["Head"]), renderHead(), renderComponent($$result, "Background", $$Background, {}), renderComponent($$result, "AnalyticsProvider", AnalyticsProvider, {}, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "PageviewTracker", PageviewTracker, {})} <main id="main-content" class="grow" tabindex="-1"> ${renderComponent($$result2, "ErrorBoundary", ErrorBoundary, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary", "client:component-export": "ErrorBoundary" }, { "default": async ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["default"])} ` })} </main> ` }), renderComponent($$result, "Footer", Footer, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Footer", "client:component-export": "Footer" }), renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=2&lang.ts"), renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=3&lang.ts"), renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro?astro&type=script&index=4&lang.ts"));
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Layout/Base.astro", void 0);

export { $$Base as $, ErrorBoundary as E, GetI18n as G, IconTooltip as I, WorkerClient as W, GetWorkersClient as a, baseService as b, cn as c, detector as d, resolveDefaultOutputFormat as e, getImage$1 as g, parseQuality as p, renderScript as r };
