import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId parameter is required." }, { status: 400 });
  }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
    });
    return NextResponse.json({ ok: true, bookmarks });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, questionId, topicId } = await request.json();

    if (!userId || !questionId || !topicId) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      update: {},
      create: {
        userId,
        questionId,
        topicId,
      },
    });

    return NextResponse.json({ ok: true, bookmark });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const questionId = searchParams.get("questionId");

    if (!userId || !questionId) {
      return NextResponse.json({ error: "userId and questionId are required." }, { status: 400 });
    }

    await prisma.bookmark.deleteMany({
      where: { userId, questionId },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
