import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import UsageOverview from "../components/wellbeing/UsageOverview";
import WeeklyUsageChart from "../components/wellbeing/WeeklyUsageChart";
import ModuleUsage from "../components/wellbeing/ModuleUsage";
import ProductivityScore from "../components/wellbeing/ProductivityScore";
import SmartReminder from "../components/wellbeing/SmartReminder";
import ActivityHeatmap from "../components/wellbeing/ActivityHeatmap";
import AISuggestions from "../components/wellbeing/AISuggestions";

function DigitalWellbeing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex items-center gap-4">

          <button
            onClick={() => navigate("/settings")}
            className="rounded-xl bg-white p-3 shadow"
          >
            <ChevronLeft />
          </button>

          <div>

            <h1 className="text-4xl font-bold text-green-700">
              📊 Digital Wellbeing
            </h1>

            <p className="text-gray-500 mt-2">
              Monitor your weekly productivity and platform usage.
            </p>

          </div>

        </div>

        <UsageOverview />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          <div className="lg:col-span-2 space-y-6">

            <WeeklyUsageChart />

            <ActivityHeatmap />

          </div>

          <div className="space-y-6">

            <ProductivityScore />

            <SmartReminder />

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          <ModuleUsage />

          <AISuggestions />

        </div>

      </div>
    </div>
  );
}

export default DigitalWellbeing;