import { createClient } from "@/lib/supabase/server";
import { getAnalysisById } from "@/lib/queries";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

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
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        &larr; Back to Dashboard
      </Link>

      <div className="mt-6 mb-8">
        <h1 className="text-2xl font-bold">{analysis.job_title}</h1>
        <p className="text-muted">{analysis.company}</p>
      </div>

      <div className="p-6 rounded-lg border border-border mb-6">
        <div className="text-center mb-4">
          <p className="text-5xl font-bold text-accent">{result.score}</p>
          <p className="text-sm text-muted mt-1">Fit Score</p>
        </div>
        <p className="text-center text-foreground">{result.summary}</p>
      </div>

      <Section title="Strengths" items={result.strengths} color="text-green-400" />
      <Section title="Gaps" items={result.gaps} color="text-red-400" />
      <Section title="Suggestions" items={result.suggestions} color="text-yellow-400" />
      <Section title="Missing Keywords" items={result.keywords_missing} color="text-orange-400" />
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
      <h2 className={`text-lg font-semibold mb-2 ${color}`}>{title}</h2>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-foreground pl-4 border-l-2 border-border">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
