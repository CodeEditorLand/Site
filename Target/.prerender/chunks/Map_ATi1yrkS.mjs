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
const SemanticAlias = {
  // Download
  "/downloads": "/Download",
  "/down": "/Download",
  "/get": "/Download",
  "/fetch": "/Download",
  "/install": "/Download",
  "/setup": "/Download",
  // Doc
  "/documentation": "/Doc",
  "/reference": "/Doc",
  "/help": "/Doc",
  "/guide": "/Doc",
  "/manual": "/Doc",
  "/api": "/Doc",
  // Auth - SignIn
  "/login": "/Account/SignIn",
  "/log-in": "/Account/SignIn",
  "/sign-in": "/Account/SignIn",
  "/authenticate": "/Account/SignIn",
  "/auth": "/Account/SignIn",
  // Auth - SignUp
  "/register": "/Account/SignUp",
  "/sign-up": "/Account/SignUp",
  "/join": "/Account/SignUp",
  "/create-account": "/Account/SignUp",
  // Auth - ForgotPassword
  "/forgot-password": "/Account/ForgotPassword",
  "/forgot": "/Account/ForgotPassword",
  "/password-reset": "/Account/ForgotPassword",
  "/recover": "/Account/ForgotPassword",
  "/recover-password": "/Account/ForgotPassword",
  // Auth - ResetPassword
  "/reset-password": "/Account/ResetPassword",
  "/reset": "/Account/ResetPassword",
  "/new-password": "/Account/ResetPassword",
  "/change-password": "/Account/ResetPassword",
  // Legal - Term
  "/tos": "/Legal/Term",
  "/terms-of-service": "/Legal/Term",
  "/eula": "/Legal/Term",
  "/conditions": "/Legal/Term",
  // Legal - Privacy
  "/privacy-policy": "/Legal/Privacy",
  "/gdpr": "/Legal/Privacy",
  "/data-policy": "/Legal/Privacy",
  // Contact
  "/sale": "/Contact/Sale",
  "/sales-contact": "/Contact/Sale",
  "/contact-sales": "/Contact/Sale",
  "/pricing": "/Contact/Sale",
  "/enterprise": "/Contact/Sale",
  "/buy": "/Contact/Sale",
  // Contributing
  "/contribute": "/Contributing",
  "/contributors": "/Contributing",
  "/dev": "/Contributing",
  "/develop": "/Contributing",
  "/opensource": "/Contributing",
  "/open-source": "/Contributing",
  // Home - also catches /Visit when SW is active (skips the dispatch page)
  "/home": "/",
  "/main": "/",
  "/index": "/",
  "/start": "/",
  "/welcome": "/",
  "/visit": "/",
  // Verify
  "/verify-email": "/Verify",
  "/email-verification": "/Verify",
  "/confirm": "/Verify",
  "/confirm-email": "/Verify",
  "/activate": "/Verify",
  // Portal
  "/app": "/Portal",
  "/launch": "/Portal",
  "/open": "/Portal",
  // Dashboard
  "/panel": "/Dashboard",
  "/admin": "/Dashboard",
  "/overview": "/Dashboard",
  // License
  "/mit": "/License",
  "/licensing": "/License",
  // Blog
  "/news": "/Blog",
  "/articles": "/Blog",
  "/posts": "/Blog",
  "/updates": "/Blog",
  "/changelog": "/Blog",
  // OAuth
  "/callback": "/OAuth/Success",
  "/oauth-callback": "/OAuth/Success",
  "/auth-callback": "/OAuth/Success"
};
const GenerateSegmentCaseVariant = (PascalSegment) => {
  const Lower = PascalSegment.toLowerCase();
  const Upper = PascalSegment.toUpperCase();
  const Variant = /* @__PURE__ */ new Set();
  Variant.add(Lower);
  Variant.add(Upper);
  Variant.add(PascalSegment);
  Variant.add(
    PascalSegment.charAt(0).toUpperCase() + PascalSegment.slice(1).toLowerCase()
  );
  for (let Index = 1; Index <= PascalSegment.length; Index++) {
    Variant.add(Upper.slice(0, Index) + Lower.slice(Index));
  }
  for (let Index = 1; Index < PascalSegment.length; Index++) {
    Variant.add(Lower.slice(0, Index) + Upper.slice(Index));
  }
  return [...Variant];
};
const GenerateNumberVariant = (Segment) => {
  const Lower = Segment.toLowerCase();
  const Result = [Lower];
  if (Lower.endsWith("ies") && Lower.length > 4) {
    Result.push(Lower.slice(0, -3) + "y");
  } else if (Lower.endsWith("ses") || Lower.endsWith("xes") || Lower.endsWith("zes") || Lower.endsWith("ches") || Lower.endsWith("shes")) {
    Result.push(Lower.slice(0, -2));
  } else if (Lower.endsWith("s") && !Lower.endsWith("ss") && !Lower.endsWith("us") && !Lower.endsWith("is") && Lower.length > 2) {
    Result.push(Lower.slice(0, -1));
  }
  if (!Lower.endsWith("s")) {
    Result.push(Lower + "s");
  }
  return Result;
};
const GenerateAbbreviationPrefix = (PascalSegment) => {
  const Lower = PascalSegment.toLowerCase();
  const Upper = PascalSegment.toUpperCase();
  const Prefix = [];
  if (Lower.length > 4) {
    for (let Length = 2; Length <= Math.min(4, Lower.length - 1); Length++) {
      Prefix.push(Lower.slice(0, Length));
      Prefix.push(Upper.slice(0, Length));
      Prefix.push(Upper.charAt(0) + Lower.slice(1, Length));
    }
  }
  return Prefix;
};
const GenerateCompoundVariant = (PascalSegment) => {
  const Word = PascalSegment.match(/[A-Z][a-z]*/g);
  if (!Word || Word.length < 2) {
    return [];
  }
  const Lower = Word.map((W) => W.toLowerCase());
  const Variant = [];
  Variant.push(Lower.join("-"));
  Variant.push(Lower.join("_"));
  Variant.push(Lower.join(""));
  Variant.push(Lower.join("."));
  if (Lower.length === 2) {
    Variant.push([...Lower].reverse().join("-"));
  }
  return Variant;
};
const GeneratePathVariant = (CanonicalPath2, BuiltPath) => {
  if (CanonicalPath2 === "/") return [];
  const CanonicalSegment = CanonicalPath2.slice(1).split("/");
  const BuiltSegment = BuiltPath.slice(1).split("/");
  const SegmentVariant = CanonicalSegment.map(
    (Segment, Index) => {
      const AllVariant = /* @__PURE__ */ new Set();
      for (const Variant of GenerateSegmentCaseVariant(Segment)) {
        AllVariant.add(Variant);
      }
      for (const Variant of GenerateNumberVariant(Segment)) {
        AllVariant.add(Variant);
        AllVariant.add(Variant.toUpperCase());
        AllVariant.add(
          Variant.charAt(0).toUpperCase() + Variant.slice(1)
        );
      }
      for (const Prefix of GenerateAbbreviationPrefix(Segment)) {
        AllVariant.add(Prefix);
      }
      for (const Compound of GenerateCompoundVariant(Segment)) {
        AllVariant.add(Compound);
        AllVariant.add(Compound.toUpperCase());
        AllVariant.add(
          Compound.charAt(0).toUpperCase() + Compound.slice(1)
        );
      }
      if (BuiltSegment[Index]) {
        AllVariant.add(BuiltSegment[Index]);
      }
      return [...AllVariant];
    }
  );
  const Result = /* @__PURE__ */ new Set();
  if (SegmentVariant.length === 1) {
    for (const Variant of SegmentVariant[0]) {
      Result.add("/" + Variant);
    }
  } else {
    const LowercaseSegment = CanonicalSegment.map((S) => S.toLowerCase());
    for (let Position = 0; Position < SegmentVariant.length; Position++) {
      for (const Variant of SegmentVariant[Position]) {
        const Part = [...LowercaseSegment];
        Part[Position] = Variant;
        Result.add("/" + Part.join("/"));
      }
    }
    Result.add(CanonicalPath2.toUpperCase());
    Result.add(CanonicalPath2.toLowerCase());
    Result.add(BuiltPath);
    const FlatLower = LowercaseSegment.join("");
    const FlatHyphen = LowercaseSegment.join("-");
    const FlatUnderscore = LowercaseSegment.join("_");
    Result.add("/" + FlatLower);
    Result.add("/" + FlatHyphen);
    Result.add("/" + FlatUnderscore);
  }
  const WithSlash = [];
  for (const Path of Result) {
    if (Path !== "/" && !Path.endsWith("/")) {
      WithSlash.push(Path + "/");
    }
  }
  for (const Path of WithSlash) {
    Result.add(Path);
  }
  Result.delete(CanonicalPath2);
  return [...Result];
};

export { CanonicalPath as C, GeneratePathVariant as G, PascalCaseCanonical as P, SemanticAlias as S };
