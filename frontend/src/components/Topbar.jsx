import {
  User,
  Bell,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        bg-slate-900/90
        px-8
        py-5
        backdrop-blur
      "
    >
      {/* Left */}

      <div>

        <h2 className="text-xl font-semibold text-white">
          Data Engineering Workbench
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Modern Data Platform
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Notification */}

        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            text-slate-300
            transition-all
            hover:border-blue-500
            hover:text-white
          "
        >
          <Bell size={18} />
        </button>

        {/* Profile */}

        <Link
          to="/workbench/profile"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-4
            py-2.5
            transition-all
            hover:border-blue-500
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-sm
              font-semibold
              text-white
            "
          >
            GS
          </div>

          <div className="hidden md:block">

            <p className="text-sm font-medium text-white">
              My Profile
            </p>

            <p className="text-xs text-slate-400">
              Data Engineer
            </p>

          </div>

          <User
            size={16}
            className="text-slate-400"
          />

        </Link>

      </div>

    </div>
  );
}