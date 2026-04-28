import { COURSE_IMAGES_BUCKET, COURSE_VIDEOS_BUCKET, createSupabaseAdminClient } from "@/lib/supabase";

async function ensureBucket(name: string, options: { public: boolean; fileSizeLimit?: string; allowedMimeTypes?: string[] }) {
  const supabase = createSupabaseAdminClient();
  const { data: bucket } = await supabase.storage.getBucket(name);

  if (bucket) {
    return;
  }

  await supabase.storage.createBucket(name, options);
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");
}

export async function uploadCourseImage(file: File, slug: string, kind: "hero" | "thumbnail") {
  await ensureBucket(COURSE_IMAGES_BUCKET, {
    public: true,
    fileSizeLimit: "10MB",
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"]
  });

  const supabase = createSupabaseAdminClient();
  const path = `${slug}/${kind}-${Date.now()}-${sanitizeFileName(file.name)}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadResult = await supabase.storage.from(COURSE_IMAGES_BUCKET).upload(path, bytes, {
    contentType: file.type,
    upsert: true
  });

  if (uploadResult.error) {
    throw new Error("Could not upload course image.");
  }

  const { data } = supabase.storage.from(COURSE_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadCourseVideo(file: File, slug: string, lessonSlug: string) {
  await ensureBucket(COURSE_VIDEOS_BUCKET, {
    public: true,
    fileSizeLimit: "500MB",
    allowedMimeTypes: ["video/mp4", "video/webm", "video/quicktime", "video/x-matroska"]
  });

  const supabase = createSupabaseAdminClient();
  const path = `${slug}/${lessonSlug}-${Date.now()}-${sanitizeFileName(file.name)}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadResult = await supabase.storage.from(COURSE_VIDEOS_BUCKET).upload(path, bytes, {
    contentType: file.type,
    upsert: true
  });

  if (uploadResult.error) {
    throw new Error("Could not upload lesson video.");
  }

  const { data } = supabase.storage.from(COURSE_VIDEOS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
