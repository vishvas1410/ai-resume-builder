import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Ordered list of candidate Gemini models to try, starting with the latest flash models.
 * Automatically falls back if a model is deprecated or unavailable.
 */
const CANDIDATE_MODELS = [
  process.env.GEMINI_MODEL,
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
  "gemini-1.5-flash",
].filter(Boolean);

/**
 * Builds the prompt for Gemini API
 */
function buildPrompt(resumeData) {
  const targetJobInfo = resumeData.targetJob?.title || resumeData.targetJob?.description
    ? `Target Job Title: ${resumeData.targetJob.title || "N/A"}\nTarget Job Description: ${resumeData.targetJob.description || "N/A"}`
    : "No target job specified. Optimize for the candidate's general field.";

  const rawJson = JSON.stringify({
    personalInfo: {
      fullName: resumeData.personalInfo?.fullName || "",
      location: resumeData.personalInfo?.location || "",
    },
    summary: resumeData.summary || "",
    experience: (resumeData.experience || []).map((exp) => ({
      id: exp.id,
      jobTitle: exp.jobTitle,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
    })),
    skills: resumeData.skills || [],
    projects: resumeData.projects || [],
  }, null, 2);

  return `You are an elite, executive resume writer and ATS (Applicant Tracking System) optimization specialist.
Given the candidate's raw resume data and target job, produce an enhanced, high-impact, professional version of their resume content.

### Objectives:
1. Professional Summary:
   - Craft a punchy, compelling 2-4 sentence executive summary highlighting key strengths, years of experience, and specialization tailored to the target job (if provided).
   - If the candidate provided a draft summary, polish and elevate it. If left blank, generate a bespoke summary from their experience and skills.

2. Work Experience Bullet Points:
   - Rewrite the bullet points for EACH work experience entry using the Google X-Y-Z formula: "Accomplished [X] as measured by [Y] by doing [Z]".
   - Begin each bullet with strong, diverse action verbs (e.g., "Architected", "Spearheaded", "Engineered", "Orchestrated", "Accelerated", "Streamlined").
   - Quantify achievements with realistic metrics or percentages where appropriate to maximize impact.
   - Format each entry's description as clean bullet points starting with "• ". Keep each entry between 2 and 4 strong bullets.
   - Preserve the exact "id", "jobTitle", "company", "location", "startDate", "endDate", and "current" values for each experience item.

3. Skills Optimization:
   - Review the candidate's skills and supplement them with highly relevant, modern industry keywords matching their background and target role.
   - Return 10 to 18 clean, high-impact skill names (no duplicate entries).

### Target Job Context:
${targetJobInfo}

### Raw Candidate Data:
${rawJson}

### Critical Response Format:
Respond ONLY with a valid, parseable JSON object matching this exact schema:
{
  "summary": "string (the enhanced professional summary)",
  "experience": [
    {
      "id": "string (match input id)",
      "jobTitle": "string",
      "company": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "current": boolean,
      "description": "string (bullet points separated by \\n, each starting with • )"
    }
  ],
  "skills": ["string", "string", ...]
}

Do not include any conversational preamble, notes, or explanations outside the JSON object. Output valid JSON only.`;
}

/**
 * Safely parses JSON response from Gemini, removing any markdown code blocks
 */
function extractJson(text) {
  let cleaned = text.trim();
  // Remove markdown code fences if present (```json ... ``` or ``` ... ```)
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
    cleaned = cleaned.replace(/\s*```$/, "");
  }
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt regex extraction if there's surrounding text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse Gemini response as JSON: " + err.message);
  }
}

/**
 * Calls Gemini API to generate optimized resume content.
 * Automatically tries candidate models if a model is deprecated or throttled.
 */
export async function generateResumeWithGemini(resumeData) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please add your Gemini API key to .env.local file."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = buildPrompt(resumeData);

  let lastError = null;

  // Try candidate models in order of capability/speed
  for (const modelName of CANDIDATE_MODELS) {
    try {
      console.log(`[GeminiClient] Attempting generation with model: ${modelName}`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.4,
          topP: 0.8,
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const parsedData = extractJson(responseText);

      if (!parsedData.summary && (!parsedData.experience || parsedData.experience.length === 0)) {
        throw new Error("Received empty or invalid structured content from Gemini.");
      }

      console.log(`[GeminiClient] Successfully generated resume with model: ${modelName}`);
      return parsedData;
    } catch (error) {
      console.warn(`[GeminiClient] Model ${modelName} failed:`, error.message);
      lastError = error;

      // If it's an invalid API key, don't keep looping with other models
      if (error.status === 400 || error.message?.includes("API key not valid")) {
        throw new Error("Invalid Gemini API key. Please check your GEMINI_API_KEY in .env.local.");
      }

      // If it's a 404 (model not found / deprecated) or 503 (spike), proceed to next candidate model
      if (
        error.status === 404 ||
        error.status === 503 ||
        error.message?.includes("not found") ||
        error.message?.includes("no longer available") ||
        error.message?.includes("experiencing high demand")
      ) {
        continue;
      }

      // If rate limited on one model, try next model before giving up
      if (error.status === 429 || error.message?.includes("Resource has been exhausted") || error.message?.includes("Quota")) {
        continue;
      }
    }
  }

  // If all candidate models failed
  console.error("All candidate Gemini models failed. Last error:", lastError);
  if (lastError?.status === 429 || lastError?.message?.includes("Quota")) {
    throw new Error("Gemini API rate limit exceeded. Please wait a moment and try again.");
  }
  throw new Error(
    lastError?.message || "Failed to generate resume content with Gemini AI."
  );
}
