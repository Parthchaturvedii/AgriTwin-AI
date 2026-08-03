import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
 ReferenceLine,
} from "recharts";

const data = [
  {
    day: "Today",
    actual: 2450,
    predicted: 2450,
  },
  {
    day: "Day 2",
    actual: 2480,
    predicted: 2520,
  },
  {
    day: "Day 3",
    actual: 2500,
    predicted: 2600,
  },
  {
    day: "Day 4",
    actual: 2525,
    predicted: 2690,
  },
  {
    day: "Day 5",
    actual: 2540,
    predicted: 2780,
  },
];

function YieldChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            📈 AI Crop Price Forecast
          </h2>

          <p className="text-gray-500">
            Compare today's market price with AI predicted selling opportunity.
          </p>
        </div>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          AI Confidence • 94%
        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip
            formatter={(value) => [`₹${value} / Qtl`, ""]}
            labelStyle={{ fontWeight: "bold" }}
          />

          <Legend />

          <ReferenceLine
            x="Day 5"
            stroke="#16a34a"
            strokeDasharray="5 5"
            label="Best Sell Day"
          />

          <Line
            type="monotone"
            dataKey="actual"
            name="Current Market Price"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="predicted"
            name="AI Predicted Price"
            stroke="#16a34a"
            strokeWidth={4}
            dot={{ r: 6 }}
            activeDot={{ r: 9 }}
          />

        </LineChart>
      </ResponsiveContainer>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-4 gap-4 mt-6">

        <div className="bg-red-50 rounded-xl p-5 border border-red-100">
          <p className="text-gray-500">Current Price</p>
          <h2 className="text-3xl font-bold text-red-600">
            ₹2450
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Per Quintal
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
          <p className="text-gray-500">Predicted Price</p>
          <h2 className="text-3xl font-bold text-green-700">
            ₹2780
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            After 5 Days
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <p className="text-gray-500">Expected Growth</p>
          <h2 className="text-3xl font-bold text-blue-700">
            +13.5%
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Price Increase
          </p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
          <p className="text-gray-500">Best Sell Day</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            Day 5
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            AI Recommended
          </p>
        </div>

      </div>

      {/* AI Summary */}

      <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">

        <h3 className="font-bold text-green-700 mb-3">
          🤖 AI Prediction Summary
        </h3>

        <p className="text-gray-700 leading-7">
          Our AI analysed historical mandi prices, seasonal demand,
          weather forecasts and crop availability.
          The model predicts wheat prices may increase from
          <strong> ₹2450/Qtl </strong>
          to approximately
          <strong> ₹2780/Qtl </strong>
          within the next
          <strong> 5 days</strong>.
          Holding the crop instead of selling today could generate an
          estimated additional profit of
          <strong> ₹18,500</strong>
          while maintaining
          <strong> 94% prediction confidence</strong>.
        </p>

      </div>

      {/* Final Recommendation */}

      <div className="mt-5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5">

        <h2 className="text-xl font-bold">
          ✔ AI Recommendation
        </h2>

        <p className="mt-3 leading-7">
          Hold your crop for another
          <strong> 5 days</strong>.
          Expected selling price:
          <strong> ₹2780/Qtl</strong>.
          Estimated extra profit:
          <strong> ₹18,500</strong>.
        </p>

      </div>

    </div>
  );
}

export default YieldChart;