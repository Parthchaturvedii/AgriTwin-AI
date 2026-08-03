function WeatherAlerts() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold text-red-600">
        ⚠ Weather Alerts
      </h2>

      <div className="space-y-4">

        <div className="rounded-xl border-l-4 border-yellow-500 bg-yellow-100 p-4">

          <h3 className="font-bold">
            Moderate Rain Expected
          </h3>

          <p className="text-sm text-gray-600">
            Rain is expected tomorrow afternoon.
          </p>

        </div>

        <div className="rounded-xl border-l-4 border-blue-500 bg-blue-100 p-4">

          <h3 className="font-bold">
            High Humidity
          </h3>

          <p className="text-sm text-gray-600">
            Disease risk may increase in wheat crops.
          </p>

        </div>

      </div>

    </div>
  );
}

export default WeatherAlerts;