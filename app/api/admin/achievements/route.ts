import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, canManage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { achievementSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json(await prisma.achievement.findMany({ orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = achievementSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const achievement = await prisma.achievement.create({
    data: { ...parsed.data, awardedAt: parsed.data.awardedAt ? new Date(parsed.data.awardedAt) : null }
  });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "CREATE", entity: "Achievement", entityId: achievement.id } });
  return NextResponse.json(achievement, { status: 201 });
}
