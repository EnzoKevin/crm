import type { AuthUser } from "../../types";
import TopBar from "../../components/shared/TopBar";
import ProfileForm from "./components/ProfileForm";
import NotificationsCard from "./components/NotificationsCard";
import SecurityCard from "./components/SecurityCard";
import RegionCard from "./components/RegionCard";
import DangerZoneCard from "./components/DangerZoneCard";

export default function SettingsView({ user }: { user: AuthUser }) {
  return (
    <div className="flex-1 overflow-auto">
      <TopBar title="Configurações" subtitle="Preferências da conta e do sistema" />
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <ProfileForm user={user} />

        <div className="space-y-6">
          <NotificationsCard />
          <SecurityCard />
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegionCard />
          <DangerZoneCard />
        </div>
      </div>
    </div>
  );
}
