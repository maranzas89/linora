"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAnalysisPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_title: jobTitle,
          company,
          job_description: jobDescription,
          resume_text: resumeText,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const { id } = await res.json();
      router.push(`/results/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">New Analysis</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <textarea
          placeholder="Paste the full job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
          required
        />

        <textarea
          placeholder="Paste your resume text..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={8}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Run Analysis"}
        </button>
      </form>
    </main>
  );
}
