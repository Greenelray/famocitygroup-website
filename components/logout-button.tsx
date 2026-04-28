"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="premium-button-secondary w-full sm:w-auto"
      disabled={pending}
    >
      {pending ? "Signing out..." : "Log out"}
    </button>
  );
}

export function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <SubmitButton />
    </form>
  );
}
