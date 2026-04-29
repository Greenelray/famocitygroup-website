"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type LoginFormProps = {
  initialError?: string;
  next: string;
};

export function LoginForm({ initialError, next }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError ?? "");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    formData.set("next", next);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
        headers: {
          "x-famocity-request": "json"
        },
        credentials: "same-origin"
      });

      const data = (await response.json()) as {
        error?: string;
        ok?: boolean;
        redirectTo?: string;
      };

      if (!response.ok || !data.ok || !data.redirectTo) {
        setError(data.error || "We could not log you in right now.");
        return;
      }

      window.location.assign(data.redirectTo);
    } catch {
      setError("We could not log you in right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={next} />
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-14 outline-none transition focus:border-[#c8a951]"
            placeholder="Your password"
            autoComplete="current-password"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute inset-y-0 right-3 inline-flex items-center justify-center text-slate-500 transition hover:text-[#0b1f3a]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>
      <button type="submit" disabled={loading} className="premium-button-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
