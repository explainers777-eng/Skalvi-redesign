"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { navItems, siteConfig } from "@/lib/school-data";
import { ButtonLink } from "@/components/site/button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-skalvi-purple/10 bg-white/95 backdrop-blur">
      <div className="bg-skalvi-deep text-white">
        <div className="container-shell flex flex-wrap items-center justify-between gap-3 py-2 text-xs md:text-sm">
          <a className="focus-ring inline-flex items-center gap-2" href={`tel:${siteConfig.phone[1].replace(/\s/g, "")}`}>
            <Phone size={14} aria-hidden />
            {siteConfig.phone.join(" | ")}
          </a>
          <a className="focus-ring" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="container-shell flex min-h-24 items-center justify-between gap-6 py-3">
        <Link className="focus-ring flex items-center gap-3" href="/">
          <Image src="/images/brand/logo.png" width={168} height={64} alt="Skalvi International School logo" priority className="h-16 w-auto object-contain lg:h-[70px]" />
          <span className="hidden text-base font-bold uppercase leading-tight text-skalvi-purple xl:block">
            Skalvi
            <span className="block text-skalvi-ink">International School</span>
          </span>
        </Link>
        <div className="hidden xl:flex xl:items-center xl:gap-4">
          <a className="focus-ring rounded-md border border-skalvi-purple/15 px-4 py-3 text-sm font-semibold text-skalvi-deep transition hover:border-skalvi-orange hover:text-skalvi-purple" href={`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
            WhatsApp Enquiry
          </a>
          <ButtonLink href={siteConfig.admissionUrl} external>
            Enquire Now
          </ButtonLink>
        </div>
        <button
          className="focus-ring inline-flex rounded-md border border-skalvi-purple/20 p-2 xl:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className="hidden border-t border-skalvi-purple/10 bg-white xl:block">
        <nav className="container-shell flex items-center justify-center gap-2 py-3" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="focus-ring rounded-md px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-skalvi-mist hover:text-skalvi-purple"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {open ? (
        <div className="border-t border-skalvi-purple/10 bg-white xl:hidden">
          <nav className="container-shell grid gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-skalvi-mist" href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
