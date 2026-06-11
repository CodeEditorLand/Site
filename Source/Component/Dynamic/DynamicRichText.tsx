"use client";

import { RichText, type RichTextProps } from "../UI/RichText.js";

/**
 * Thin client island that renders a translated string through the RichText
 * parser. Use this in Astro pages where translations contain `\n\n` paragraph
 * breaks, inline code (backticks), or other RichText markup.
 *
 * Usage in .astro:
 * <DynamicRichText client:load Text={T("some.key")} ClassName="text-muted-foreground" />
 */
const DynamicRichText = (Props: RichTextProps) => <RichText {...Props} />;

export { DynamicRichText };

export default DynamicRichText;
