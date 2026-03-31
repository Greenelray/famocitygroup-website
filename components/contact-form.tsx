"use client";

import { FormEvent, useState, useTransition } from "react";

type FormState = {
  type: "idle" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [state, setState] = useState<FormState>({ type: "idle", message: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = (await response.json()) as { message?: string };

        if (!response.ok) {
          setState({
            type: "error",
            message: data.message ?? "We could not send your message. Please try again."
          });
          return;
        }

        form.reset();
        setState({
          type: "success",
          message: data.message ?? "Your message has been sent successfully."
        });
      } catch {
        setState({
          type: "error",
          message: "Network issue detected. Please try again in a moment."
        });
      }
    });
  };

  return (
    <form className="mt-8 grid gap-5" aria-label="Contact form" onSubmit={handleSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Name</span>
        <input
          aria-label="Name"
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-[#c8a951] focus:ring-2 focus:ring-[#c8a951]/20"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <input
          aria-label="Email"
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-[#c8a951] focus:ring-2 focus:ring-[#c8a951]/20"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Message</span>
        <textarea
          aria-label="Message"
          rows={6}
          name="message"
          placeholder="Tell us how we can help you"
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-[#c8a951] focus:ring-2 focus:ring-[#c8a951]/20"
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-[#0b1f3a] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#102848] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
      {state.type !== "idle" ? (
        <p className={`text-sm ${state.type === "success" ? "text-emerald-600" : "text-rose-600"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
