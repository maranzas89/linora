"use client";

import { GlassBadge } from "wens-liquid-glass-design-system";
import type { GlassBadgeVariant } from "wens-liquid-glass-design-system";

export function ScoreBadge({ score }: { score: number }) {
  const variant: GlassBadgeVariant =
    score >= 80 ? "success" : score >= 60 ? "warning" : "danger";

  return (
    <GlassBadge variant={variant} size="sm">
      {score}/100
    </GlassBadge>
  );
}
