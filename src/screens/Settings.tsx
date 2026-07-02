import { useState } from "react";
import TopBar from "../pages/commons/TopBar";
import ProfileForm from "../pages/settings/components/ProfileForm";
import NotificationsCard from "../pages/settings/components/NotificationsCard";
import SecurityCard from "../pages/settings/components/SecurityCard";
import RegionCard from "../pages/settings/components/RegionCard";
import DangerZoneCard from "../pages/settings/components/DangerZoneCard";
import type { AuthUser } from "../types";

interface SettingsProps {
  user: AuthUser;
}

export default function Settings({ user }: SettingsProps) {
  const [saved, setSaved] = useState(false);
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifWeekly, setNotifWeekly] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 overflow-auto">
      <TopBar
        title="Configurações"
        subtitle="Preferências da conta e do sistema"
      />
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <ProfileForm
          user={user}
          profileName={profileName}
          setProfileName={setProfileName}
          profileEmail={profileEmail}
          setProfileEmail={setProfileEmail}
          saved={saved}
          onSubmit={handleSave}
        />

        <div className="space-y-6">
          <NotificationsCard
            notifEmail={notifEmail}
            setNotifEmail={setNotifEmail}
            notifPush={notifPush}
            setNotifPush={setNotifPush}
            notifWeekly={notifWeekly}
            setNotifWeekly={setNotifWeekly}
          />
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
