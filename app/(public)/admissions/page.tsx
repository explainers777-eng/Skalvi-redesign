import Image from "next/image";
import { ButtonLink } from "@/components/site/button";
import { SectionHeading } from "@/components/site/section-heading";
import { siteConfig } from "@/lib/school-data";

export default function AdmissionsPage() {
  return (
    <section className="section-y pattern-soft pattern-warm">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading align="left" eyebrow="Admissions" title="Begin your admissions enquiry with Skalvi." />
          <p className="text-lg leading-8 text-slate-600">
            The existing admissions flow is preserved through Skalvi’s enquiry portal. Families can enquire online and the school team can continue the conversation through phone, WhatsApp or email.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={siteConfig.admissionUrl} external>
              Open Enquiry Form
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact School
            </ButtonLink>
          </div>
        </div>
        <Image src="/images/school/skalvi-campus-evening.jpg" alt="Skalvi International School campus" width={1000} height={720} className="aspect-[4/3] rounded-[8px] object-cover shadow-soft" />
      </div>
    </section>
  );
}
