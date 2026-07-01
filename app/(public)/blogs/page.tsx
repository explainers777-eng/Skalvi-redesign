import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { seedBlogs } from "@/lib/school-data";

export default function BlogsPage() {
  return (
    <section className="section-y pattern-soft pattern-cool">
      <div className="container-shell">
        <SectionHeading eyebrow="Blogs" title="School insights for parents and learners." />
        <div className="grid gap-6 md:grid-cols-3">
          {seedBlogs.map((blog) => (
            <Reveal key={blog.slug}>
              <Link href={`/blogs/${blog.slug}`} className="block rounded-[8px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <Sparkles className="mb-5 text-skalvi-orange" />
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-skalvi-purple">{blog.category}</p>
                <h2 className="text-xl font-bold leading-snug text-skalvi-ink">{blog.title}</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">{blog.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
