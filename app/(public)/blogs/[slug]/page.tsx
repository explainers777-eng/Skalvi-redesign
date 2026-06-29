import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/site/section-heading";
import { seedBlogs } from "@/lib/school-data";

export function generateStaticParams() {
  return seedBlogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = seedBlogs.find((item) => item.slug === slug);
  if (!blog) notFound();

  return (
    <article className="section-y pattern-soft pattern-white">
      <div className="container-shell max-w-3xl">
        <SectionHeading align="left" eyebrow={blog.category} title={blog.title}>
          {blog.excerpt}
        </SectionHeading>
        <div className="prose prose-slate max-w-none text-lg leading-8">
          <p>
            This article is seeded from Skalvi’s current blog topics and is ready for admin-managed publishing. The redesigned system stores full blog content, scheduling and status in PostgreSQL through Prisma.
          </p>
          <p>
            Families can use the blog to understand parent engagement, practical education, collaboration, CBSE learning and the school’s wider philosophy of lifelong learning.
          </p>
        </div>
      </div>
    </article>
  );
}
