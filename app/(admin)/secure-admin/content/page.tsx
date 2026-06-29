import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminContentPage() {
  return <AdminSectionPage title="Content Management" description="Edit homepage sections, text, images and ordering." features={["Homepage section upsert API", "Enable or disable sections", "Order sections numerically", "Ready for visual CMS controls"]} />;
}
