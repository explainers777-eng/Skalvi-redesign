"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Inbox, Mail, Phone, User } from "lucide-react";

type Inquiry = { id: string; name: string; email: string | null; phone: string; message: string; createdAt: string };

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then(r => r.json())
      .then(data => setInquiries(data))
      .catch(() => {});
  }, []);

  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple hover:underline">&larr; Back to dashboard</Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3"><Inbox className="text-skalvi-orange" /><h1 className="font-display text-3xl font-semibold text-skalvi-ink">Inquiries</h1></div>
          <p className="mt-2 text-sm text-slate-600">Parent inquiries submitted through the website contact form.</p>

          <div className="mt-8 grid gap-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="rounded-[8px] border border-slate-200 p-5">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 font-semibold text-skalvi-deep"><User size={14} />{inq.name}</span>
                  <span className="flex items-center gap-1.5 text-slate-600"><Phone size={14} />{inq.phone}</span>
                  {inq.email && <span className="flex items-center gap-1.5 text-slate-600"><Mail size={14} />{inq.email}</span>}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{inq.message}</p>
                <p className="mt-2 text-xs text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
            {inquiries.length === 0 && <p className="text-sm text-slate-500">No inquiries yet. When parents submit the contact form, they appear here.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
