import { jsx, jsxs } from 'react/jsx-runtime';
import { c as cn } from './Base_DNiQtfI8.mjs';

function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-none bg-accent", className),
      ...props
    }
  );
}
function SkeletonCard({ className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("bg-white p-6", className), children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "mb-4 h-6 w-3/4 bg-[var(--Secondary)]" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-4 w-full bg-[var(--Secondary)]" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6 bg-[var(--Secondary)]" })
  ] });
}
function SkeletonFeatureCard({ className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("bg-white p-6", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-start justify-between", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-1/2 bg-[var(--Secondary)]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-10 shrink-0 bg-[var(--Secondary)]" })
    ] }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-4 w-full bg-[var(--Secondary)]" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-4 w-5/6 bg-[var(--Secondary)]" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/6 bg-[var(--Secondary)]" })
  ] });
}
function SkeletonPricingTier({ className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("bg-white", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "mb-4 h-9 w-full bg-[var(--Secondary)]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-6 w-1/3 bg-[var(--Secondary)]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mb-4 h-4 w-2/3 bg-[var(--Secondary)]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-1/3 bg-[var(--Secondary)]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-6", children: [1, 2, 3, 4].map((Index) => /* @__PURE__ */ jsx(
      Skeleton,
      {
        className: "mb-3 h-4 w-full bg-[var(--Secondary)]"
      },
      Index
    )) })
  ] });
}

export { Skeleton as S, SkeletonCard as a, SkeletonFeatureCard as b, SkeletonPricingTier as c };
