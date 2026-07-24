const fs = require('fs');
let c = fs.readFileSync('Source/Component/UI/RichText.tsx', 'utf8');

// 1. Remove bg-* and dark:bg-* from CategoryStyle (keep border + text only)
const replacements = [
  ['Architecture:\n\t\t"border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"',
   'Architecture:\n\t\t"border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"'],
  ['Telemetry:\n\t\t"border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"',
   'Telemetry:\n\t\t"border-yellow-200 text-yellow-700 dark:border-yellow-800 dark:text-yellow-300"'],
  ['Protocol:\n\t\t"border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"',
   'Protocol:\n\t\t"border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300"'],
  ['Feature:\n\t\t"border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300"',
   'Feature:\n\t\t"border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300"'],
  ['License:\n\t\t"border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"',
   'License:\n\t\t"border-green-200 text-green-700 dark:border-green-800 dark:text-green-300"'],
  ['Tool: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300"',
   'Tool: "border-sky-200 text-sky-700 dark:border-sky-800 dark:text-sky-300"'],
];

for (const [old, rep] of replacements) {
  if (c.includes(old)) c = c.replace(old, rep);
  else console.log('WARNING: not found:', old.substring(0, 40));
}

// 2. Add CategoryFill after CategoryStyle, before CategoryLabel
const fillBlock = [
  '',
  'const CategoryFill: Record<TermCategory, string> = {',
  '\tArchitecture: "color-mix(in srgb, #3b82f6 15%, var(--Background))",',
  '\tTelemetry:   "color-mix(in srgb, #eab308 15%, var(--Background))",',
  '\tProtocol:    "color-mix(in srgb, #a855f7 15%, var(--Background))",',
  '\tFeature:     "color-mix(in srgb, #f97316 15%, var(--Background))",',
  '\tLicense:     "color-mix(in srgb, #22c55e 15%, var(--Background))",',
  '\tTool:        "color-mix(in srgb, #0ea5e9 15%, var(--Background))",',
  '};',
  '',
].join('\n');

const marker = 'const CategoryLabel';
c = c.replace(marker, fillBlock + marker);

// 3. Add Fill const in SegmentNode and use it
const oldStyleVar = 'const Style = CategoryStyle[Segment.Category];';
const newStyleVar = 'const Style = CategoryStyle[Segment.Category];\n\t\t\tconst Fill = CategoryFill[Segment.Category];';
c = c.replace(oldStyleVar, newStyleVar);

// 4. Use Fill in the badge style
c = c.replace('"--jelly-fill": "var(--Mute)"', '"--jelly-fill": Fill');

fs.writeFileSync('Source/Component/UI/RichText.tsx', c);
console.log('Done - all replacements applied');
