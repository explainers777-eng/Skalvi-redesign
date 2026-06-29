import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function InfoPage({
  eyebrow,
  title,
  image,
  body,
  listTitle,
  list
}: {
  eyebrow: string;
  title: string;
  image: string;
  body: string[];
  listTitle: string;
  list: string[];
}) {
  return (
    <section className="section-y pattern-soft pattern-white">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Image src={image} alt={title} width={900} height={720} priority className="aspect-[4/3] rounded-[8px] object-cover shadow-soft" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading align="left" eyebrow={eyebrow} title={title} />
          <div className="space-y-5 text-base leading-8 text-slate-600">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <h2 className="mt-10 text-xl font-bold text-skalvi-ink">{listTitle}</h2>
          <div className="mt-5 grid gap-3">
            {list.map((item) => (
              <div key={item} className="flex gap-3 rounded-[8px] bg-skalvi-mist p-4 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="shrink-0 text-skalvi-orange" size={20} />
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
