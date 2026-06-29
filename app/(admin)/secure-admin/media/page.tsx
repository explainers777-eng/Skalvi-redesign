import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminMediaPage() {
  return <AdminSectionPage title="Media Management" description="Upload and organize safe image assets." features={["JPEG, PNG and WebP only", "5 MB upload limit", "Sharp metadata validation", "Stored in public/uploads and indexed in PostgreSQL"]} />;
}
