import { UserCircle2, MapPin } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col items-center text-center">

      {/* Avatar */}

      <div
        className="
          h-20
          w-20
          rounded-full

          bg-gradient-to-br
          from-blue-500
          to-cyan-500

          flex
          items-center
          justify-center

          shadow-lg
        "
      >
        <UserCircle2
          size={52}
          className="text-white"
        />
      </div>

      {/* Name */}

      <h2 className="mt-5 text-xl font-bold text-white">
        Gyaneshwar
      </h2>

      {/* Role */}

      <p className="mt-1 text-blue-400 font-medium">
        Data Engineer
      </p>

      {/* Location */}

      <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">

        <MapPin size={15} />

        Hyderabad, India

      </div>

    </div>
  );
}