import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { InfoPage } from "@/components/site/info-page";
import { SectionHeading } from "@/components/site/section-heading";
import { aboutAims, coreValues, leadership } from "@/lib/school-data";

export default function AboutPage() {
  return (
    <>
      <InfoPage
        eyebrow="About Skalvi"
        title="A school built around experience, reflection and holistic growth."
        image="/images/school/skalvi-campus-evening.jpg"
        body={[
          "Skalvi Learning is centered around the belief that learning is a product of experience and thoughtful reflection on one's actions.",
          "The school uses a child-centric approach with games, music, theatre, art, craft and curriculum integration to make learning meaningful.",
          "Its motto is: Empowering Minds, Nurturing Futures: Beyond Academics, Embracing Lifelong Learning."
        ]}
        listTitle="Core Values"
        list={coreValues}
      />
      <section className="section-y pattern-soft pattern-warm">
        <div className="container-shell">
          <SectionHeading eyebrow="Vision, Mission and Aim" title="A school story parents can understand and remember." />
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="rounded-[8px] bg-skalvi-deep p-7 text-white shadow-soft">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-skalvi-gold">Skalvi Vision</p>
                <h2 className="mt-4 font-display text-3xl font-semibold">Academic Excellence, Spiritual Growth and Service.</h2>
                <p className="mt-5 text-sm leading-7 text-white/78">
                  Skalvi describes itself as a learning community dedicated to academic excellence, spiritual growth and service, with education shaped by Indian values and global readiness.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[8px] border border-skalvi-purple/10 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-skalvi-orange">Skalvi Mission</p>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  An ecologically sensitive and spiritually engaged educational institution committed to success through knowledge, positive attitude and learning, based on virtuosity and inventiveness.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {aboutAims.map((aim) => (
              <Reveal key={aim}>
                <div className="h-full rounded-[8px] border border-skalvi-purple/10 bg-white/86 p-5 text-sm font-semibold leading-7 text-slate-700 shadow-sm backdrop-blur">
                  {aim}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y pattern-soft pattern-cool">
        <div className="container-shell">
          <SectionHeading eyebrow="People Behind Skalvi" title="Founder directors and principal leadership." />
          <div className="grid gap-6 lg:grid-cols-3">
            {leadership.map((person) => (
              <Reveal key={person.name}>
                <article className="h-full rounded-[8px] bg-white p-5 shadow-sm">
                  <Image src={person.image} alt={person.name} width={700} height={500} className="aspect-[4/3] rounded-[8px] object-cover object-top" />
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-skalvi-orange">{person.role}</p>
                  <h2 className="mt-2 text-2xl font-bold text-skalvi-ink">{person.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{person.summary}</p>
                  <div className="mt-5 flex gap-3 rounded-[8px] bg-skalvi-mist p-4 text-sm font-semibold leading-6 text-skalvi-deep">
                    <Quote size={18} className="shrink-0 text-skalvi-orange" />
                    {person.note}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
