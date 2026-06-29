import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { seedBlogs } from "../lib/school-data";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@skalvi.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMeStrongly123!";
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Skalvi Admin",
      role: "SUPER_ADMIN",
      passwordHash: await bcrypt.hash(password, 12)
    }
  });

  for (const blog of seedBlogs) {
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {},
      create: {
        ...blog,
        content: `${blog.excerpt}\n\nThis seeded post is ready for the admin editor to expand.`,
        status: "PUBLISHED",
        publishedAt: new Date(),
        authorId: user.id
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
