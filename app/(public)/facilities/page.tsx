import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { campusHighlights, infrastructureFacts } from "@/lib/school-data";

export default function FacilitiesPage() {
  return (
    <>
      <section className="section-y pattern-soft pattern-cool">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Image
              src="/images/school/skalvi-campus-evening.jpg"
              alt="Skalvi International School campus and play court"
              width={1100}
              height={740}
              className="aspect-[4/3] rounded-[8px] object-cover shadow-soft"
              priority
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading align="left" eyebrow="Facilities" title="Infrastructure designed for balanced school life." />
            <p className="text-base leading-8 text-slate-700">
              Official public disclosure lists a 6553 sq. mtr campus, 22 classrooms, 5 laboratories including computer labs, internet facility, and separate toilet facilities for boys and girls.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {infrastructureFacts.map((fact) => (
                <div key={fact.label} className="rounded-[8px] border border-skalvi-purple/10 bg-white/82 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-skalvi-orange">{fact.label}</p>
                  <p className="mt-2 text-sm font-bold text-skalvi-deep">{fact.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-y pattern-soft pattern-white">
        <div className="container-shell">
          <SectionHeading eyebrow="Campus Highlights" title="Everyday facilities that support learning and wellbeing." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campusHighlights.map((item) => (
              <Reveal key={item}>
                <div className="flex h-full gap-3 rounded-[8px] border border-skalvi-purple/10 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mt-1 shrink-0 text-skalvi-orange" size={22} />
                  <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
