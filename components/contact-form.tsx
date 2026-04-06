"use client";

import { FormEvent, useState } from "react";

type FormState = {
  type: "idle" | "success" | "error";
  message: string;
};

const contactEmail = "famocityprime@gmail.com";
const whatsappNumber = "2348148287468";

export function ContactForm() {
  const [state, setState] = useState<FormState>({ type: "idle", message: "" });

  const getPayload = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    return {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };
  };

  const buildMessage = (payload: { name: string; email: string; message: string }) =>
    [
      "Hello Famocity,",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      "",
      "Message:",
      payload.message
    ].join("\n");

  const validatePayload = (payload: { name: string; email: string; message: string }) => {
    if (!payload.name || !payload.email || !payload.message) {
      setState({
        type: "error",
        message: "Please complete your name, email, and message before sending."
      });
      return false;
    }

    setState({ type: "idle", message: "" });
    return true;
  };

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = getPayload(form);

    if (!validatePayload(payload)) {
      return;
    }

    const subject = encodeURIComponent(`Famocity enquiry from ${payload.name}`);
    const body = encodeURIComponent(buildMessage(payload));

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    form.reset();
    setState({
      type: "success",
      message: "Your email app has been opened with the message filled in."
    });
  };

  const handleWhatsAppClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form;

    if (!form) {
      return;
    }

    const payload = getPayload(form);

    if (!validatePayload(payload)) {
      return;
    }

    const text = encodeURIComponent(buildMessage(payload));
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
    setState({
      type: "success",
      message: "WhatsApp has been opened with the message filled in."
    });
  };

  return (
    <form className="mt-8 grid gap-5" aria-label="Contact form" onSubmit={handleEmailSubmit}>
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
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[#0b1f3a] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#102848]"
        >
          Send via Email
        </button>
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="inline-flex items-center justify-center rounded-full border border-[#0b1f3a]/15 bg-white px-7 py-4 text-sm font-semibold text-[#0b1f3a] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[#c8a951] hover:text-[#0b1f3a]"
        >
          Send via WhatsApp
        </button>
      </div>
      {state.type !== "idle" ? (
        <p className={`text-sm ${state.type === "success" ? "text-emerald-600" : "text-rose-600"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
