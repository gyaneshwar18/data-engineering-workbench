import ProfileHeader from "./dashboard/ProfileHeader";
import ProfileStats from "./dashboard/ProfileStats";
import TechStack from "./dashboard/TechStack";
import ProfileActions from "./dashboard/ProfileActions";

export default function ProfileSnapshotCard() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90

        p-6

        space-y-8
      "
    >
      {/* Header */}

      <ProfileHeader />

      <div className="border-t border-slate-800" />

      {/* Statistics */}

      <ProfileStats />

      <div className="border-t border-slate-800" />

      {/* Tech Stack */}

      <TechStack />

      <div className="border-t border-slate-800" />

      {/* Quick Links */}

      <ProfileActions />
    </div>
  );
}