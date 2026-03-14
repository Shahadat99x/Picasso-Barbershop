import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getSiteSettings } from "@/app/admin/actions/settings";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="Manage global site settings and defaults."
      />
      <SettingsForm initialData={settings} />
    </div>
  );
}
