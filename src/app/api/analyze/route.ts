import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeJobFit } from "@/lib/claude";
import { insertAnalysis } from "@/lib/queries";
import type { AnalysisResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { job_title, company, job_description, resume_text } =
      await request.json();

    if (!job_title || !company || !job_description || !resume_text) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const rawResult = await analyzeJobFit(job_description, resume_text);
    const result: AnalysisResult = JSON.parse(rawResult);

    const analysis = await insertAnalysis(supabase, {
      user_id: user.id,
      job_title,
      company,
      job_description,
      resume_text,
      result,
    });

    return NextResponse.json({ id: analysis.id });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
