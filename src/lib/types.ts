export interface Analysis {
  id: string;
  user_id: string;
  job_title: string;
  company: string;
  job_description: string;
  resume_text: string;
  result: AnalysisResult;
  created_at: string;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  suggestions: string[];
  keywords_missing: string[];
}

export interface AnalyzeRequest {
  job_title: string;
  company: string;
  job_description: string;
  resume_text: string;
}
