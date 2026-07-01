import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminContentPage() {
  return (
    <AdminSectionPage
      title="Content Management"
      description="Edit homepage sections, text, images, and section ordering."
      instructions={[
        { step: "View homepage sections", detail: "Send a GET request to /api/admin/homepage to see all sections ordered by position." },
        { step: "Add or update a section", detail: "Send a POST request to /api/admin/homepage with JSON: { key, title, body, image?, order, enabled }. Uses upsert - same key updates existing." },
        { step: "Enable/disable sections", detail: "Set the 'enabled' field to true or false to show or hide sections on the homepage." },
        { step: "Reorder sections", detail: "Change the 'order' number to rearrange how sections appear on the homepage." }
      ]}
    />
  );
}
