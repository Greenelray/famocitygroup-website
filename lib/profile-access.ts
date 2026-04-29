import { createSupabaseAdminClient } from "@/lib/supabase";

type ProfileIdentity = {
  email: string;
  id: string;
  name: string;
};

export async function syncProfile(identity: ProfileIdentity) {
  try {
    const supabase = createSupabaseAdminClient();

    await supabase.from("profiles").upsert({
      id: identity.id,
      email: identity.email,
      full_name: identity.name
    });
  } catch (error) {
    console.error("Profile sync failed.", error);
  }
}
