import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, canManage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { homepageSectionSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json(await prisma.homepageSection.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = homepageSectionSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const section = await prisma.homepageSection.upsert({
    where: { key: parsed.data.key },
    update: parsed.data,
    create: parsed.data
  });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "UPSERT", entity: "HomepageSection", entityId: section.id } });
  return NextResponse.json(section);
}
