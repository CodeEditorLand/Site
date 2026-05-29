const EnBlog = {
  "meta.title": "Blog | Code Editor Land",
  "meta.description": "Architecture deep-dives, release notes, and updates.",
  "page.title": "Blog",
  "page.subtitle": "Architecture, releases, and the road ahead.",
  "card.readMore": "Read more",
  "card.minRead": "min read",
  "empty.title": "No posts yet",
  "empty.subtitle": "Check back soon for updates.",
};

const Blog = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: EnBlog
}, Symbol.toStringTag, { value: 'Module' }));

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
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

const Auth0ClientIdentifier = "sTv8kJI2TQPpCJjCbSvbRWKc3Lrx1TeF";

const Auth0ClientIdentifier$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Auth0ClientIdentifier
}, Symbol.toStringTag, { value: 'Module' }));

const GET = async ({ params }) => {
  const Slug = params.Slug ?? "";
  const GenerateOpenGraphSvg = (await Promise.resolve().then(() => OpenGraph)).default;
  const PageMetadata = (await import('./Turbulence_Buu9D-ou.mjs').then(n => n.P)).default;
  const StaticMeta = PageMetadata[Slug];
  if (StaticMeta) {
    const Svg2 = GenerateOpenGraphSvg(
      StaticMeta.Title,
      StaticMeta.Description,
      StaticMeta.Section
    );
    return new Response(Svg2, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400"
      }
    });
  }
  if (Slug.startsWith("Blog/")) {
    const BlogSlug = Slug.replace("Blog/", "");
    try {
      const { getCollection } = await import('./_astro_content_z7RQwGeJ.mjs');
      const BlogEntry = (await getCollection("blog")).find(
        (Entry) => Entry.id === BlogSlug
      );
      if (BlogEntry) {
        const Svg2 = GenerateOpenGraphSvg(
          BlogEntry.data.title,
          BlogEntry.data.summary ?? BlogEntry.data.title,
          "Blog"
        );
        return new Response(Svg2, {
          status: 200,
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=86400"
          }
        });
      }
    } catch {
    }
  }
  if (Slug.startsWith("Doc/")) {
    const DocSlug = Slug.replace("Doc/", "");
    try {
      const { getCollection } = await import('./_astro_content_z7RQwGeJ.mjs');
      const DocEntry = (await getCollection("doc")).find(
        (Entry) => Entry.id === DocSlug
      );
      if (DocEntry) {
        const Svg2 = GenerateOpenGraphSvg(
          DocEntry.data.title,
          DocEntry.data.description ?? DocEntry.data.title,
          "Doc"
        );
        return new Response(Svg2, {
          status: 200,
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=86400"
          }
        });
      }
    } catch {
    }
  }
  const FallbackTitle = Slug.replace(/\//g, " | ") || "Code Editor Land";
  const Svg = GenerateOpenGraphSvg(
    FallbackTitle,
    "The next-generation code editor built with Rust and Tauri."
  );
  return new Response(Svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400"
    }
  });
};
const getStaticPaths = async () => {
  const PageMetadata = (await import('./Turbulence_Buu9D-ou.mjs').then(n => n.P)).default;
  const StaticPath = Object.keys(PageMetadata).filter((Slug) => Slug !== "").map((Slug) => ({ params: { Slug } }));
  let BlogPath = [];
  try {
    const { getCollection } = await import('./_astro_content_z7RQwGeJ.mjs');
    const BlogEntry = await getCollection("blog");
    BlogPath = BlogEntry.map((Entry) => ({
      params: { Slug: `Blog/${Entry.id}` }
    }));
  } catch {
  }
  let DocPath = [];
  try {
    const { getCollection } = await import('./_astro_content_z7RQwGeJ.mjs');
    const DocEntry = await getCollection("doc");
    DocPath = DocEntry.map((Entry) => ({
      params: { Slug: `Doc/${Entry.id}` }
    }));
  } catch {
  }
  return [...StaticPath, ...BlogPath, ...DocPath];
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

const ____Slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	page
}, Symbol.toStringTag, { value: 'Module' }));

const contentModules = new Map();

const contentModules$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: contentModules
}, Symbol.toStringTag, { value: 'Module' }));

