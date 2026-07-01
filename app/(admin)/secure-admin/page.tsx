import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLogin } from "@/components/admin/admin-login";

export default async function SecureAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return <AdminLogin />;
  return <AdminDashboard />;
}
