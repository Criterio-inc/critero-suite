import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, ApiError } from "@/lib/auth-guard";

// POST /api/feedback — submit feedback
export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAuth();

    const body = await req.json();
    const { type, message, page } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Meddelande krävs" },
        { status: 400 },
      );
    }

    if (!["bugg", "forbattring", "fraga"].includes(type)) {
      return NextResponse.json(
        { error: "Ogiltig feedback-typ" },
        { status: 400 },
      );
    }

    // Get user name/email from DB
    const user = await prisma.user.findUnique({
      where: { id: ctx.userId },
      select: { firstName: true, lastName: true, email: true },
    });

    const userName = user
      ? [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email
      : ctx.userId;

    const feedback = await prisma.feedback.create({
      data: {
        userId: ctx.userId,
        userName,
        userEmail: user?.email ?? "",
        type,
        message: message.trim(),
        page: page ?? "",
        status: "ny",
      },
    });

    return NextResponse.json({ feedback }, { status: 201 });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    console.error("Feedback POST error:", e);
    return NextResponse.json(
      { error: "Kunde inte spara feedback" },
      { status: 500 },
    );
  }
}
