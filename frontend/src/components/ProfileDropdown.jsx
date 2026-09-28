import React, { useEffect, useRef, useState } from "react";
import {
  UserRound,
  Info,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* ===================================================== */
  /* CLOSE WHEN CLICKING OUTSIDE                           */
  /* ===================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ===================================================== */
  /* CLOSE WITH ESC                                        */
  /* ===================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* ================================================= */}
      {/* AVATAR BUTTON                                     */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className="
          group
          flex
          items-center
          gap-2

          rounded-lg

          py-1.5
          pl-1.5
          pr-1

          transition-colors
          duration-150

          hover:bg-slate-800/50

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500/30
        "
      >
        {/* Avatar */}

        <div
          className="
            relative
            h-9
            w-9
            shrink-0
            rounded-full

            sm:h-10
            sm:w-10
          "
        >
          {/* Avatar glow */}

          <div
            className="
              absolute
              -inset-1.5

              rounded-full

              bg-blue-500/15

              opacity-80
              blur-md

              transition-opacity
              duration-200

              group-hover:opacity-100
            "
          />

          {/* Avatar */}

          <div
            className="
              relative
              h-9
              w-9
              overflow-hidden

              rounded-full

              bg-slate-900

              shadow-[0_0_14px_rgba(59,130,246,0.16)]

              transition-shadow
              duration-200

              group-hover:shadow-[0_0_22px_rgba(59,130,246,0.28)]

              sm:h-10
              sm:w-10
            "
          >
            <img
              src="/images/developer-avatar.svg"
              alt="Gyaneshwar"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>
        </div>

        {/* Name — desktop/tablet */}

        <span
          className="
            hidden

            text-sm
            font-semibold
            tracking-tight
            text-slate-200

            md:block
          "
        >
          Gyaneshwar
        </span>

        {/* Chevron */}

        <ChevronDown
          size={15}
          strokeWidth={1.8}
          className={`
            hidden

            text-slate-500

            transition-transform
            duration-150

            md:block

            ${open ? "rotate-180 text-blue-400" : ""}
          `}
        />
      </button>

      {/* ================================================= */}
      {/* DROPDOWN                                         */}
      {/* ================================================= */}

      {open && (
        <div
          role="menu"
          className="
            absolute
            right-0
            top-[calc(100%+8px)]

            z-50

            w-44

            overflow-hidden

            rounded-xl

            border
            border-slate-700/80

            bg-slate-900

            shadow-xl
            shadow-black/30

            backdrop-blur-xl
          "
        >
          {/* My Profile */}

          <Link
            to="/workbench/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              gap-3

              px-3.5
              py-2.5

              text-sm
              font-medium
              text-slate-300

              transition-colors
              duration-150

              hover:bg-slate-800
              hover:text-white
            "
          >
            <UserRound
              size={16}
              strokeWidth={1.8}
              className="
                text-slate-400
                transition-colors
                group-hover:text-blue-400
              "
            />

            <span>My Profile</span>
          </Link>

          {/* Divider */}

          <div className="mx-3 border-t border-slate-800" />

          {/* About Workbench */}

          <Link
            to="/workbench/about"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              gap-3

              px-3.5
              py-2.5

              text-sm
              font-medium
              text-slate-300

              transition-colors
              duration-150

              hover:bg-slate-800
              hover:text-white
            "
          >
            <Info
              size={16}
              strokeWidth={1.8}
              className="text-slate-400"
            />

            <span>About Workbench</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;