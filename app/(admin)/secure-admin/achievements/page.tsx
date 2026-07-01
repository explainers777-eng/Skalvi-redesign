import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminAchievementsPage() {
  return (
    <AdminSectionPage
      title="Achievements Management"
      description="Add and manage awards, student achievements, and school recognition."
      instructions={[
        { step: "View achievements", detail: "Send a GET request to /api/admin/achievements to see all achievements." },
        { step: "Add an achievement", detail: "Send a POST request to /api/admin/achievements with JSON: { title, slug, category, summary, image?, status, awardedAt? }." },
        { step: "Edit an achievement", detail: "Send a PUT request to /api/admin/achievements/:id with the updated fields." },
        { step: "Delete an achievement", detail: "Send a DELETE request to /api/admin/achievements/:id to remove it." }
      ]}
    />
  );
}
