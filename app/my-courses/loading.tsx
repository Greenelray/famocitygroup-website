import { PageLoading } from "@/components/page-loading";

export default function Loading() {
  return (
    <PageLoading
      eyebrow="Student Dashboard"
      title="Loading your courses."
      message="Checking your enrollments and opening the right learning dashboard for your account."
    />
  );
}
