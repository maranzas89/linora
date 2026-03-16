import { createClient } from "@/lib/supabase/server";
import { getAnalysisById } from "@/lib/queries";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  GlassCard,
  textColors,
  brandColors,
  statusColors,
} from "wens-liquid-glass-design-system";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const analysis = await getAnalysisById(supabase, id, user.id);
  if (!analysis) notFound();

  const { result } = analysis;

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <Link
        href="/dashboard"
        className="text-sm transition-colors hover:opacity-80"
        style={{ color: textColors.muted }}
      >
        &larr; Back to Dashboard
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="text-2xl font-bold">{analysis.job_title}</h1>
        <p style={{ color: textColors.muted }}>{analysis.company}</p>
      </div>

      <GlassCard padding="lg" className="mb-6">
        <div className="text-center mb-4">
          <p className="text-5xl font-bold" style={{ color: brandColors.accent }}>
            {result.score}
          </p>
          <p className="text-sm mt-1" style={{ color: textColors.muted }}>
            Fit Score
          </p>
        </div>
        <p className="text-center">{result.summary}</p>
      </GlassCard>

      <Section title="Strengths" items={result.strengths} color={statusColors.success.base} />
      <Section title="Gaps" items={result.gaps} color={statusColors.error.base} />
      <Section title="Suggestions" items={result.suggestions} color={statusColors.warning.base} />
      <Section title="Missing Keywords" items={result.keywords_missing} color={brandColors.accent} />
    </main>
  );
}

function Section({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  if (!items.length) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2" style={{ color }}>
        {title}
      </h2>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm pl-4 border-l-2"
            style={{ borderColor: color }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
