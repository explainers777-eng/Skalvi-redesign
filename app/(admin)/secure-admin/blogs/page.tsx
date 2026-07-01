"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";

type Blog = { id: string; title: string; slug: string; excerpt: string; content: string; status: string; createdAt: string };

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("School");
  const [status, setStatus] = useState("DRAFT");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchBlogs(); }, []);

  async function fetchBlogs() {
    const res = await fetch("/api/admin/blogs");
    if (res.ok) setBlogs(await res.json());
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const body = { title, slug, excerpt, content, category, status };
    const url = editingId ? `/api/admin/blogs/${editingId}` : "/api/admin/blogs";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      setMsg(editingId ? "Blog updated!" : "Blog created!");
      reset();
      fetchBlogs();
    } else {
      const err = await res.json();
      setMsg("Error: " + JSON.stringify(err));
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this blog?")) return;
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  }

  function edit(blog: Blog) {
    setEditingId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCategory("School");
    setStatus(blog.status);
  }

  function reset() {
    setEditingId(null);
    setTitle(""); setSlug(""); setExcerpt(""); setContent(""); setCategory("School"); setStatus("DRAFT");
  }

  function generateSlug(v: string) { setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")); }

  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple hover:underline">&larr; Back to dashboard</Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3"><FileText className="text-skalvi-orange" /><h1 className="font-display text-3xl font-semibold text-skalvi-ink">Blog Management</h1></div>

          {msg && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-700">{msg}</p>}

          <form onSubmit={save} className="mt-6 grid gap-4 rounded-[8px] border border-skalvi-purple/10 bg-skalvi-mist p-6">
            <h2 className="font-bold text-skalvi-ink">{editingId ? "Edit Blog" : "Create New Blog"}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Title<input value={title} onChange={e => { setTitle(e.target.value); generateSlug(e.target.value); }} className="rounded-md border border-slate-300 px-3 py-2 text-sm" required /></label>
              <label className="grid gap-1 text-sm font-semibold">Slug<input value={slug} onChange={e => setSlug(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" required /></label>
            </div>
            <label className="grid gap-1 text-sm font-semibold">Excerpt<textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" rows={2} required /></label>
            <label className="grid gap-1 text-sm font-semibold">Content<textarea value={content} onChange={e => setContent(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" rows={4} required /></label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Category<select value={category} onChange={e => setCategory(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm"><option>School</option><option>Parenting</option><option>Academics</option><option>Events</option></select></label>
              <label className="grid gap-1 text-sm font-semibold">Status<select value={status} onChange={e => setStatus(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm"><option>DRAFT</option><option>PUBLISHED</option><option>SCHEDULED</option></select></label>
            </div>
            <div className="flex gap-3">
              <button className="rounded-md bg-skalvi-orange px-5 py-2 text-sm font-bold text-white hover:bg-[#e77514]" type="submit">{editingId ? "Update" : "Create"}</button>
              {editingId && <button className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold hover:bg-slate-100" type="button" onClick={reset}>Cancel</button>}
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-skalvi-ink">Existing Blogs ({blogs.length})</h2>
            <div className="mt-4 grid gap-3">
              {blogs.map(blog => (
                <div key={blog.id} className="flex items-center justify-between rounded-[8px] border border-slate-200 p-4">
                  <div>
                    <p className="font-semibold text-skalvi-deep">{blog.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{blog.slug} &middot; {blog.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => edit(blog)} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100">Edit</button>
                    <button onClick={() => remove(blog.id)} className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && <p className="text-sm text-slate-500">No blogs yet. Create one above.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
