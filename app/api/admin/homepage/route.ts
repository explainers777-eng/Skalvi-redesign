import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { homepageSectionSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json(await prisma.homepageSection.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(request: Request) {
  const parsed = homepageSectionSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const section = await prisma.homepageSection.upsert({
    where: { key: parsed.data.key },
    update: parsed.data,
    create: parsed.data
  });
  return NextResponse.json(section);
}
