"use client";

import Link from "next/link";
import { useState } from "react";
import { Images, Upload } from "lucide-react";

export default function AdminMediaPage() {
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setMsg("");
    const form = new FormData();
    form.set("file", file);
    form.set("title", title || file.name);
    form.set("alt", alt || file.name);
    form.set("category", category);
    const res = await fetch("/api/admin/media", { method: "POST", body: form });
    if (res.ok) {
      setMsg("Uploaded successfully!");
      setTitle(""); setAlt(""); setFile(null);
    } else {
      const err = await res.json();
      setMsg("Error: " + (err.error || "Upload failed"));
    }
    setUploading(false);
  }

  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple hover:underline">&larr; Back to dashboard</Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3"><Images className="text-skalvi-orange" /><h1 className="font-display text-3xl font-semibold text-skalvi-ink">Media Library</h1></div>
          <p className="mt-2 text-sm text-slate-600">Upload images (JPEG, PNG, WebP under 5MB)</p>

          {msg && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-700">{msg}</p>}

          <form onSubmit={upload} className="mt-6 grid gap-4 rounded-[8px] border border-skalvi-purple/10 bg-skalvi-mist p-6">
            <label className="grid gap-1 text-sm font-semibold">
              Choose Image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] || null)} className="text-sm" required />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Title<input value={title} onChange={e => setTitle(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
              <label className="grid gap-1 text-sm font-semibold">Alt Text<input value={alt} onChange={e => setAlt(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" /></label>
            </div>
            <label className="grid gap-1 text-sm font-semibold">Category<select value={category} onChange={e => setCategory(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm"><option>general</option><option>campus</option><option>events</option><option>achievements</option><option>academics</option></select></label>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-skalvi-orange px-5 py-2 text-sm font-bold text-white hover:bg-[#e77514] disabled:opacity-50" type="submit" disabled={!file || uploading}>
              <Upload size={16} />{uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
