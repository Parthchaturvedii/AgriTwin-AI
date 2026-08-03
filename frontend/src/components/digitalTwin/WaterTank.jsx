import {
  Droplets,
  Gauge,
} from "lucide-react";

function WaterTank() {

  const waterLevel = 82;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="mb-5 flex items-center gap-3">

        <Droplets
          size={32}
          className="text-blue-600"
        />

        <div>
          <h2 className="text-xl font-bold text-green-700">
            Water Tank
          </h2>

          <p className="text-sm text-gray-500">
            Smart Irrigation System
          </p>
        </div>

      </div>


      {/* Tank Visualization */}
      <div className="flex justify-center">

        <div className="relative h-40 w-24 overflow-hidden rounded-b-3xl rounded-t-xl border-4 border-blue-400 bg-blue-50">

          <div
            className="absolute bottom-0 w-full bg-blue-500 transition-all"
            style={{
              height: `${waterLevel}%`,
            }}
          />

        </div>

      </div>


      <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-50 p-4">

        <div className="flex items-center gap-2">

          <Gauge
            className="text-blue-600"
          />

          <span>
            Tank Level
          </span>

        </div>


        <span className="text-xl font-bold text-blue-700">
          {waterLevel}%
        </span>

      </div>


      <p className="mt-4 text-center text-sm text-gray-500">
        Automatic irrigation available
      </p>


    </div>
  );
}

export default WaterTank;