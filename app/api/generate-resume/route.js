import { NextResponse } from "next/server";
import { generateResumeWithGemini } from "@/lib/geminiClient";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid payload: Request body must be a JSON object containing resume data." },
        { status: 400 }
      );
    }

    // Basic sanity checks
    if (!body.personalInfo?.fullName && (!body.experience || body.experience.length === 0)) {
      return NextResponse.json(
        { error: "Please provide at least a full name or one work experience entry to generate AI enhancements." },
        { status: 400 }
      );
    }

    const aiEnhancedData = await generateResumeWithGemini(body);

    return NextResponse.json({
      success: true,
      data: aiEnhancedData,
    });
  } catch (error) {
    console.error("API /api/generate-resume error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while communicating with Gemini AI." },
      { status: 500 }
    );
  }
}
