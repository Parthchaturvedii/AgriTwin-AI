import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
} from "lucide-react";

function WeatherPanel() {
  const weather = {
    condition: "Sunny",
    temperature: 29,
    humidity: 65,
    wind: 12,
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-5 flex items-center gap-3">
        <CloudSun
          size={30}
          className="text-yellow-500"
        />

        <div>
          <h2 className="text-xl font-bold text-green-700">
            Weather
          </h2>

          <p className="text-sm text-gray-500">
            Live Farm Conditions
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-3">
          <div className="flex items-center gap-2">
            <CloudSun className="text-yellow-500" />
            <span>Condition</span>
          </div>

          <span className="font-bold">
            {weather.condition}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-orange-50 p-3">
          <div className="flex items-center gap-2">
            <Thermometer className="text-orange-500" />
            <span>Temperature</span>
          </div>

          <span className="font-bold">
            {weather.temperature}°C
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-blue-50 p-3">
          <div className="flex items-center gap-2">
            <Droplets className="text-blue-500" />
            <span>Humidity</span>
          </div>

          <span className="font-bold">
            {weather.humidity}%
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-green-50 p-3">
          <div className="flex items-center gap-2">
            <Wind className="text-green-500" />
            <span>Wind</span>
          </div>

          <span className="font-bold">
            {weather.wind} km/h
          </span>
        </div>

      </div>
    </div>
  );
}

export default WeatherPanel;