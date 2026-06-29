import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Youtube } from "lucide-react";
import { navItems, siteConfig } from "@/lib/school-data";

export function Footer() {
  return (
    <footer className="bg-skalvi-deep text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image src="/images/brand/logo.png" width={86} height={80} alt="Skalvi International School logo" className="mb-5 rounded bg-white p-2" />
          <p className="max-w-md text-sm leading-7 text-white/78">{siteConfig.description}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-skalvi-gold">Explore</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/78">
            {navItems.slice(1).map((item) => (
              <Link className="transition hover:text-skalvi-gold" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-skalvi-gold">Contact</h3>
          <p className="mb-3 flex gap-3 text-sm leading-6 text-white/78">
            <MapPin size={18} className="mt-1 shrink-0" />
            {siteConfig.address}
          </p>
          <a className="mb-3 flex gap-3 text-sm text-white/78 transition hover:text-skalvi-gold" href={`mailto:${siteConfig.email}`}>
            <Mail size={18} />
            {siteConfig.email}
          </a>
          <div className="mt-5 flex gap-3">
            <a aria-label="Facebook" href={siteConfig.socials.facebook} target="_blank" rel="noreferrer"><Facebook size={20} /></a>
            <a aria-label="YouTube" href={siteConfig.socials.youtube} target="_blank" rel="noreferrer"><Youtube size={20} /></a>
            <a aria-label="Instagram" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © 2026 Skalvi International School. Built for secure, modern admissions and communication.
      </div>
    </footer>
  );
}
