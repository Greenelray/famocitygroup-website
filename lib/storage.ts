import { COURSE_IMAGES_BUCKET, COURSE_VIDEOS_BUCKET, createSupabaseAdminClient } from "@/lib/supabase";

const IMAGE_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
const VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-matroska"];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 500 * 1024 * 1024;

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

function validateUpload(file: File, options: { allowedMimeTypes: string[]; fieldLabel: string; maxBytes: number }) {
  if (!options.allowedMimeTypes.includes(file.type)) {
    throw new Error(`${options.fieldLabel} uses an unsupported file type.`);
  }

  if (file.size <= 0 || file.size > options.maxBytes) {
    throw new Error(`${options.fieldLabel} exceeds the allowed file size.`);
  }
}

export async function uploadCourseImage(file: File, slug: string, kind: "hero" | "thumbnail") {
  validateUpload(file, {
    allowedMimeTypes: IMAGE_MIME_TYPES,
    fieldLabel: "Course image",
    maxBytes: MAX_IMAGE_BYTES
  });

  await ensureBucket(COURSE_IMAGES_BUCKET, {
    public: true,
    fileSizeLimit: "10MB",
    allowedMimeTypes: IMAGE_MIME_TYPES
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
  validateUpload(file, {
    allowedMimeTypes: VIDEO_MIME_TYPES,
    fieldLabel: "Lesson video",
    maxBytes: MAX_VIDEO_BYTES
  });

  await ensureBucket(COURSE_VIDEOS_BUCKET, {
    public: true,
    fileSizeLimit: "500MB",
    allowedMimeTypes: VIDEO_MIME_TYPES
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
