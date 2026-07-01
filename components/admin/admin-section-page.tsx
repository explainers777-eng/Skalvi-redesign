import Link from "next/link";

export function AdminSectionPage({
  title,
  description,
  instructions
}: {
  title: string;
  description: string;
  instructions: { step: string; detail: string }[];
}) {
  return (
    <section className="p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/secure-admin" className="mb-6 inline-flex text-sm font-bold text-skalvi-purple hover:underline">
          &larr; Back to dashboard
        </Link>
        <div className="rounded-[8px] bg-white p-8 shadow-sm">
          <h1 className="font-display text-3xl font-semibold text-skalvi-ink md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">{description}</p>

          <div className="mt-8 rounded-[8px] border border-skalvi-purple/10 bg-skalvi-mist p-6">
            <h2 className="text-lg font-bold text-skalvi-ink">How to use this section</h2>
            <div className="mt-4 grid gap-4">
              {instructions.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-skalvi-purple text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-skalvi-deep">{item.step}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
