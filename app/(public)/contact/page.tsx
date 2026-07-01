import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { siteConfig } from "@/lib/school-data";

export default function ContactPage() {
  return (
    <section className="section-y pattern-soft pattern-cool">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading align="left" eyebrow="Contact" title="Speak with Skalvi International School." />
          <div className="space-y-5 text-slate-700">
            <p className="flex gap-3"><MapPin className="shrink-0 text-skalvi-orange" /> {siteConfig.address}</p>
            <p className="flex gap-3"><Phone className="shrink-0 text-skalvi-orange" /> {siteConfig.phone.join(" | ")}</p>
            <p className="flex gap-3"><Mail className="shrink-0 text-skalvi-orange" /> {siteConfig.email}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form action="/api/contact" method="post" className="rounded-[8px] bg-white p-6 shadow-soft">
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-semibold text-skalvi-ink">
                Name
                <input required name="name" className="rounded-md border border-slate-300 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-skalvi-ink">
                Phone
                <input required name="phone" className="rounded-md border border-slate-300 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-skalvi-ink">
                Email
                <input name="email" type="email" className="rounded-md border border-slate-300 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-skalvi-ink">
                Message
                <textarea required name="message" rows={5} className="rounded-md border border-slate-300 px-4 py-3" />
              </label>
              <button className="focus-ring rounded-md bg-skalvi-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e77514]" type="submit">
                Send Enquiry
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
