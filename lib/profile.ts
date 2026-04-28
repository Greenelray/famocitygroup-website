import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { getEnrollmentSlugs } from "@/lib/enrollments";
import { getSessionUser } from "@/lib/session";

export type StudentProfile = {
  id?: string;
  email: string;
  fullName: string;
  createdAt: string | null;
  enrolledCount: number;
  purchaseCount: number;
};

export async function getStudentProfile() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const enrollmentSlugs = await getEnrollmentSlugs();

  if (!isSupabaseConfigured() || !user.id) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.name,
      createdAt: null,
      enrolledCount: enrollmentSlugs.length,
      purchaseCount: enrollmentSlugs.length
    } satisfies StudentProfile;
  }

  try {
    const supabase = createSupabaseAdminClient();
    const [{ data: profile }, { count: purchaseCount }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, email, created_at")
        .eq("id", user.id)
        .maybeSingle(),
      supabase
        .from("purchases")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
    ]);

    return {
      id: profile?.id ?? user.id,
      email: profile?.email ?? user.email,
      fullName: profile?.full_name || user.name,
      createdAt: profile?.created_at ?? null,
      enrolledCount: enrollmentSlugs.length,
      purchaseCount: purchaseCount ?? 0
    } satisfies StudentProfile;
  } catch {
    return {
      id: user.id,
      email: user.email,
      fullName: user.name,
      createdAt: null,
      enrolledCount: enrollmentSlugs.length,
      purchaseCount: enrollmentSlugs.length
    } satisfies StudentProfile;
  }
}
