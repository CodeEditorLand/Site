/**
 * Design Tokens
 *
 * Centralized design system tokens using CSS custom properties.
 * All values follow the CodeEditorLand visual language:
 * - No border-radius
 * - Solid borders (3px default)
 * - White/black high contrast
 * - Performance-optimized shadows
 */

export const tokens = {
  colors: {
    primary: {
      light: "#2563eb",
      dark: "#3b82f6",
    },
    "primary-foreground": {
      light: "#ffffff",
      dark: "#000000",
    },
    secondary: {
      light: "#f1f5f9",
      dark: "#1a1a1a",
    },
    "secondary-foreground": {
      light: "#0f172a",
      dark: "#f8fafc",
    },
    accent: {
      light: "#fef08a",
      dark: "#422006",
    },
    "accent-foreground": {
      light: "#0f172a",
      dark: "#fef08a",
    },
    background: {
      light: "#ffffff",
      dark: "#000000",
    },
    foreground: {
      light: "#0f172a",
      dark: "#ffffff",
    },
    muted: {
      light: "#f8fafc",
      dark: "#0a0a0a",
    },
    "muted-foreground": {
      light: "#64748b",
      dark: "#a1a1aa",
    },
    destructive: {
      light: "#ef4444",
      dark: "#dc2626",
    },
    "destructive-foreground": {
      light: "#ffffff",
      dark: "#ffffff",
    },
    border: {
      light: "#e2e8f0",
      dark: "#1a1a1a",
    },
    input: {
      light: "#e2e8f0",
      dark: "#1a1a1a",
    },
    ring: {
      light: "#2563eb",
      dark: "#3b82f6",
    },
  } as const,
  borders: {
    width: {
      thin: "1px",
      medium: "2px",
      thick: "3px",
      thickest: "4px",
    },
    color: {
      default: "var(--color-border)",
      muted: "var(--color-border-muted)",
      strong: "var(--color-border-strong)",
      focus: "var(--color-ring)",
    },
  } as const,
  shadows: {
    none: "",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    lg: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    xl: "0 6px 8px -1px rgba(0, 0, 0, 0.15)",
    "2xl": "0 8px 12px -2px rgba(0, 0, 0, 0.12)",
  } as const,
  typography: {
    fontFamily: {
      sans: ["Albert Sans", "system-ui", "sans-serif"],
      mono: ["Hack", "Menlo", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  } as const,
  spacing: {
    px: "0.25rem",
    "0.5": "0.5rem",
    "1": "1rem",
    "1.5": "1.5rem",
    "2": "2rem",
    "2.5": "2.5rem",
    "3": "3rem",
    "4": "4rem",
    "5": "5rem",
    "6": "6rem",
    "8": "8rem",
    "10": "10rem",
    "12": "12rem",
  } as const,
  animation: {
    easing: {
      ease: "cubic-bezier(0.21, 0.1, 0.21, 1)",
      easeIn: "cubic-bezier(0.21, 0.1, 0.21, 1)",
      easeOut: "cubic-bezier(0.21, 0.9, 0.21, 1)",
      easeInOut: "cubic-bezier(0.21, 0.1, 0.21, 1)",
    },
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
  } as const,
} as const;

export type Tokens = typeof tokens;
export type ColorToken = keyof typeof tokens.colors;
export type BorderToken = keyof typeof tokens.borders;
export type ShadowToken = keyof typeof tokens.shadows;
export type TypographyToken = keyof typeof tokens.typography;
export type SpacingToken = keyof typeof tokens.spacing;
export type AnimationToken = keyof typeof tokens.animation;

export const cssVariables = `
  :root {
    --color-primary: ${tokens.colors.primary.light};
    --color-primary-foreground: ${tokens.colors["primary-foreground"].light};
    --color-secondary: ${tokens.colors.secondary.light};
    --color-secondary-foreground: ${tokens.colors["secondary-foreground"].light};
    --color-accent: ${tokens.colors.accent.light};
    --color-accent-foreground: ${tokens.colors["accent-foreground"].light};
    --color-background: ${tokens.colors.background.light};
    --color-foreground: ${tokens.colors.foreground.light};
    --color-muted: ${tokens.colors.muted.light};
    --color-muted-foreground: ${tokens.colors["muted-foreground"].light};
    --color-destructive: ${tokens.colors.destructive.light};
    --color-destructive-foreground: ${tokens.colors["destructive-foreground"].light};
    --color-border: ${tokens.colors.border.light};
    --color-input: ${tokens.colors.input.light};
    --color-ring: ${tokens.colors.ring.light};
    --border-width-thin: ${tokens.borders.width.thin};
    --border-width-medium: ${tokens.borders.width.medium};
    --border-width-thick: ${tokens.borders.width.thick};
    --border-width-thickest: ${tokens.borders.width.thickest};
    --shadow-sm: ${tokens.shadows.sm};
    --shadow-md: ${tokens.shadows.md};
    --shadow-lg: ${tokens.shadows.lg};
    --shadow-xl: ${tokens.shadows.xl};
    --shadow-2xl: ${tokens.shadows["2xl"]};
    --font-sans: ${tokens.typography.fontFamily.sans.join(", ")};
    --font-mono: ${tokens.typography.fontFamily.mono.join(", ")};
    --spacing-px: ${tokens.spacing.px};
    --spacing-0.5: ${tokens.spacing["0.5"]};
    --spacing-1: ${tokens.spacing["1"]};
    --spacing-1.5: ${tokens.spacing["1.5"]};
    --spacing-2: ${tokens.spacing["2"]};
    --spacing-2.5: ${tokens.spacing["2.5"]};
    --spacing-3: ${tokens.spacing["3"]};
    --spacing-4: ${tokens.spacing["4"]};
    --spacing-5: ${tokens.spacing["5"]};
    --spacing-6: ${tokens.spacing["6"]};
    --spacing-8: ${tokens.spacing["8"]};
    --spacing-10: ${tokens.spacing["10"]};
    --spacing-12: ${tokens.spacing["12"]};
    --easing-ease: ${tokens.animation.easing.ease};
    --easing-ease-in: ${tokens.animation.easing.easeIn};
    --easing-ease-out: ${tokens.animation.easing.easeOut};
    --easing-ease-in-out: ${tokens.animation.easing.easeInOut};
    --duration-fast: ${tokens.animation.duration.fast};
    --duration-normal: ${tokens.animation.duration.normal};
    --duration-slow: ${tokens.animation.duration.slow};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-primary: ${tokens.colors.primary.dark};
      --color-primary-foreground: ${tokens.colors["primary-foreground"].dark};
      --color-secondary: ${tokens.colors.secondary.dark};
      --color-secondary-foreground: ${tokens.colors["secondary-foreground"].dark};
      --color-accent: ${tokens.colors.accent.dark};
      --color-accent-foreground: ${tokens.colors["accent-foreground"].dark};
      --color-background: ${tokens.colors.background.dark};
      --color-foreground: ${tokens.colors.foreground.dark};
      --color-muted: ${tokens.colors.muted.dark};
      --color-muted-foreground: ${tokens.colors["muted-foreground"].dark};
      --color-destructive: ${tokens.colors.destructive.dark};
      --color-destructive-foreground: ${tokens.colors["destructive-foreground"].dark};
      --color-border: ${tokens.colors.border.dark};
      --color-input: ${tokens.colors.input.dark};
      --color-ring: ${tokens.colors.ring.dark};
    }
  }
`;
