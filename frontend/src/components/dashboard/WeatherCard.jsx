import {
  CloudSun,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

function WeatherCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <CloudSun
            size={34}
            className="text-yellow-500"
          />

          <div>

            <h2 className="text-xl font-bold">
              Weather Intelligence
            </h2>

            <p className="text-sm text-gray-500">
              AI Weather & Price Correlation
            </p>

          </div>

        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          Live
        </span>

      </div>

      {/* Weather Cards */}

      <div className="grid grid-cols-2 gap-4 mt-7">

        <div className="bg-slate-50 rounded-xl p-4">

          <div className="flex items-center gap-2">
            <Thermometer className="text-red-500" />
            <span>Temperature</span>
          </div>

          <h2 className="text-3xl font-bold mt-2">
            31°C
          </h2>

        </div>

        <div className="bg-slate-50 rounded-xl p-4">

          <div className="flex items-center gap-2">
            <Droplets className="text-blue-500" />
            <span>Humidity</span>
          </div>

          <h2 className="text-3xl font-bold mt-2">
            62%
          </h2>

        </div>

        <div className="bg-slate-50 rounded-xl p-4">

          <div className="flex items-center gap-2">
            <CloudRain className="text-blue-600" />
            <span>Rain Chance</span>
          </div>

          <h2 className="text-3xl font-bold mt-2">
            70%
          </h2>

        </div>

        <div className="bg-slate-50 rounded-xl p-4">

          <div className="flex items-center gap-2">
            <Wind className="text-cyan-600" />
            <span>Wind Speed</span>
          </div>

          <h2 className="text-3xl font-bold mt-2">
            12 km/h
          </h2>

        </div>

      </div>

      {/* Weather Timeline */}

      <div className="mt-6">

        <h3 className="font-bold mb-3">
          Next 5 Days Forecast
        </h3>

        <div className="grid grid-cols-5 gap-2 text-center">

          {[
            ["Mon","☀️","31°"],
            ["Tue","🌤","30°"],
            ["Wed","🌦","29°"],
            ["Thu","🌧","28°"],
            ["Fri","☀️","30°"],
          ].map((day,index)=>(
            <div
              key={index}
              className="rounded-xl bg-slate-50 p-3"
            >
              <p className="font-semibold">{day[0]}</p>

              <p className="text-2xl my-2">
                {day[1]}
              </p>

              <p>{day[2]}</p>
            </div>
          ))}

        </div>

      </div>

      {/* AI Analysis */}

      <div className="mt-7 rounded-xl border border-green-300 bg-gradient-to-r from-green-50 to-emerald-100 p-5">

        <div className="flex items-center gap-3">

          <TrendingUp
            className="text-green-700"
            size={28}
          />

          <div>

            <h3 className="font-bold text-green-700">
              AI Weather Analysis
            </h3>

            <p className="text-gray-700 mt-1">
              Expected rainfall over the next few days
              may reduce fresh arrivals in nearby mandis,
              increasing wheat prices by nearly
              <strong> 13%</strong>.
            </p>

          </div>

        </div>

      </div>

      {/* Risk */}

      <div className="mt-5 rounded-xl bg-yellow-50 border border-yellow-300 p-4">

        <div className="flex items-center gap-3">

          <AlertTriangle
            className="text-yellow-600"
            size={24}
          />

          <div>

            <h3 className="font-semibold">
              Market Risk
            </h3>

            <p className="text-gray-700 text-sm mt-1">
              Selling today may reduce your expected
              earnings by nearly
              <strong> ₹18,500</strong>.
            </p>

          </div>

        </div>

      </div>

      {/* Final Recommendation */}

      <div className="mt-5 bg-green-600 text-white rounded-xl p-5">

        <h3 className="text-lg font-bold">
          🤖 Final Recommendation
        </h3>

        <p className="mt-2 leading-7">
          Hold your wheat for another
          <strong> 5 days</strong>.
          Weather conditions, lower market arrivals,
          and historical pricing trends indicate
          a higher selling price at the nearby mandi.
        </p>

      </div>

    </div>
  );
}

export default WeatherCard;