const WrapText = (Text, MaxCharacter) => {
  const Word = Text.split(" ");
  const Line = [];
  let Current = "";
  for (const W of Word) {
    if (Current.length + W.length + 1 > MaxCharacter && Current.length > 0) {
      Line.push(Current);
      Current = W;
    } else {
      Current = Current.length > 0 ? `${Current} ${W}` : W;
    }
  }
  if (Current.length > 0) Line.push(Current);
  return Line;
};
const EscapeXML = (Text) => Text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const LogoGlyph = () => `<rect width="1005.28" height="620.771" rx="91.3889"
		transform="matrix(-0.23340 0.08959 0 0.25 925 138)"
		fill="#151515" fill-opacity="0.20" />
	<rect width="1005.28" height="620.771" rx="91.3889"
		transform="matrix(-0.23340 0.08959 0 0.25 1160 292.55)"
		fill="#151515" fill-opacity="0.20" />`;
const GenerateOpenGraphSvg = (Title, Description, Section) => {
  const Width = 1200;
  const Height = 675;
  const TitleLine = WrapText(Title, 22);
  const DescriptionLine = WrapText(Description, 48);
  const ClampedTitleLine = TitleLine.slice(0, 3);
  const ClampedDescriptionLine = DescriptionLine.slice(0, 3);
  const TitleFontSize = ClampedTitleLine.length > 2 ? 40 : 48;
  const TitleLineHeight = TitleFontSize * 1.3;
  const DescriptionFontSize = 20;
  const DescriptionLineHeight = DescriptionFontSize * 1.6;
  const SectionBadge = Section ? `<rect x="72" y="56" width="${Section.length * 13 + 28}" height="32" rx="4" fill="#151515" fill-opacity="0.08" />
		<text x="86" y="78" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#555555" letter-spacing="0.1em">${EscapeXML(Section.toUpperCase())}</text>` : "";
  const TitleStartY = Section ? 138 : 110;
  const TitleElement = ClampedTitleLine.map(
    (Line, Index) => `<text x="72" y="${TitleStartY + Index * TitleLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${TitleFontSize}" font-weight="700" fill="#151515">${EscapeXML(Line)}</text>`
  ).join("\n		");
  const DescriptionStartY = TitleStartY + ClampedTitleLine.length * TitleLineHeight + 20;
  const DescriptionElement = ClampedDescriptionLine.map(
    (Line, Index) => `<text x="72" y="${DescriptionStartY + Index * DescriptionLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${DescriptionFontSize}" font-weight="400" fill="#666666">${EscapeXML(Line)}</text>`
  ).join("\n		");
  return `<svg width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}" xmlns="http://www.w3.org/2000/svg">
	<!-- Background -->
	<rect width="${Width}" height="${Height}" fill="#ffffff" />

	<!-- Top accent line -->
	<rect width="${Width}" height="4" fill="#151515" fill-opacity="0.12" />

	<!-- Land logo glyph: upper + lower parallelogram, x 690-1160, y 138-538 -->
	${LogoGlyph()}

	<!-- Section badge -->
	${SectionBadge}

	<!-- Title -->
	${TitleElement}

	<!-- Description -->
	${DescriptionElement}

	<!-- Bottom bar -->
	<rect y="${Height - 56}" width="${Width}" height="56" fill="#fafafa" />
	<line x1="0" y1="${Height - 56}" x2="${Width}" y2="${Height - 56}" stroke="#e5e5e5" stroke-width="1" />

	<!-- URL (bottom-left) -->
	<text x="72" y="${Height - 20}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="500" fill="#888888">land.playform.cloud</text>

	<!-- Brand name (bottom-right) -->
	<text x="${Width - 72}" y="${Height - 20}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="600" fill="#888888" text-anchor="end">Code Editor Land</text>
</svg>`;
};

const OpenGraph = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: GenerateOpenGraphSvg
}, Symbol.toStringTag, { value: 'Module' }));

export { Auth0ClientIdentifier as A, Blog as B, DEFAULT_HASH_PROPS as D, EnBlog as E, OpenGraph as O, VALID_INPUT_FORMATS as V, ____Slug_ as _, Auth0ClientIdentifier$1 as a, DEFAULT_OUTPUT_FORMAT as b, VALID_SUPPORTED_FORMATS as c, contentModules$1 as d };
