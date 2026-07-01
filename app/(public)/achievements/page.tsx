import Image from "next/image";
import { Award } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { achievements } from "@/lib/school-data";

export default function AchievementsPage() {
  return (
    <section className="section-y pattern-soft pattern-warm">
      <div className="container-shell">
        <SectionHeading eyebrow="Achievements" title="Official awards, student success and school recognition." />
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((item) => (
            <Reveal key={`${item.title}-${item.category}`}>
              <article className="group overflow-hidden rounded-[8px] border border-skalvi-purple/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <Image src={item.image} alt={item.title} width={720} height={540} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="p-6">
                  <Award className="mb-4 text-skalvi-orange" />
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-skalvi-purple">{item.category}</p>
                  <h2 className="mt-3 text-xl font-bold text-skalvi-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
