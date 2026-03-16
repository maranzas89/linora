"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassModal } from "@/components/glass-modal";
import {
  GlassButton,
  GlassCard,
  brandColors,
  statusColors,
  glassColors,
  textColors,
  gradients,
} from "wens-liquid-glass-design-system";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Token live-sync test */}
      <div className="flex gap-4 mb-6">
        <div className="w-24 h-24 rounded-xl" style={{ background: brandColors.primary }} />
        <div className="w-24 h-24 rounded-full" style={{ background: brandColors.accent }} />
      </div>

      <GlassCard padding="lg" className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Linora is running</h1>
        <p style={{ color: textColors.muted }} className="text-lg">
          AI-powered job fit analysis. Paste a job description and your resume
          to get actionable insights.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/login">
            <GlassButton variant="primary" size="md">
              Log in
            </GlassButton>
          </Link>
          <Link href="/signup">
            <GlassButton variant="ghost" size="md">
              Sign up
            </GlassButton>
          </Link>
        </div>
        <GlassButton variant="ghost" size="md" onClick={() => setModalOpen(true)}>
          Open Glass Modal
        </GlassButton>
      </GlassCard>

      {/* Design System Token Preview */}
      <GlassCard padding="none" className="mt-10 w-full max-w-sm overflow-hidden">
        <div
          className="h-24"
          style={{ background: gradients.primary }}
        />
        <div className="p-5 space-y-3">
          <p className="font-semibold text-lg" style={{ color: textColors.primary }}>
            Brand Primary
          </p>
          <p style={{ color: textColors.muted }} className="text-sm">
            Primary buttons, links, active states
          </p>
          <div className="space-y-2">
            {[
              { label: "Primary", value: brandColors.primary },
              { label: "Secondary", value: brandColors.secondary },
              { label: "Accent", value: brandColors.accent },
              { label: "Info", value: statusColors.info.base },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                style={{
                  background: glassColors.bgLight,
                  border: `1px solid ${glassColors.border}`,
                }}
              >
                <span style={{ color: textColors.placeholder }} className="text-xs uppercase">
                  {item.label}
                </span>
                <span className="font-mono text-sm" style={{ color: textColors.primary }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Liquid Glass"
      >
        <p style={{ color: textColors.tertiary }} className="leading-relaxed">
          This modal uses the shared Liquid Glass Design System. Tokens are
          sourced from{" "}
          <code className="font-mono text-sm" style={{ color: textColors.secondary }}>
            wens-liquid-glass-design-system
          </code>{" "}
          — update the package to sync visual changes.
        </p>
      </GlassModal>
    </main>
  );
}
