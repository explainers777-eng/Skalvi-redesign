import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { inquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = (await headers()).get("x-forwarded-for") ?? "local";
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const form = await request.formData();
  const payload = Object.fromEntries(form.entries());
  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: "Invalid inquiry" }, { status: 400 });

  await prisma.inquiry.create({ data: parsed.data });
  return NextResponse.redirect(new URL("/contact?sent=1", request.url), { status: 303 });
}
