import { createSupabaseAdminClient } from "@/lib/supabase";

type ProfileIdentity = {
  email: string;
  id: string;
  name: string;
};

export async function syncProfile(identity: ProfileIdentity) {
  const supabase = createSupabaseAdminClient();

  await supabase.from("profiles").upsert({
    id: identity.id,
    email: identity.email,
    full_name: identity.name
  });
}
