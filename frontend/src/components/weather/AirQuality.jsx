function AirQuality() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold text-green-700">
        🌿 Air Quality
      </h2>

      <div className="space-y-5">

        <div className="rounded-xl bg-green-100 p-4">
          <p className="text-gray-500">AQI</p>
          <h3 className="text-3xl font-bold text-green-700">
            42
          </h3>
          <p className="text-green-700">
            Good
          </p>
        </div>

        <div className="flex justify-between">
          <span>Visibility</span>
          <strong>10 km</strong>
        </div>

        <div className="flex justify-between">
          <span>UV Index</span>
          <strong>5</strong>
        </div>

        <div className="flex justify-between">
          <span>Feels Like</span>
          <strong>31°C</strong>
        </div>

      </div>

    </div>
  );
}

export default AirQuality;