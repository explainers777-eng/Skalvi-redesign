import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { authOptions, canManage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxBytes = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!canManage(session?.user?.role) || !session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Missing file" }, { status: 400 });
  if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  if (file.size > maxBytes) return NextResponse.json({ error: "File is too large" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) return NextResponse.json({ error: "Invalid image" }, { status: 400 });

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${randomUUID()}.${ext}`;
  const destination = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(destination, buffer);

  const media = await prisma.mediaAsset.create({
    data: {
      title: String(form.get("title") || file.name),
      alt: String(form.get("alt") || file.name),
      url: `/uploads/${filename}`,
      mimeType: file.type,
      sizeBytes: file.size,
      width: metadata.width,
      height: metadata.height,
      category: String(form.get("category") || "general")
    }
  });
  await prisma.auditLog.create({ data: { actorId: session.user.id, action: "UPLOAD", entity: "MediaAsset", entityId: media.id } });
  return NextResponse.json(media, { status: 201 });
}
