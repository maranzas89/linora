"use client";

import React, { useState } from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SidebarItem {
  /** Display label. */
  label: string;
  /** Leading icon (ReactNode — e.g. a lucide-react icon). */
  icon?: React.ReactNode;
  /** Optional href (if the item is a link). */
  href?: string;
  /** Click handler. */
  onClick?: () => void;
  /** Optional badge (text or count). */
  badge?: string | number;
  /** Nested children (creates a collapsible sub-menu). */
  children?: SidebarItem[];
}

export interface GlassSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Navigation items. */
  items: SidebarItem[];
  /** Logo / brand slot rendered at the top. */
  logo?: React.ReactNode;
  /** Footer slot rendered at the bottom. */
  footer?: React.ReactNode;
  /** Allow collapsing to icon-only mode. */
  collapsible?: boolean;
  /** Initial collapsed state. */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Callback when collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Collapse / expand icon pair — defaults to chevrons. */
  collapseIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GlassSidebar({
  items,
  logo,
  footer,
  collapsible = true,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  collapseIcon,
  expandIcon,
  className,
  ...rest
}: GlassSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const toggle = () => {
    const next = !collapsed;
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div
      className={cn(
        collapsed ? 'w-20' : 'w-64',
        'h-screen',
        'backdrop-blur-xl backdrop-saturate-150',
        'bg-[var(--glass-bg-light)]',
        'border-r border-[var(--glass-border)]',
        'transition-all duration-300',
        'flex flex-col',
        className,
      )}
      {...rest}
    >
      {/* Logo */}
      {logo && (
        <div className="p-6 border-b border-[var(--glass-border)]">
          {collapsed ? (
            <div className="flex justify-center">{logo}</div>
          ) : (
            logo
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => {
                if (item.children) {
                  toggleItem(index);
                } else {
                  item.onClick?.();
                }
              }}
              className={cn(
                'w-full flex items-center gap-3',
                'px-4 py-3 rounded-2xl',
                'text-white/80',
                'hover:bg-[var(--glass-bg-light)] hover:text-white',
                'transition-all duration-200',
                collapsed && 'justify-center',
              )}
            >
              {item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-[var(--status-info-light)] text-blue-100 text-xs">
                      {item.badge}
                    </span>
                  )}
                  {item.children && (
                    <ChevronRight
                      className={cn(
                        'transition-transform',
                        openItems.includes(index) && 'rotate-90',
                      )}
                      width={16}
                      height={16}
                    />
                  )}
                </>
              )}
            </button>

            {/* Sub-menu */}
            {item.children && !collapsed && openItems.includes(index) && (
              <div className="ml-4 mt-2 space-y-1">
                {item.children.map((child, childIndex) => (
                  <button
                    key={childIndex}
                    onClick={child.onClick}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-white/70 hover:bg-[var(--glass-bg-subtle)] hover:text-white transition-all duration-200"
                  >
                    {child.icon && <span>{child.icon}</span>}
                    <span className="flex-1 text-left text-sm">
                      {child.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && !collapsed && (
        <div className="p-4 border-t border-[var(--glass-border)]">{footer}</div>
      )}

      {/* Collapse toggle */}
      {collapsible && (
        <button
          onClick={toggle}
          className="m-4 p-3 rounded-2xl backdrop-blur-md backdrop-saturate-150 bg-[var(--glass-bg-light)] border border-[var(--glass-border)] text-white hover:bg-[var(--glass-bg-medium)] transition-all duration-200 flex items-center justify-center"
        >
          {collapsed
            ? expandIcon || <ChevronRight />
            : collapseIcon || <ChevronLeft />}
        </button>
      )}
    </div>
  );
}
