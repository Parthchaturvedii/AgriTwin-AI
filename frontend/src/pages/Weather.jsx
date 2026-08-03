import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import WeatherOverview from "../components/weather/WeatherOverview";
import TodayWeather from "../components/weather/TodayWeather";
import Forecast from "../components/weather/Forecast";
import AirQuality from "../components/weather/AirQuality";
import FarmingAdvice from "../components/weather/FarmingAdvice";
import WeatherAlerts from "../components/weather/WeatherAlerts";

function Weather() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-white dark:bg-slate-800 p-3 shadow-lg transition hover:scale-105"
            >
              <ChevronLeft
                size={24}
                className="text-slate-700 dark:text-white"
              />
            </button>

            <div>

              <h1 className="text-4xl font-bold text-green-700 dark:text-green-400">
                🌦 Weather Intelligence
              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Live weather insights for smarter farming decisions.
              </p>

            </div>

          </div>

        </div>

        {/* Overview */}

        <WeatherOverview />

        {/* Main Grid */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">

            <TodayWeather />

            <Forecast />

          </div>

          <div className="space-y-6">

            <AirQuality />

            <WeatherAlerts />

            <FarmingAdvice />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Weather;