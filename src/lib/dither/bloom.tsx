import type { ComponentProps, CSSProperties } from "react";

export type Bloom = "off" | "low" | "high";

/** Blur radius and strength of each bloom level. */
const BLOOM_LEVELS = {
  high: { blur: 18, strength: 0.55 },
  low: { blur: 10, strength: 0.3 },
} as const satisfies Record<
  Exclude<Bloom, "off">,
  { blur: number; strength: number }
>;

/**
 * Styles for a bloom layer: a blurred, translucent copy of a fill drawn
 * behind it. `--dither-bloom` scales the strength per theme (1 in dark,
 * lower in light, where glows turn muddy). `undefined` when off.
 */
const bloomLayerStyle = (bloom: Bloom): CSSProperties | undefined => {
  if (bloom === "off") {
    return undefined;
  }
  const { blur, strength } = BLOOM_LEVELS[bloom];
  return {
    filter: `blur(${blur}px)`,
    opacity: `calc(var(--dither-bloom, 1) * ${strength})`,
  };
};

export interface BloomGroupProps extends ComponentProps<"g"> {
  bloom: Bloom;
}

/**
 * An SVG group drawn as a glow: put solid copies of your shapes inside
 * and render it before (under) the real fills. Renders nothing when off.
 */
export const BloomGroup = ({ bloom, style, ...props }: BloomGroupProps) => {
  const layer = bloomLayerStyle(bloom);
  return layer === undefined ? null : (
    <g aria-hidden="true" {...props} style={{ ...layer, ...style }} />
  );
};
