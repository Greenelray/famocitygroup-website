import { getSessionUser } from "@/lib/session";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { getAdminEmailsFromEnv } from "@/lib/admin-emails";

export async function getAdminAccess() {
  const user = await getSessionUser();

  if (!user) {
    return {
      allowed: false,
      reason: "unauthenticated" as const,
      user: null
    };
  }

  if (!isSupabaseConfigured() || !user.id) {
    return {
      allowed: false,
      reason: "forbidden" as const,
      user
    };
  }

  const adminEmails = getAdminEmailsFromEnv();
  let allowed = false;

  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, email")
      .eq("id", user.id)
      .maybeSingle();

    allowed = Boolean(data && data.email.toLowerCase() === user.email.toLowerCase() && adminEmails.includes(data.email.toLowerCase()));
  } catch {
    allowed = false;
  }

  return {
    allowed,
    reason: allowed ? ("allowed" as const) : ("forbidden" as const),
    user
  };
}
