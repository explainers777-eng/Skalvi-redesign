import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/lib/validation";

async function getDefaultUserId() {
  const user = await prisma.user.findFirst({ where: { active: true }, orderBy: { createdAt: "asc" } });
  return user?.id ?? "prototype-admin";
}

export async function GET() {
  const blogs = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  const parsed = blogSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const blog = await prisma.blogPost.create({
    data: {
      ...parsed.data,
      authorId: await getDefaultUserId(),
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      scheduledAt: parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null
    }
  });
  return NextResponse.json(blog, { status: 201 });
}
