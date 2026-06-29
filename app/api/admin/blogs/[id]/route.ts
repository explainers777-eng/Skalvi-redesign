import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, canManage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/lib/validation";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = blogSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const blog = await prisma.blogPost.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      scheduledAt: parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null
    }
  });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "UPDATE", entity: "BlogPost", entityId: blog.id } });
  return NextResponse.json(blog);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.blogPost.delete({ where: { id } });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "DELETE", entity: "BlogPost", entityId: id } });
  return NextResponse.json({ ok: true });
}
