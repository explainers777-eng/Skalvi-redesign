import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminUsersPage() {
  return (
    <AdminSectionPage
      title="User Management"
      description="Manage admin accounts and roles for the school team."
      instructions={[
        { step: "Admin user created", detail: "A default admin user exists in the database: admin@skalvi.com. Use the seed script to add more." },
        { step: "User roles", detail: "Roles available: SUPER_ADMIN, ADMIN, EDITOR, VIEWER. Higher roles have more permissions." },
        { step: "Activate/deactivate users", detail: "Set the 'active' field to false to disable an account without deleting it." },
        { step: "Add new users", detail: "Run the seed script or use Prisma Studio (npm run prisma:studio) to add users with hashed passwords." }
      ]}
    />
  );
}
