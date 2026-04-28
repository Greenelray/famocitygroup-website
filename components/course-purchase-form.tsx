"use client";

import { useState } from "react";

type CoursePurchaseFormProps = {
  courseSlug: string;
  disabled?: boolean;
};

export function CoursePurchaseForm({ courseSlug, disabled }: CoursePurchaseFormProps) {
  const [loading, setLoading] = useState(false);

  return (
    <form
      action="/api/paystack/initialize"
      method="POST"
      onSubmit={() => setLoading(true)}
      className="w-full"
    >
      <input name="courseSlug" type="hidden" value={courseSlug} />
      <button
        type="submit"
        disabled={disabled || loading}
        className="premium-button-accent w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting to payment..." : "Buy this course"}
      </button>
    </form>
  );
}
