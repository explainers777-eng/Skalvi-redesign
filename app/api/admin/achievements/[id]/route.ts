import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, canManage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { achievementSchema } from "@/lib/validation";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = achievementSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const achievement = await prisma.achievement.update({
    where: { id },
    data: { ...parsed.data, awardedAt: parsed.data.awardedAt ? new Date(parsed.data.awardedAt) : null }
  });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "UPDATE", entity: "Achievement", entityId: achievement.id } });
  return NextResponse.json(achievement);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.achievement.delete({ where: { id } });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "DELETE", entity: "Achievement", entityId: id } });
  return NextResponse.json({ ok: true });
}
