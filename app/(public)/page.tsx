import Image from "next/image";
import { Award, BookOpen, GraduationCap, Quote, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/site/button";
import { FloatingQualities } from "@/components/site/floating-qualities";
import { SectionHeading } from "@/components/site/section-heading";
import { achievements, campusHighlights, galleryImages, leadership, officialFacts, philosophy, programs, seedBlogs, siteConfig, whySkalvi } from "@/lib/school-data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f9f7fb_0%,#eee7f5_38%,#fff4e8_100%)] text-skalvi-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.42]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(101,45,142,.22) 1px, transparent 0), linear-gradient(135deg, rgba(245,130,32,.14) 0 1px, transparent 1px)",
            backgroundSize: "28px 28px, 64px 64px"
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-skalvi-orange/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-skalvi-purple/12 blur-3xl"
        />
        <div className="container-shell grid min-h-[760px] items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-skalvi-orange">CBSE affiliated education in JP Nagar</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] text-skalvi-deep md:text-7xl">
              Empowering minds, nurturing futures.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Skalvi International School blends academic excellence, life skills, health, creativity and thoughtful reflection so children grow with confidence and character.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {officialFacts.map((fact) => (
                <div key={fact.label} className="rounded-[8px] border border-skalvi-purple/12 bg-white/78 p-4 shadow-sm backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{fact.label}</p>
                  <p className="mt-2 text-sm font-bold text-skalvi-deep">{fact.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={siteConfig.admissionUrl} external>
                Start Admission Enquiry
              </ButtonLink>
              <ButtonLink href="/about" variant="ghost">
                Explore Skalvi
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative">
              <FloatingQualities />
              <div className="relative z-10 rounded-[8px] bg-skalvi-deep p-2 shadow-soft">
                <Image
                  src="/images/school/skalvi-campus-evening.jpg"
                  width={1200}
                  height={800}
                  alt="Skalvi International School evening campus"
                  priority
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="aspect-[4/5] rounded-[6px] object-cover md:aspect-[5/4]"
                />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 rounded-[8px] bg-white/95 p-5 shadow-soft backdrop-blur">
                <p className="text-sm font-bold text-skalvi-purple">LKG to Grade 10</p>
                <p className="mt-1 text-sm text-slate-600">Holistic academics with NEP readiness, sports, projects, food and student-centred classroom practice.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-warm">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(101,45,142,.16) 1px, transparent 0), linear-gradient(90deg, rgba(245,130,32,.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 96px 96px"
          }}
        />
        <div className="container-shell">
          <SectionHeading eyebrow="Why Skalvi" title="A thoughtful school experience, not just a timetable.">
            The existing Skalvi model focuses on motivation, practical learning, a strong teacher-student ratio and life beyond academics.
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {whySkalvi.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <div
                  className={[
                    "group relative h-full overflow-hidden rounded-[8px] border p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft",
                    index % 4 === 0 && "border-skalvi-purple/15 bg-white",
                    index % 4 === 1 && "border-skalvi-orange/20 bg-[#fff7ef]",
                    index % 4 === 2 && "border-skalvi-purple/15 bg-[#f4eff8]",
                    index % 4 === 3 && "border-skalvi-gold/30 bg-[#fffbef]"
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="absolute right-[-18px] top-[-18px] h-20 w-20 rounded-full bg-skalvi-orange/10 transition duration-300 group-hover:scale-150" />
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-skalvi-deep text-sm font-bold text-white shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-skalvi-ink">{item}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-cool">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading align="left" eyebrow="Academic Excellence" title="Programs from foundational years to Grade 10." />
            <div className="grid gap-3">
              {programs.map((program) => (
                <div key={program} className="rounded-[8px] bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm">
                  {program}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                [GraduationCap, "CBSE Affiliated", "Structured progression with age-appropriate academic focus."],
                [BookOpen, "Knowing by Doing", "Projects, hands-on work and reflective learning."],
                [Users, "1:24 Ratio", "Focused classroom attention for Grade 1 to 10."],
                [ShieldCheck, "Core Values", "Cleanliness, compassion, commitment, discipline and responsibility."]
              ].map(([Icon, title, text]) => (
                <div key={title as string} className="rounded-[8px] bg-white p-6 shadow-sm">
                  <Icon className="mb-5 text-skalvi-orange" size={28} />
                  <h3 className="text-lg font-bold text-skalvi-ink">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text as string}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-cool">
        <div className="container-shell">
          <SectionHeading eyebrow="Skalvi Philosophy" title="Success, Knowledge, Attitude, Learning." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {philosophy.map((item) => (
              <Reveal key={item.title}>
                <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <Image src={item.image} alt={item.title} width={520} height={420} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-skalvi-purple">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-warm">
        <div className="container-shell">
          <SectionHeading eyebrow="Leadership" title="Founder vision and principal guidance." />
          <div className="grid gap-6 lg:grid-cols-3">
            {leadership.map((person) => (
              <Reveal key={person.name}>
                <article className="group h-full overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="relative">
                    <Image src={person.image} alt={person.name} width={720} height={520} className="aspect-[4/3] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-skalvi-purple shadow-sm">{person.role}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-skalvi-ink">{person.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{person.summary}</p>
                    <div className="mt-5 rounded-[8px] bg-skalvi-mist p-4">
                      <Quote className="mb-3 text-skalvi-orange" size={20} />
                      <p className="text-sm font-semibold leading-6 text-skalvi-deep">{person.note}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-cool">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <Image
              src="/images/school/skalvi-campus-evening.jpg"
              alt="Skalvi International School campus"
              width={900}
              height={620}
              className="aspect-[4/3] rounded-[8px] object-cover object-top shadow-soft"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-skalvi-orange">Principal Message</p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-skalvi-ink md:text-5xl">
              Education that builds confidence, character and curiosity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Skalvi’s approach preserves the school’s promise of life beyond academics: a place where children explore, question, collaborate and grow through meaningful experiences.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Child-centric", "NEP ready", "Value-led"].map((item) => (
                <div key={item} className="rounded-[8px] bg-white p-4 text-center text-sm font-bold text-skalvi-purple shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-warm">
        <div className="container-shell">
          <SectionHeading eyebrow="Student Life" title="Culture, activities and campus energy." />
          <div className="grid gap-4 md:grid-cols-4">
            {[
              "/images/school/culture-assembly-1.jpg",
              "/images/school/culture-activity-1.jpg",
              "/images/school/culture-performance-1.jpg",
              "/images/school/culture-event-1.jpg"
            ].map((src, index) => (
              <Reveal key={src} delay={index * 0.04}>
                <Image src={src} alt="Skalvi student life" width={520} height={420} className="aspect-[4/5] rounded-[8px] object-cover shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-soft" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pattern-soft bg-skalvi-deep text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-skalvi-gold">Life at Skalvi Campus</p>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">A campus shaped for balanced growth.</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {campusHighlights.map((item) => (
              <Reveal key={item}>
                <div className="rounded-[8px] border border-white/12 bg-white/8 p-5 text-sm leading-7 text-white/86">{item}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-warm">
        <div className="container-shell">
          <SectionHeading eyebrow="Achievements" title="Recognition across academics, culture and sports." />
          <div className="grid gap-6 lg:grid-cols-3">
            {achievements.slice(0, 3).map((item) => (
              <Reveal key={`${item.title}-${item.category}`}>
                <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                  <Image src={item.image} alt={item.title} width={640} height={460} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-6">
                    <Award className="mb-4 text-skalvi-orange" />
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-skalvi-purple">{item.category}</p>
                    <h3 className="text-xl font-bold text-skalvi-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-cool">
        <div className="container-shell">
          <SectionHeading eyebrow="Latest Blogs" title="Guidance for parents and modern learners." />
          <div className="grid gap-6 md:grid-cols-3">
            {seedBlogs.map((blog) => (
              <Reveal key={blog.slug}>
                <article className="rounded-[8px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <Sparkles className="mb-5 text-skalvi-orange" />
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-skalvi-purple">{blog.category}</p>
                  <h3 className="text-xl font-bold leading-snug text-skalvi-ink">{blog.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{blog.excerpt}</p>
                  <ButtonLink href={`/blogs/${blog.slug}`} variant="ghost" className="mt-6 px-4 py-2">
                    Read More
                  </ButtonLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pattern-soft pattern-cool">
        <div className="container-shell">
          <SectionHeading eyebrow="Gallery Preview" title="Moments from campus life." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.slice(0, 6).map((image) => (
              <Reveal key={image.src}>
                <Image src={image.src} alt={image.alt} width={640} height={480} className="aspect-[4/3] rounded-[8px] object-cover shadow-sm" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pattern-soft bg-skalvi-purple py-16 text-white">
        <div className="container-shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-skalvi-gold">Admissions Open</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Start your Skalvi enquiry today.</h2>
          </div>
          <ButtonLink href={siteConfig.admissionUrl} external className="bg-white text-skalvi-purple hover:bg-skalvi-gold">
            Enquire Now
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
