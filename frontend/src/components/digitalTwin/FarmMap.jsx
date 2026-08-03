import { useState } from "react";

import {
  Droplets,
  Thermometer,
  Heart,
  Warehouse,
  Trees,
  Tractor,
  MapPin,
} from "lucide-react";

function FarmMap({
  selectedPlot,
  setSelectedPlot,
}) {

  const plots = [

    {
      id: "A",
      crop: "Wheat",
      health: 95,
      moisture: 68,
      temp: 29,
      color: "bg-green-500",
    },

    {
      id: "B",
      crop: "Rice",
      health: 88,
      moisture: 61,
      temp: 30,
      color: "bg-yellow-500",
    },

    {
      id: "C",
      crop: "Maize",
      health: 97,
      moisture: 73,
      temp: 28,
      color: "bg-green-600",
    },

    {
      id: "D",
      crop: "Tomato",
      health: 76,
      moisture: 49,
      temp: 31,
      color: "bg-orange-500",
    },

  ];

  const [active, setActive] = useState(
    plots[0]
  );

  const handleClick = (plot) => {
    setActive(plot);

    if (setSelectedPlot) {
      setSelectedPlot(plot);
    }
  };

  return (

    <div className="rounded-3xl bg-white p-6 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-green-700">
            🌱 Farm Digital Twin
          </h2>

          <p className="text-gray-500">
            Click any plot to inspect live farm conditions
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2">

          <MapPin
            size={18}
            className="text-green-700"
          />

          <span className="font-semibold text-green-700">
            Etawah Farm
          </span>

        </div>

      </div>

      {/* Farm Layout */}

      <div className="grid grid-cols-2 gap-5">

        {plots.map((plot) => (

          <div

            key={plot.id}

            onClick={() => handleClick(plot)}

            className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300

            ${
              active.id === plot.id
                ? "border-green-600 bg-green-100 shadow-2xl scale-105"
                : "border-green-100 bg-green-50 hover:border-green-500 hover:shadow-xl"
            }`}

          >

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-bold">
                Plot {plot.id}
              </h3>

              <div
                className={`h-4 w-4 rounded-full ${plot.color}`}
              />

            </div>

            <p className="mt-3 text-lg font-semibold text-green-700">
              🌾 {plot.crop}
            </p>

            <div className="mt-5 space-y-3">

              <div className="flex items-center gap-2">

                <Heart
                  size={18}
                  className="text-red-500"
                />

                Health

                <span className="ml-auto font-bold">
                  {plot.health}%
                </span>

              </div>

              <div className="flex items-center gap-2">

                <Droplets
                  size={18}
                  className="text-blue-500"
                />

                Moisture

                <span className="ml-auto font-bold">
                  {plot.moisture}%
                </span>

              </div>

              <div className="flex items-center gap-2">

                <Thermometer
                  size={18}
                  className="text-orange-500"
                />

                Temperature

                <span className="ml-auto font-bold">
                  {plot.temp}°C
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Grid */}

      <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">

        <div className="rounded-2xl bg-blue-100 p-5 shadow">

          <Droplets
            size={34}
            className="text-blue-600"
          />

          <h3 className="mt-3 font-bold">
            Water Tank
          </h3>

          <p>82%</p>

        </div>

        <div className="rounded-2xl bg-amber-100 p-5 shadow">

          <Warehouse
            size={34}
            className="text-amber-700"
          />

          <h3 className="mt-3 font-bold">
            Storage
          </h3>

          <p>145 Quintals</p>

        </div>

        <div className="rounded-2xl bg-green-100 p-5 shadow">

          <Trees
            size={34}
            className="text-green-700"
          />

          <h3 className="mt-3 font-bold">
            Tree Belt
          </h3>

          <p>Healthy</p>

        </div>

        <div className="rounded-2xl bg-gray-100 p-5 shadow">

          <Tractor
            size={34}
            className="text-gray-700"
          />

          <h3 className="mt-3 font-bold">
            Tractor
          </h3>

          <p>Available</p>

        </div>

      </div>

      {/* Selected Plot */}

      <div className="mt-8 rounded-2xl bg-green-50 p-6 border border-green-200">

        <h2 className="mb-4 text-2xl font-bold text-green-700">
          Selected Plot Details
        </h2>

        <div className="grid gap-4 md:grid-cols-4">

          <div>
            <p className="text-sm text-gray-500">Crop</p>
            <h3 className="text-xl font-bold">
              {active.crop}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Health</p>
            <h3 className="text-xl font-bold text-green-700">
              {active.health}%
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Moisture</p>
            <h3 className="text-xl font-bold text-blue-700">
              {active.moisture}%
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <h3 className="text-xl font-bold text-orange-600">
              {active.temp}°C
            </h3>
          </div>

        </div>

      </div>

    </div>

  );
}

export default FarmMap;