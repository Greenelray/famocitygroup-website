import { PageLoading } from "@/components/page-loading";

export default function Loading() {
  return (
    <PageLoading
      eyebrow="Student Profile"
      title="Loading your profile."
      message="Getting your account details, access records, and profile settings ready."
    />
  );
}
