"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  glassPanelClasses,
  glassOverlayClasses,
  glassRadius,
  glassSpacing,
  glassText,
  glassInteractive,
  glassTransition,
} from "./glass-tokens";

/* ── Types ────────────────────────────────────────────────── */

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

/* ── Size map ─────────────────────────────────────────────── */

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
} as const;

/* ── Component ────────────────────────────────────────────── */

export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: GlassModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  /* Focus-trap: return focus to panel on mount */
  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Scrim */}
      <div
        className={`absolute inset-0 ${glassOverlayClasses}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`
          relative w-full ${sizeMap[size]}
          ${glassPanelClasses}
          overflow-hidden outline-none
          animate-[glass-enter_200ms_ease-out]
        `}
      >
        {/* Header */}
        {title && (
          <div
            className={`flex items-center justify-between ${glassSpacing.padding} ${glassSpacing.headerBorder}`}
          >
            <h3 className={`text-xl font-medium ${glassText.primary}`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`
                ${glassText.secondary} hover:${glassText.primary}
                ${glassTransition.colors}
                ${glassSpacing.closeButton} ${glassRadius.control} ${glassInteractive.hoverBg}
              `}
              aria-label="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className={glassSpacing.padding}>{children}</div>
      </div>
    </div>
  );
}
