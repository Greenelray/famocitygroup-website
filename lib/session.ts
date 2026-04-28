import { cookies } from "next/headers";
import { decodeSigned, encodeSigned } from "@/lib/secure-cookie";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

export type SessionUser = {
  id?: string;
  email: string;
  name: string;
};

const SESSION_COOKIE = "famocity_session";

export async function getSessionUser() {
  const store = await cookies();
  const session = decodeSigned<SessionUser>(store.get(SESSION_COOKIE)?.value);

  if (!session) {
    return null;
  }

  if (!isSupabaseConfigured() || !session.id) {
    return session;
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("id", session.id)
      .maybeSingle();

    if (!data) {
      return session;
    }

    return {
      id: data.id,
      email: data.email,
      name: data.full_name || session.name || data.email
    };
  } catch {
    return session;
  }
}

export function createSessionCookie(user: SessionUser) {
  return {
    name: SESSION_COOKIE,
    value: encodeSigned(user),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  };
}

export function clearSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  };
}
