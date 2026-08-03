import {
  Cpu,
  Droplets,
  Thermometer,
  Activity,
} from "lucide-react";

function SensorPanel() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-5 flex items-center gap-3">
        <Cpu
          size={30}
          className="text-green-600"
        />

        <div>
          <h2 className="text-xl font-bold text-green-700">
            IoT Sensors
          </h2>

          <p className="text-sm text-gray-500">
            Live Sensor Readings
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <div className="flex justify-between rounded-xl bg-blue-50 p-3">
          <div className="flex items-center gap-2">
            <Droplets className="text-blue-500" />
            Soil Moisture
          </div>

          <strong>68%</strong>
        </div>

        <div className="flex justify-between rounded-xl bg-orange-50 p-3">
          <div className="flex items-center gap-2">
            <Thermometer className="text-orange-500" />
            Soil Temp
          </div>

          <strong>27°C</strong>
        </div>

        <div className="flex justify-between rounded-xl bg-green-50 p-3">
          <div className="flex items-center gap-2">
            <Activity className="text-green-600" />
            Sensor Status
          </div>

          <strong className="text-green-600">
            Online
          </strong>
        </div>

      </div>
    </div>
  );
}

export default SensorPanel;