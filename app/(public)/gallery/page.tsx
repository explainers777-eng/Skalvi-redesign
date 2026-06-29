import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { galleryImages } from "@/lib/school-data";

export default function GalleryPage() {
  return (
    <section className="section-y pattern-soft pattern-white">
      <div className="container-shell">
        <SectionHeading eyebrow="Gallery" title="Official moments from Skalvi." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
              <Image src={image.src} alt={image.alt} width={720} height={540} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.03]" />
              <figcaption className="p-4 text-sm font-semibold text-skalvi-purple">{image.category}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
