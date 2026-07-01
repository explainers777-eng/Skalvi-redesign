"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

type Section = { id: string; key: string; title: string; body: string; image: string | null; order: number; enabled: boolean };

export default function AdminContentPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [key, setKey] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchSections(); }, []);

  async function fetchSections() {
    const res = await fetch("/api/admin/homepage");
    if (res.ok) setSections(await res.json());
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const bodyData = { key, title, body, image: image || null, order, enabled };
    const res = await fetch("/api/admin/homepage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData)
    });
    if (res.ok) { setMsg("Section saved!"); reset(); fetchSections(); }
    else setMsg("Error saving section");
  }

  function edit(section: Section) {
    setEditingKey(section.key); setKey(section.key); setTitle(section.title); setBody(section.body);
    setImage(section.image || ""); setOrder(section.order); setEnabled(section.enabled);
  }

  function reset() {
    setEditingKey(null); setKey(""); setTitle(""); setBody(""); setImage(""); setOrder(0); setEnabled(true);
  }

  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple hover:underline">&larr; Back to dashboard</Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3"><BarChart3 className="text-skalvi-orange" /><h1 className="font-display text-3xl font-semibold text-skalvi-ink">Homepage Content</h1></div>
          {msg && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-700">{msg}</p>}

          <form onSubmit={save} className="mt-6 grid gap-4 rounded-[8px] border border-skalvi-purple/10 bg-skalvi-mist p-6">
            <h2 className="font-bold">{editingKey ? "Edit Section" : "Add Section"}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Section Key<input value={key} onChange={e => setKey(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" required placeholder="e.g. hero, about, programs" /></label>
              <label className="grid gap-1 text-sm font-semibold">Order<input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className="rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            </div>
            <label className="grid gap-1 text-sm font-semibold">Title<input value={title} onChange={e => setTitle(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" required /></label>
            <label className="grid gap-1 text-sm font-semibold">Body<textarea value={body} onChange={e => setBody(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" rows={3} required /></label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Image URL<input value={image} onChange={e => setImage(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="/images/..." /></label>
              <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} className="h-5 w-5" /> Enabled</label>
            </div>
            <div className="flex gap-3">
              <button className="rounded-md bg-skalvi-orange px-5 py-2 text-sm font-bold text-white" type="submit">{editingKey ? "Update" : "Save"}</button>
              {editingKey && <button className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold" type="button" onClick={reset}>Cancel</button>}
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-skalvi-ink">Sections ({sections.length})</h2>
            <div className="mt-4 grid gap-3">
              {sections.map(s => (
                <div key={s.id} className="flex items-center justify-between rounded-[8px] border border-slate-200 p-4">
                  <div>
                    <p className="font-semibold text-skalvi-deep">{s.title} <span className="text-xs text-slate-400">({s.key})</span></p>
                    <p className="mt-1 text-xs text-slate-500">Order: {s.order} &middot; {s.enabled ? "Enabled" : "Disabled"}</p>
                  </div>
                  <button onClick={() => edit(s)} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold">Edit</button>
                </div>
              ))}
              {sections.length === 0 && <p className="text-sm text-slate-500">No sections yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
