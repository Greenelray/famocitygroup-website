import { cookies } from "next/headers";
import { decodeSigned, encodeSigned } from "@/lib/secure-cookie";
import { getSessionUser } from "@/lib/session";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

type EnrollmentPayload = {
  courseSlugs: string[];
};

const ENROLLMENTS_COOKIE = "famocity_enrollments";

export async function getEnrollmentSlugs() {
  const session = await getSessionUser();

  if (isSupabaseConfigured() && session?.id) {
    try {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase
        .from("enrollments")
        .select("course_slug")
        .eq("user_id", session.id);

      if (!error && data) {
        return data.map((row) => row.course_slug);
      }
    } catch {
      // Fall back to the cookie-based prototype mode when the database is not ready.
    }
  }

  const store = await cookies();
  const payload = decodeSigned<EnrollmentPayload>(store.get(ENROLLMENTS_COOKIE)?.value);
  return payload?.courseSlugs ?? [];
}

export async function hasEnrollment(courseSlug: string) {
  const courseSlugs = await getEnrollmentSlugs();
  return courseSlugs.includes(courseSlug);
}

export function createEnrollmentsCookie(courseSlugs: string[]) {
  return {
    name: ENROLLMENTS_COOKIE,
    value: encodeSigned({ courseSlugs }),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 90
  };
}
