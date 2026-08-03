import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sprout,
  Map,
  Bot,
  CloudSun,
  Leaf,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Farms",
      path: "/farms",
      icon: <Sprout size={20} />,
    },
    {
      name: "Digital Twin",
      path: "/digital-twin",
      icon: <Map size={20} />,
    },
    {
      name: "AI Advisor",
      path: "/ai",
      icon: <Bot size={20} />,
    },
    {
      name: "Weather",
      path: "/weather",
      icon: <CloudSun size={20} />,
    },
    {
      name: "Disease Detection",
      path: "/disease",
      icon: <Leaf size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  const handleDashboardClick = (e) => {
    // Already on dashboard → just toggle sidebar
    if (location.pathname === "/dashboard") {
      e.preventDefault();
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <>
      {/* Show button when sidebar is hidden */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-5 z-[60] rounded-xl bg-green-600 p-3 text-white shadow-xl transition hover:bg-green-700"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72
        border-r border-gray-200
        bg-white dark:bg-slate-900
        shadow-xl
        transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-slate-700">

          <div>
            <h1 className="text-3xl font-bold text-green-600">
              🌱 AgriTwin AI
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Smart Farming Dashboard
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <ChevronLeft size={20} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={
                item.path === "/dashboard"
                  ? handleDashboardClick
                  : undefined
              }
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700 dark:text-gray-200 dark:hover:bg-slate-700"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-5 dark:border-slate-700">

          <div className="rounded-xl bg-green-50 p-4 dark:bg-slate-800">

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Logged in as
            </p>

            <h3 className="mt-1 font-semibold text-green-700">
              Parth
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Smart Farmer Dashboard
            </p>

          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;