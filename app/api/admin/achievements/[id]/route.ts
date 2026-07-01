import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { achievementSchema } from "@/lib/validation";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = achievementSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const achievement = await prisma.achievement.update({
    where: { id },
    data: { ...parsed.data, awardedAt: parsed.data.awardedAt ? new Date(parsed.data.awardedAt) : null }
  });
  return NextResponse.json(achievement);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.achievement.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
