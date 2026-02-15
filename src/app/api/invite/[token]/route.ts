import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getClerkUserId } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  GET /api/invite/[token] — validate invitation token                */
/* ------------------------------------------------------------------ */

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: {
      org: { select: { id: true, name: true, slug: true, plan: true } },
    },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "Inbjudan hittades inte", code: "NOT_FOUND" },
      { status: 404 },
    );
  }

  if (invitation.usedAt) {
    return NextResponse.json(
      { error: "Denna inbjudan har redan använts", code: "ALREADY_USED" },
      { status: 410 },
    );
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Denna inbjudan har gått ut", code: "EXPIRED" },
      { status: 410 },
    );
  }

  return NextResponse.json({
    invitation: {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      expiresAt: invitation.expiresAt.toISOString(),
      org: invitation.org,
    },
  });
}

/* ------------------------------------------------------------------ */
/*  POST /api/invite/[token] — accept invitation                       */
/* ------------------------------------------------------------------ */

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Require logged-in user
  const userId = await getClerkUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "Du måste vara inloggad för att acceptera en inbjudan", code: "NOT_AUTHENTICATED" },
      { status: 401 },
    );
  }

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: {
      org: { select: { id: true, name: true, slug: true, maxUsers: true } },
    },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "Inbjudan hittades inte", code: "NOT_FOUND" },
      { status: 404 },
    );
  }

  if (invitation.usedAt) {
    return NextResponse.json(
      { error: "Denna inbjudan har redan använts", code: "ALREADY_USED" },
      { status: 410 },
    );
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Denna inbjudan har gått ut", code: "EXPIRED" },
      { status: 410 },
    );
  }

  // Check max users limit
  const memberCount = await prisma.orgMembership.count({
    where: { orgId: invitation.orgId },
  });
  if (invitation.org.maxUsers > 0 && memberCount >= invitation.org.maxUsers) {
    return NextResponse.json(
      { error: "Organisationen har nått maxgränsen för användare", code: "ORG_FULL" },
      { status: 403 },
    );
  }

  // Check if user already is a member
  const existing = await prisma.orgMembership.findUnique({
    where: { orgId_userId: { orgId: invitation.orgId, userId } },
  });

  if (existing) {
    // Already a member — mark invitation as used and return success
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() },
    });
    return NextResponse.json({
      ok: true,
      message: "Du är redan medlem i denna organisation",
      orgSlug: invitation.org.slug,
    });
  }

  // Create membership + mark invitation used in a transaction
  await prisma.$transaction([
    prisma.orgMembership.create({
      data: {
        orgId: invitation.orgId,
        userId,
        role: invitation.role,
      },
    }),
    prisma.invitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    message: `Välkommen till ${invitation.org.name}!`,
    orgSlug: invitation.org.slug,
    role: invitation.role,
  }, { status: 201 });
}
