import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminInquiriesPage() {
  return <AdminSectionPage title="Contact Management" description="Review parent inquiries submitted through the website." features={["Rate-limited contact intake", "Validated name, phone, email and message", "Inquiry read/unread model", "Ready for assignment workflow"]} />;
}
