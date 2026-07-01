"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Medal, Trash2 } from "lucide-react";

type Achievement = { id: string; title: string; slug: string; category: string; summary: string; status: string };

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("PUBLISHED");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const res = await fetch("/api/admin/achievements");
    if (res.ok) setItems(await res.json());
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const body = { title, slug, category, summary, status };
    const url = editingId ? `/api/admin/achievements/${editingId}` : "/api/admin/achievements";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setMsg(editingId ? "Updated!" : "Created!"); reset(); fetchItems(); }
    else setMsg("Error saving");
  }

  async function remove(id: string) {
    if (!confirm("Delete this achievement?")) return;
    await fetch(`/api/admin/achievements/${id}`, { method: "DELETE" });
    fetchItems();
  }

  function edit(item: Achievement) {
    setEditingId(item.id); setTitle(item.title); setSlug(item.slug); setCategory(item.category); setSummary(item.summary); setStatus(item.status);
  }

  function reset() {
    setEditingId(null); setTitle(""); setSlug(""); setCategory(""); setSummary(""); setStatus("PUBLISHED");
  }

  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple hover:underline">&larr; Back to dashboard</Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3"><Medal className="text-skalvi-orange" /><h1 className="font-display text-3xl font-semibold text-skalvi-ink">Achievements</h1></div>
          {msg && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-700">{msg}</p>}

          <form onSubmit={save} className="mt-6 grid gap-4 rounded-[8px] border border-skalvi-purple/10 bg-skalvi-mist p-6">
            <h2 className="font-bold">{editingId ? "Edit" : "Add Achievement"}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Title<input value={title} onChange={e => { setTitle(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")); }} className="rounded-md border border-slate-300 px-3 py-2 text-sm" required /></label>
              <label className="grid gap-1 text-sm font-semibold">Slug<input value={slug} onChange={e => setSlug(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" required /></label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Category<input value={category} onChange={e => setCategory(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" required /></label>
              <label className="grid gap-1 text-sm font-semibold">Status<select value={status} onChange={e => setStatus(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm"><option>PUBLISHED</option><option>DRAFT</option><option>ARCHIVED</option></select></label>
            </div>
            <label className="grid gap-1 text-sm font-semibold">Summary<textarea value={summary} onChange={e => setSummary(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" rows={3} required /></label>
            <div className="flex gap-3">
              <button className="rounded-md bg-skalvi-orange px-5 py-2 text-sm font-bold text-white" type="submit">{editingId ? "Update" : "Create"}</button>
              {editingId && <button className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold" type="button" onClick={reset}>Cancel</button>}
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-skalvi-ink">All Achievements ({items.length})</h2>
            <div className="mt-4 grid gap-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between rounded-[8px] border border-slate-200 p-4">
                  <div>
                    <p className="font-semibold text-skalvi-deep">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.category} &middot; {item.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => edit(item)} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold">Edit</button>
                    <button onClick={() => remove(item.id)} className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="text-sm text-slate-500">No achievements yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
