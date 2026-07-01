import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { achievementSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.achievement.findMany({ orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const parsed = achievementSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const achievement = await prisma.achievement.create({
    data: { ...parsed.data, awardedAt: parsed.data.awardedAt ? new Date(parsed.data.awardedAt) : null }
  });
  return NextResponse.json(achievement, { status: 201 });
}
