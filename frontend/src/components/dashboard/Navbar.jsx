import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  UserCircle,
  LogOut,
  MessageCircle,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  /*
  =====================================================
  USER
  =====================================================
  */

  const getStoredUser = () => {
    try {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error(
        "Unable to read stored user:",
        error
      );

      return null;
    }
  };

  const user = getStoredUser() || {
    fullName: "Guest",
    role: "User",
  };

  /*
  =====================================================
  DATE
  =====================================================
  */

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  /*
  =====================================================
  GREETING
  =====================================================
  */

  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  /*
  =====================================================
  OPEN INBOX
  =====================================================
  */

  const handleInbox = () => {
    navigate("/inbox");
  };

  /*
  =====================================================
  LOGOUT
  =====================================================
  */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  /*
  =====================================================
  UI
  =====================================================
  */

  return (
    <div className="flex items-center justify-between w-full">
      {/* =================================================
          LEFT
      ================================================= */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {greeting}, {user.fullName} 👋
        </h1>

        <p className="mt-1 text-gray-500">
          {today}
        </p>
      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="flex items-center gap-4">
        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="hidden w-72 items-center rounded-xl bg-slate-100 px-4 py-2 md:flex">
          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-full bg-transparent outline-none"
          />
        </div>

        {/* =================================================
            CHAT / INBOX
        ================================================= */}

        <button
          type="button"
          onClick={handleInbox}
          title="Open Inbox"
          aria-label="Open Inbox"
          className="relative rounded-full bg-slate-100 p-3 transition hover:bg-green-100 hover:text-green-700"
        >
          <MessageCircle size={21} />
        </button>

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowNotifications(
                (previous) => !previous
              )
            }
            title="Notifications"
            aria-label="Notifications"
            className="relative rounded-full bg-slate-100 p-3 transition hover:bg-green-100"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-50 mt-3 w-72 rounded-xl border bg-white p-4 shadow-xl">
              <h3 className="mb-3 font-bold">
                Notifications
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  🌱 Crop health is normal.
                </p>

                <p>
                  💧 Soil moisture is optimal.
                </p>

                <p>
                  🌦 Weather forecast updated.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="hidden items-center gap-3 md:flex">
          <UserCircle
            size={44}
            className="text-green-600"
          />

          <div>
            <h3 className="font-bold">
              {user.fullName}
            </h3>

            <p className="text-sm capitalize text-gray-500">
              {user.role}
            </p>
          </div>
        </div>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />

          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;