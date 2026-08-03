import { useEffect, useState } from "react";
import {
  Brain,
  IndianRupee,
  CalendarDays,
  Warehouse,
  TrendingUp,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import api from "../../services/api";

function AIDecisionCard() {
  const [decision, setDecision] = useState(null);
  const [profit, setProfit] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPrediction = JSON.parse(
          localStorage.getItem("cropPrediction") || "null"
        );

        setPrediction(storedPrediction);

        // Weather
        try {
          const weatherRes = await api.get("/weather", {
            params: {
              lat: 26.78,
              lon: 79.02,
            },
          });

          setWeather(weatherRes.data.weather);
        } catch (err) {
          console.error("Weather Error:", err);
        }

        // AI Decision
        try {
          const decisionRes = await api.post("/ai/market-decision", {
            crop: storedPrediction?.crop || "Wheat",
            predictedPrice: storedPrediction?.predictedPrice || 2500,
            weather: weather?.condition || "Sunny",
            farmHealth: 95,
          });

          if (decisionRes.data.success) {
            setDecision(decisionRes.data);
          }
        } catch (err) {
          console.error("Decision Error:", err);
        }

        // Profit
        try {
          const profitRes = await api.post("/profit/calculate", {
            currentPrice: 2450,
            predictedPrice: storedPrediction?.predictedPrice || 2500,
            quantity: 145,
          });

          if (profitRes.data.success) {
            setProfit(profitRes.data);
          }
        } catch (err) {
          console.error("Profit Error:", err);
        }
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-3xl p-8">
        <h2 className="text-2xl font-bold">
          🤖 AI Decision Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-3xl shadow-xl p-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <Brain size={34} />
            <h2 className="text-3xl font-bold">
              AI Final Decision
            </h2>
          </div>

          <p className="mt-2 text-green-100">
            {decision?.reason ||
              "Market conditions analysed successfully."}
          </p>
        </div>

        <div className="bg-white text-green-700 px-5 py-3 rounded-2xl font-bold text-xl">
          {decision?.decision || "HOLD"}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5 mt-8">

        <div className="bg-white/10 rounded-xl p-5">
          <IndianRupee size={28} />
          <p className="mt-3 text-green-100">
            Today's Price
          </p>
          <h2 className="text-3xl font-bold">
            ₹2450
          </h2>
        </div>

        <div className="bg-white/10 rounded-xl p-5">
          <TrendingUp size={28} />
          <p className="mt-3 text-green-100">
            Predicted Price
          </p>
          <h2 className="text-3xl font-bold">
            ₹{prediction?.predictedPrice || 2500}
          </h2>
        </div>

        <div className="bg-white/10 rounded-xl p-5">
          <Warehouse size={28} />
          <p className="mt-3 text-green-100">
            Stored Crop
          </p>
          <h2 className="text-3xl font-bold">
            145 Qtl
          </h2>
        </div>

        <div className="bg-white/10 rounded-xl p-5">
          <CalendarDays size={28} />
          <p className="mt-3 text-green-100">
            Wait Time
          </p>
          <h2 className="text-3xl font-bold">
            5 Days
          </h2>
        </div>

      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-2xl text-gray-700 p-6">
          <div className="flex gap-3 items-center">
            <MapPin className="text-green-600" />
            <h3 className="font-bold text-xl">
              Best Market
            </h3>
          </div>

          <p className="mt-3">
            Etawah Mandi
          </p>

          <p className="text-green-700 font-bold mt-2">
            Highest Predicted Price
          </p>

          <p className="mt-2">
            🌦 {weather?.condition || "Sunny"}
          </p>
        </div>

        <div className="bg-white rounded-2xl text-gray-700 p-6">
          <div className="flex gap-3 items-center">
            <CheckCircle2 className="text-green-600" />
            <h3 className="font-bold text-xl">
              Expected Extra Profit
            </h3>
          </div>

          <h1 className="text-5xl font-bold text-green-700 mt-4">
            +₹
            {profit?.extraProfit?.toLocaleString("en-IN") || "0"}
          </h1>

          <p className="mt-3">
            Compared with selling today.
          </p>
        </div>

      </div>

    </div>
  );
}

export default AIDecisionCard;