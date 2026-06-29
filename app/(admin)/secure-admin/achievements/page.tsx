import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminAchievementsPage() {
  return <AdminSectionPage title="Achievements Management" description="Manage awards, student achievements, categories, images and archives." features={["Achievement CRUD APIs", "Category field for awards, sports and culture", "Published, scheduled, draft and archive states", "Audit logging for updates"]} />;
}
