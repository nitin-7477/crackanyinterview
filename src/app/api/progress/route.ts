import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId parameter is required." }, { status: 400 });
  }

  try {
    const progress = await prisma.progress.findMany({
      where: { userId },
    });
    return NextResponse.json({ ok: true, progress });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, topicId, day, readQuestions, quizScore, quizPassed } = await request.json();

    if (!userId || !topicId || typeof day !== "number") {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const saved = await prisma.progress.upsert({
      where: {
        userId_topicId_day: {
          userId,
          topicId,
          day,
        },
      },
      update: {
        readQuestions: readQuestions || [],
        quizScore: typeof quizScore === "number" ? quizScore : undefined,
        quizPassed: typeof quizPassed === "boolean" ? quizPassed : undefined,
      },
      create: {
        userId,
        topicId,
        day,
        readQuestions: readQuestions || [],
        quizScore: typeof quizScore === "number" ? quizScore : undefined,
        quizPassed: typeof quizPassed === "boolean" ? quizPassed : false,
      },
    });

    return NextResponse.json({ ok: true, progress: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
