"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageIcon, Medal, Trash2, Upload } from "lucide-react";

type Achievement = { id: string; title: string; slug: string; category: string; summary: string; image: string | null; status: string };

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("PUBLISHED");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const res = await fetch("/api/admin/achievements");
    if (res.ok) setItems(await res.json());
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, unknown> = { title, slug, category, summary, status, image: image || null };
    const url = editingId ? `/api/admin/achievements/${editingId}` : "/api/admin/achievements";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setMsg(editingId ? "Updated!" : "Created!"); reset(); fetchItems(); }
    else setMsg("Error saving");
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const form = new FormData();
    form.set("file", file);
    form.set("title", `achievement-${slug || "image"}`);
    form.set("alt", title || "Achievement image");
    form.set("category", "achievements");
    const res = await fetch("/api/admin/media", { method: "POST", body: form });
    if (res.ok) {
      const data = await res.json();
      setImage(data.url);
      setMsg("Image uploaded!");
    } else {
      setMsg("Upload failed");
    }
    setUploading(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this achievement?")) return;
    await fetch(`/api/admin/achievements/${id}`, { method: "DELETE" });
    fetchItems();
  }

  function edit(item: Achievement) {
    setEditingId(item.id); setTitle(item.title); setSlug(item.slug);
    setCategory(item.category); setSummary(item.summary); setImage(item.image || "");
    setStatus(item.status);
  }

  function reset() {
    setEditingId(null); setTitle(""); setSlug(""); setCategory("");
    setSummary(""); setImage(""); setStatus("PUBLISHED");
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

            {/* Image section */}
            <div className="rounded-[8px] border border-dashed border-slate-300 p-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-skalvi-ink"><ImageIcon size={16} /> Photo</label>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-sm">
                  <span className="text-xs text-slate-500">Image URL</span>
                  <input value={image} onChange={e => setImage(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="/images/school/..." />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-xs text-slate-500">Or upload a file</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f); }}
                    className="text-sm"
                    disabled={uploading}
                  />
                </label>
              </div>
              {image && (
                <div className="mt-3">
                  <img src={image} alt="Preview" className="h-24 w-32 rounded-md object-cover shadow-sm" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
              {uploading && <p className="mt-2 text-xs text-slate-500"><Upload size={12} className="inline" /> Uploading...</p>}
            </div>

            <div className="flex gap-3">
              <button className="rounded-md bg-skalvi-orange px-5 py-2 text-sm font-bold text-white hover:bg-[#e77514]" type="submit">{editingId ? "Update" : "Create"}</button>
              {editingId && <button className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold hover:bg-slate-100" type="button" onClick={reset}>Cancel</button>}
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-skalvi-ink">All Achievements ({items.length})</h2>
            <div className="mt-4 grid gap-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between rounded-[8px] border border-slate-200 p-4">
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img src={item.image} alt="" className="h-12 w-16 rounded object-cover" />
                    )}
                    <div>
                      <p className="font-semibold text-skalvi-deep">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.category} &middot; {item.status}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => edit(item)} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100">Edit</button>
                    <button onClick={() => remove(item.id)} className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
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
