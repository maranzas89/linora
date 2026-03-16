import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAnalyses } from "@/lib/queries";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import {
  GlassButton,
  GlassCard,
  textColors,
  brandColors,
} from "wens-liquid-glass-design-system";
import { ScoreBadge } from "@/components/score-badge";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const analyses = await getAnalyses(supabase, user.id);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/dashboard/new">
            <GlassButton variant="primary" size="sm">
              + New Analysis
            </GlassButton>
          </Link>
          <LogoutButton />
        </div>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-16" style={{ color: textColors.muted }}>
          <p>No analyses yet.</p>
          <p className="mt-1">
            <Link
              href="/dashboard/new"
              className="hover:underline"
              style={{ color: brandColors.accent }}
            >
              Run your first analysis
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((a) => (
            <Link key={a.id} href={`/results/${a.id}`}>
              <GlassCard variant="hover" padding="md" className="block">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{a.job_title}</p>
                    <p className="text-sm" style={{ color: textColors.muted }}>
                      {a.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <ScoreBadge score={a.result.score} />
                    <p className="text-xs" style={{ color: textColors.muted }}>
                      {new Date(a.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
