"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function AdminLogin() {
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false
    });
    if (result?.ok) window.location.reload();
    else setError("Invalid credentials or inactive account.");
  }

  return (
    <section className="grid min-h-screen place-items-center bg-skalvi-mist p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[8px] bg-white p-8 shadow-soft">
        <Image src="/images/brand/logo.png" alt="Skalvi logo" width={86} height={80} className="mb-6" />
        <h1 className="font-display text-3xl font-semibold text-skalvi-ink">Secure Admin Portal</h1>
        <p className="mt-2 text-sm text-slate-600">Protected content management for Skalvi International School.</p>
        <div className="mt-8 grid gap-4">
          <input name="email" type="email" required placeholder="Email" className="rounded-md border border-slate-300 px-4 py-3" />
          <input name="password" type="password" required placeholder="Password" className="rounded-md border border-slate-300 px-4 py-3" />
          {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
          <button className="rounded-md bg-skalvi-orange px-5 py-3 text-sm font-bold text-white" type="submit">Sign in</button>
        </div>
      </form>
    </section>
  );
}
