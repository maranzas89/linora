import { SupabaseClient } from "@supabase/supabase-js";
import type { Analysis, AnalysisResult } from "./types";

export async function insertAnalysis(
  supabase: SupabaseClient,
  params: {
    user_id: string;
    job_title: string;
    company: string;
    job_description: string;
    resume_text: string;
    result: AnalysisResult;
  }
): Promise<Analysis> {
  const { data, error } = await supabase
    .from("analyses")
    .insert(params)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAnalyses(
  supabase: SupabaseClient,
  userId: string
): Promise<Analysis[]> {
  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAnalysisById(
  supabase: SupabaseClient,
  id: string,
  userId: string
): Promise<Analysis | null> {
  const { data, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) return null;
  return data;
}
