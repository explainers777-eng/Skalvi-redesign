import Link from "next/link";
import { Shield, Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple hover:underline">&larr; Back to dashboard</Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3"><Users className="text-skalvi-orange" /><h1 className="font-display text-3xl font-semibold text-skalvi-ink">Admin Accounts</h1></div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[8px] border border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <Shield className="text-skalvi-gold" size={24} />
                <div>
                  <p className="font-semibold text-skalvi-deep">Super Admin</p>
                  <p className="text-sm text-slate-500">admin@skalvi.com</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">Full access to all admin sections. This is the default admin account with password stored in the code.</p>
            </div>
          </div>
          <div className="mt-6 rounded-[8px] border border-skalvi-purple/10 bg-skalvi-mist p-5">
            <h2 className="text-sm font-bold text-skalvi-ink">About Admin Accounts</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This prototype uses hardcoded credentials: <strong>admin@skalvi.com</strong> with the password set in <code className="rounded bg-white px-1.5 py-0.5 text-xs font-mono">lib/auth.ts</code>.
              For production, switch to a database-backed auth system with role management (SUPER_ADMIN, ADMIN, EDITOR, VIEWER).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
