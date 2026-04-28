import { getSessionUser } from "@/lib/session";
import { getAdminEmailsFromEnv, isAdminEmail } from "@/lib/admin-emails";

export async function getAdminAccess() {
  const user = await getSessionUser();

  if (!user) {
    return {
      allowed: false,
      reason: "unauthenticated" as const,
      user: null
    };
  }

  const adminEmails = getAdminEmailsFromEnv();
  const allowed = adminEmails.includes(user.email.toLowerCase());

  return {
    allowed,
    reason: allowed ? ("allowed" as const) : ("forbidden" as const),
    user
  };
}
