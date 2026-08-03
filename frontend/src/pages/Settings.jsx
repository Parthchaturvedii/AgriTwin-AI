import { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  User,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [showWellbeing, setShowWellbeing] = useState(false);

  const [profile, setProfile] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });

  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profilePhoto") || ""
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const changeName = () => {
    const newName = prompt(
      "Enter your new display name",
      profile.fullName || ""
    );

    if (!newName) return;

    const updated = {
      ...profile,
      fullName: newName,
    };

    setProfile(updated);
    localStorage.setItem("user", JSON.stringify(updated));

    alert("Name updated successfully.");
  };

  const uploadPhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      localStorage.setItem("profilePhoto", reader.result);
      setProfilePhoto(reader.result);

      alert("Profile photo updated.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-white dark:bg-slate-800 p-3 shadow"
            >
              <ChevronLeft size={24} />
            </button>

            <div>

              <h1 className="text-4xl font-bold text-green-700">
                ⚙ Settings
              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Manage your account and application preferences
              </p>

            </div>

          </div>

          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="h-16 w-16 rounded-full border-4 border-green-500 object-cover"
            />
          )}

        </div>

        <div className="space-y-5">

          {/* Change Name */}

          <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-6 shadow">

            <div className="flex items-center gap-4">

              <User
                className="text-green-600"
                size={30}
              />

              <div>

                <h2 className="text-xl font-bold dark:text-white">
                  Change Name
                </h2>

                <p className="text-gray-500">
                  {profile.fullName || "Update your display name"}
                </p>

              </div>

            </div>

            <button
              onClick={changeName}
              className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
            >
              Edit
            </button>

          </div>

          {/* Profile Photo */}

          <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-6 shadow">

            <div className="flex items-center gap-4">

              <Camera
                className="text-blue-600"
                size={30}
              />

              <div>

                <h2 className="text-xl font-bold dark:text-white">
                  Add Profile Photo
                </h2>

                <p className="text-gray-500">
                  Upload your profile picture
                </p>

              </div>

            </div>

            <>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={uploadPhoto}
              />

              <button
                onClick={() => fileInputRef.current.click()}
                className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Upload
              </button>

            </>

          </div>

          {/* Dark Mode */}

          <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-6 shadow">

            <div className="flex items-center gap-4">

              {darkMode ? (
                <Moon
                  className="text-indigo-600"
                  size={30}
                />
              ) : (
                <Sun
                  className="text-yellow-500"
                  size={30}
                />
              )}

              <div>

                <h2 className="text-xl font-bold dark:text-white">
                  Dark Mode
                </h2>

                <p className="text-gray-500">
                  Switch between Light and Dark theme
                </p>

              </div>

            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-xl px-6 py-2 text-white ${
                darkMode
                  ? "bg-green-600"
                  : "bg-gray-500"
              }`}
            >
              {darkMode ? "ON" : "OFF"}
            </button>

          </div>

          {/* Digital Wellbeing */}

          <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-6 shadow">

            <div className="flex items-center gap-4">

              <ShieldCheck
                className="text-purple-600"
                size={30}
              />

              <div>

                <h2 className="text-xl font-bold dark:text-white">
                  Digital Wellbeing
                </h2>

                <p className="text-gray-500">
                  Notifications, reminders and app usage
                </p>

              </div>

            </div>

            <button
              onClick={() => setShowWellbeing(true)}
              className="rounded-xl bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
            >
              Open
            </button>

          </div>

          {/* Logout */}

          <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-6 shadow">

            <div className="flex items-center gap-4">

              <LogOut
                className="text-red-600"
                size={30}
              />

              <div>

                <h2 className="text-xl font-bold text-red-600">
                  Logout
                </h2>

                <p className="text-gray-500">
                  Sign out from your account
                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Digital Wellbeing Modal */}

        {showWellbeing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-3xl bg-white p-8">

              <h2 className="mb-6 text-2xl font-bold">
                Digital Wellbeing
              </h2>

              <div className="space-y-5">

                <label className="flex justify-between">
                  Daily Notifications
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="flex justify-between">
                  AI Farming Tips
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="flex justify-between">
                  Weather Alerts
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="flex justify-between">
                  Weekly Report
                  <input type="checkbox" />
                </label>

              </div>

              <button
                onClick={() => setShowWellbeing(false)}
                className="mt-8 w-full rounded-xl bg-green-600 py-3 text-white"
              >
                Save
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Settings;