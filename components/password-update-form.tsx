"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function PasswordUpdateForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action="/api/account/update-password" method="POST" className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">New password</span>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            minLength={8}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-14 outline-none transition focus:border-[#c8a951]"
            placeholder="Create a new password"
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

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Confirm new password</span>
        <div className="relative">
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            minLength={8}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-14 outline-none transition focus:border-[#c8a951]"
            placeholder="Re-enter your new password"
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

      <button type="submit" className="premium-button-primary w-full sm:w-auto">
        Update password
      </button>
    </form>
  );
}
