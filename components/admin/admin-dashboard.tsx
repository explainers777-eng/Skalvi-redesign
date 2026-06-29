import Link from "next/link";
import { BarChart3, FileText, Images, Inbox, Medal, Shield, Users } from "lucide-react";

const modules = [
  { href: "/secure-admin/blogs", label: "Blog Management", icon: FileText, detail: "Create, edit, delete and schedule posts." },
  { href: "/secure-admin/achievements", label: "Achievements", icon: Medal, detail: "Add awards, categories, photos and archives." },
  { href: "/secure-admin/media", label: "Media Library", icon: Images, detail: "Validated image uploads and organization." },
  { href: "/secure-admin/content", label: "Homepage Content", icon: BarChart3, detail: "Edit copy, images and section order." },
  { href: "/secure-admin/users", label: "User Roles", icon: Users, detail: "Manage admin roles and permissions." },
  { href: "/secure-admin/inquiries", label: "Inquiries", icon: Inbox, detail: "Review contact and admissions enquiries." }
];

export function AdminDashboard() {
  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[8px] bg-skalvi-deep p-8 text-white">
          <Shield className="mb-4 text-skalvi-gold" />
          <h1 className="font-display text-4xl font-semibold">Skalvi Admin Dashboard</h1>
          <p className="mt-3 max-w-3xl text-white/75">
            Production architecture includes protected routes, RBAC, hashed passwords, validated input, safe uploads, audit logs and secure headers.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ href, label, detail, icon: Icon }) => (
            <Link key={href} href={href} className="rounded-[8px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <Icon className="mb-5 text-skalvi-orange" />
              <h2 className="text-xl font-bold text-skalvi-ink">{label}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
