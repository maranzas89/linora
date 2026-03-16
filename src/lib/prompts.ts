export const ANALYSIS_PROMPT = (jobDescription: string, resume: string) => `
You are an expert career coach and hiring strategist. Analyze the fit between the following job description and resume.

Return your analysis as JSON with the following structure:
{
  "score": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "gaps": ["<gap 1>", "<gap 2>", ...],
  "suggestions": ["<actionable suggestion 1>", "<actionable suggestion 2>", ...],
  "keywords_missing": ["<keyword 1>", "<keyword 2>", ...]
}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

Respond ONLY with valid JSON, no markdown or extra text.
`;
