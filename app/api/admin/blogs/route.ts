import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, canManage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/lib/validation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const blogs = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = blogSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const blog = await prisma.blogPost.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      scheduledAt: parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null
    }
  });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "CREATE", entity: "BlogPost", entityId: blog.id } });
  return NextResponse.json(blog, { status: 201 });
}
