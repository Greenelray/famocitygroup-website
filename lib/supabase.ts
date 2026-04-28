import { createClient } from "@supabase/supabase-js";

function getUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function isSupabaseConfigured() {
  return Boolean(getUrl() && getAnonKey() && getServiceRoleKey());
}

export function createSupabaseAuthClient() {
  const url = getUrl();
  const anonKey = getAnonKey();

  if (!url || !anonKey) {
    throw new Error("Supabase auth is not configured.");
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export function createSupabaseAdminClient() {
  const url = getUrl();
  const serviceRoleKey = getServiceRoleKey();

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase admin access is not configured.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export const COURSE_IMAGES_BUCKET = "course-images";
export const COURSE_VIDEOS_BUCKET = "course-videos";
