import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAnalyses } from "@/lib/queries";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

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
          <Link
            href="/dashboard/new"
            className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
          >
            + New Analysis
          </Link>
          <LogoutButton />
        </div>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p>No analyses yet.</p>
          <p className="mt-1">
            <Link href="/dashboard/new" className="text-accent hover:underline">
              Run your first analysis
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((a) => (
            <Link
              key={a.id}
              href={`/results/${a.id}`}
              className="block p-4 rounded-lg border border-border hover:border-muted transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{a.job_title}</p>
                  <p className="text-sm text-muted">{a.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">
                    {a.result.score}/100
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(a.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
