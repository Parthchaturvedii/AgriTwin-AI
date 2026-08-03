import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
} from "lucide-react";

import FarmStats from "../components/digitalTwin/FarmStats";
import FarmMap from "../components/digitalTwin/FarmMap";
import SensorPanel from "../components/digitalTwin/SensorPanel";
import WeatherPanel from "../components/digitalTwin/WeatherPanel";
import WaterTank from "../components/digitalTwin/WaterTank";
import StorageCard from "../components/digitalTwin/StorageCard";
import RecommendationCard from "../components/digitalTwin/RecommendationCard";

function DigitalTwin() {
  const navigate = useNavigate();

  const [selectedPlot, setSelectedPlot] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      <div className="mx-auto max-w-7xl p-8">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

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

                <Cpu size={38} />

                AgriTwin Digital Twin

              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Monitor every part of your smart farm in real time using AI.
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <FarmStats />

        {/* Main Layout */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Interactive Farm Map */}

          <div className="lg:col-span-2">

            <FarmMap
              selectedPlot={selectedPlot}
              setSelectedPlot={setSelectedPlot}
            />

          </div>

          {/* Right Panel */}

          <div className="space-y-6">

            <WeatherPanel />

            <SensorPanel />

            <WaterTank />

            <StorageCard />

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-6">

          <RecommendationCard
            selectedPlot={selectedPlot}
          />

        </div>

      </div>

    </div>
  );
}

export default DigitalTwin;