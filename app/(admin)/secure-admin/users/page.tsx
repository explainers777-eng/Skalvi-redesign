import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminUsersPage() {
  return <AdminSectionPage title="User Management" description="Role-based admin access for school staff." features={["SUPER_ADMIN, ADMIN, EDITOR and VIEWER roles", "Active/inactive account flag", "Hashed password storage", "Protected middleware for admin routes"]} />;
}
