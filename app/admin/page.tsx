import { cookies } from "next/headers";
import { AdminGallery } from "@/components/AdminGallery";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/auth";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const authed = isValidAdminToken(token);

  return <AdminGallery authed={authed} />;
}