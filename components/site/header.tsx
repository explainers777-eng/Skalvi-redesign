"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/lib/school-data";
import { ButtonLink } from "@/components/site/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-skalvi-purple/10 bg-white/96 shadow-sm backdrop-blur">
      <div className={`hidden bg-skalvi-deep text-white transition-[max-height,opacity] duration-300 lg:block ${scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-12 opacity-100"}`}>
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
      <div className={`container-shell flex items-center justify-between gap-4 transition-[min-height,padding] duration-300 ${scrolled ? "min-h-14 py-1.5 lg:min-h-16 lg:py-2" : "min-h-16 py-3 lg:min-h-[88px]"}`}>
        <Link className="focus-ring flex items-center gap-3" href="/">
          <Image
            src="/images/brand/logo.png"
            width={168}
            height={64}
            alt="Skalvi International School logo"
            priority
            className={`w-auto object-contain transition-[height] duration-300 ${scrolled ? "h-9 lg:h-12" : "h-10 lg:h-16"}`}
          />
          <span className="hidden text-sm font-bold uppercase leading-tight text-skalvi-purple xl:block">
            Skalvi
            <span className="block text-skalvi-ink">International School</span>
          </span>
        </Link>
        <nav className="hidden items-center justify-center gap-1 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="focus-ring rounded-md px-3 py-2 text-[13px] font-semibold text-slate-700 transition hover:bg-skalvi-mist hover:text-skalvi-purple"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden xl:flex xl:items-center">
          <ButtonLink href={siteConfig.admissionUrl} external className="px-4 py-2.5">
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
      {open ? (
        <div className="fixed inset-x-0 top-0 z-[60] h-screen border-t border-skalvi-purple/10 bg-white xl:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Image
              src="/images/brand/logo.png"
              width={120}
              height={46}
              alt="Skalvi International School logo"
              className="h-11 w-auto object-contain"
            />
            <button
              className="focus-ring inline-flex rounded-md border border-skalvi-purple/20 p-2"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 pb-8" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="rounded-md px-4 py-4 text-base font-semibold text-skalvi-deep transition hover:bg-skalvi-mist hover:text-skalvi-purple"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-skalvi-purple/10 pt-4">
              <a
                className="flex items-center justify-center gap-2 rounded-md bg-skalvi-orange px-4 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-[#e77514]"
                href={siteConfig.admissionUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                Enquire Now
              </a>
              <div className="mt-4 space-y-3 rounded-md bg-skalvi-mist p-4 text-sm text-slate-600">
                <a className="flex items-center gap-2" href={`tel:${siteConfig.phone[1].replace(/\s/g, "")}`}>
                  <Phone size={14} />
                  {siteConfig.phone.join(" | ")}
                </a>
                <a className="flex items-center gap-2" href={`mailto:${siteConfig.email}`}>
                  <Mail size={14} />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
