import { useEffect, useState } from "react";
import api from "../../services/api";

function MiniDigitalTwin() {
  const [plots, setPlots] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const { data } = await api.get("/farms");

        if (data.success) {
          setPlots(data.farms);

          if (data.farms.length > 0) {
            setSelected(data.farms[0]);
          }
        }
      } catch (err) {
        console.error("Farm Fetch Error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load farm data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-700">
          🌳 Mini Digital Twin
        </h2>

        <p className="mt-5 text-gray-500">
          Loading farm data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-700">
          🌳 Mini Digital Twin
        </h2>

        <p className="mt-5 text-red-600 font-semibold">
          {error}
        </p>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-700">
          🌳 Mini Digital Twin
        </h2>

        <p className="mt-5 text-gray-500">
          No farms available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">
          🌳 Mini Digital Twin
        </h2>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          Live Simulation
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Stored Lots */}

        <div>

          <h3 className="font-semibold text-gray-600 mb-4">
            📦 Stored Crop Lots
          </h3>

          <div className="space-y-4">

            {plots.map((plot, index) => {

              const lots = [
                {
                  id: "LOT-101",
                  days: 2,
                  status: "Fresh",
                  color: "bg-green-500",
                },
                {
                  id: "LOT-102",
                  days: 5,
                  status: "Ready",
                  color: "bg-yellow-500",
                },
                {
                  id: "LOT-103",
                  days: 8,
                  status: "High Demand",
                  color: "bg-blue-600",
                },
                {
                  id: "LOT-104",
                  days: 12,
                  status: "Sell Soon",
                  color: "bg-red-500",
                },
              ];

              const lot = lots[index % lots.length];

              return (
                <button
                  key={plot._id}
                  onClick={() => setSelected(plot)}
                  className={`w-full rounded-xl border transition-all duration-300 p-4 text-left ${
                    selected?._id === plot._id
                      ? "border-green-700 bg-green-50 shadow-lg scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-green-500 hover:shadow"
                  }`}
                >
                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-bold text-gray-800">
                        {lot.id}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {plot.currentCrop}
                      </p>

                    </div>

                    <span
                      className={`${lot.color} text-white text-xs px-3 py-1 rounded-full`}
                    >
                      {lot.status}
                    </span>

                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    Storage Days :
                    <strong> {lot.days}</strong>
                  </div>

                </button>
              );
            })}

          </div>

        </div>

        {/* Market Details */}

        <div className="bg-slate-50 rounded-xl border p-6">

          <h3 className="text-xl font-bold mb-6">
            📍 {selected.farmName}
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>🌾 Crop</span>
              <strong>{selected.currentCrop}</strong>
            </div>

            <div className="flex justify-between">
              <span>📐 Area</span>
              <strong>
                {selected.area} {selected.areaUnit}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>📦 Estimated Stock</span>
              <strong>145 Quintals</strong>
            </div>

            <div className="flex justify-between">
              <span>💰 Current Price</span>
              <strong className="text-red-600">
                ₹2450 / Qtl
              </strong>
            </div>

            <div className="flex justify-between">
              <span>📈 Predicted Price</span>
              <strong className="text-green-700">
                ₹2780 / Qtl
              </strong>
            </div>

            <div className="flex justify-between">
              <span>⏳ Best Selling Time</span>
              <strong>After 5 Days</strong>
            </div>

            <div className="flex justify-between">
              <span>🟢 AI Decision</span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                HOLD
              </span>

            </div>

          </div>

          <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-50 border border-green-300 rounded-xl p-5">

            <h4 className="font-bold text-green-700 text-lg mb-3">
              🤖 AI Market Advisor
            </h4>

            <p className="text-gray-700 leading-7">
              Current mandi price for{" "}
              <strong>{selected.currentCrop}</strong> is{" "}
              <strong>₹2450 per Quintal</strong>.
            </p>

            <p className="text-gray-700 mt-2 leading-7">
              Based on historical market trends, weather forecasts and demand,
              our AI predicts the price may increase to{" "}
              <strong className="text-green-700">
                ₹2780 per Quintal
              </strong>{" "}
              within the next <strong>5 days</strong>.
            </p>

            <div className="mt-4 bg-white rounded-lg p-4 border">

              <p className="font-semibold text-green-700">
                ✔ Recommendation
              </p>

              <p className="text-gray-700 mt-2">
                Hold your crop for another
                <strong> 5 days</strong>.
                Expected additional profit:
                <strong className="text-green-700">
                  {" "}₹18,500
                </strong>.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MiniDigitalTwin;