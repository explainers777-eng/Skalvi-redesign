import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminBlogsPage() {
  return (
    <AdminSectionPage
      title="Blog Management"
      description="Create, edit, delete and schedule blog posts for parents and visitors."
      instructions={[
        { step: "View all blogs", detail: "Send a GET request to /api/admin/blogs to see all posts. Click a post to edit." },
        { step: "Create a new blog", detail: "Send a POST request to /api/admin/blogs with JSON: { title, slug, excerpt, content, category, status }. Status can be DRAFT, PUBLISHED, or SCHEDULED." },
        { step: "Edit a blog", detail: "Send a PUT request to /api/admin/blogs/:id with the updated fields as JSON." },
        { step: "Delete a blog", detail: "Send a DELETE request to /api/admin/blogs/:id to remove a post." }
      ]}
    />
  );
}
