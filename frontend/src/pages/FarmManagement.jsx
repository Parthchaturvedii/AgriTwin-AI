import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  ArrowLeft,
  Tractor,
} from "lucide-react";

import FarmOverview from "../components/farm/FarmOverview";
import FarmList from "../components/farm/FarmList";
import AddFarmModal from "../components/farm/AddFarmModal";

function FarmManagement() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      <div className="mx-auto max-w-7xl p-8">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-white dark:bg-slate-800 p-3 shadow-lg transition hover:scale-105"
            >
              <ArrowLeft
                size={24}
                className="text-slate-700 dark:text-white"
              />
            </button>

            <div>

              <h1 className="flex items-center gap-3 text-4xl font-bold text-green-700 dark:text-green-400">

                <Tractor size={40} />

                Farm Management

              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Manage all your farms from one intelligent dashboard.
              </p>

            </div>

          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
          >
            <Plus size={20} />
            Add Farm
          </button>

        </div>

        {/* Farm Overview */}

        <FarmOverview />

        {/* Farm List */}

        <div className="mt-6">

          <FarmList />

        </div>

        {/* Add Farm Modal */}

        <AddFarmModal
          open={open}
          onClose={() => setOpen(false)}
        />

      </div>

    </div>
  );
}

export default FarmManagement;