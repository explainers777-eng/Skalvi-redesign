export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center"
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto mb-12 max-w-3xl text-center" : "mb-10 max-w-3xl"}>
      {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-skalvi-orange">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl font-semibold leading-tight text-skalvi-ink md:text-5xl">{title}</h2>
      {children ? <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{children}</p> : null}
    </div>
  );
}
