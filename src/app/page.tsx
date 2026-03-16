"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassModal } from "wens-design-system";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Linora is running</h1>
        <p className="text-muted text-lg">
          AI-powered job fit analysis. Paste a job description and your resume
          to get actionable insights.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-lg border border-border hover:border-muted text-foreground font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-white/70 hover:text-white font-medium transition-colors"
        >
          Open Glass Modal
        </button>
      </div>

      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Liquid Glass"
      >
        <p className="text-white/70 leading-relaxed">
          This modal adapts the Liquid Glass Design System. Glass tokens are
          centralized in{" "}
          <code className="text-white/90 font-mono text-sm">
            glass-tokens.ts
          </code>{" "}
          — edit that file to sync with future design-system changes.
        </p>
      </GlassModal>
    </main>
  );
}
