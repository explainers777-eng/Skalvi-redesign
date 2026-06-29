import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminBlogsPage() {
  return <AdminSectionPage title="Blog Management" description="Create, edit, delete and schedule publishing through validated API routes." features={["POST /api/admin/blogs creates drafts or scheduled posts", "PUT /api/admin/blogs/:id edits existing posts", "DELETE /api/admin/blogs/:id removes posts", "Audit logs record all changes"]} />;
}
