import Link from "next/link";

export function AdminSectionPage({ title, description, features }: { title: string; description: string; features: string[] }) {
  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple">Back to dashboard</Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <h1 className="font-display text-4xl font-semibold text-skalvi-ink">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="rounded-[8px] border border-slate-200 p-5 text-sm font-semibold text-slate-700">{feature}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
