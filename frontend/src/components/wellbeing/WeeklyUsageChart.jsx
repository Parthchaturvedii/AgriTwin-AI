import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function WeeklyUsageChart() {
  const usage =
    JSON.parse(localStorage.getItem("usage")) || {};

  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const data = days.map((day) => ({
    day,
    hours: Number(
      ((usage[day]?.total || 0) / 3600).toFixed(2)
    ),
  }));

  return (
    <div className="rounded-3xl bg-white p-6 shadow dark:bg-slate-800">

      <h2 className="mb-6 text-2xl font-bold text-green-700 dark:text-green-400">
        📅 Weekly Usage
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              tick={{ fill: "#64748b" }}
            />

            <YAxis
              tick={{ fill: "#64748b" }}
              label={{
                value: "Hours",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />

            <Bar
              dataKey="hours"
              fill="#16a34a"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default WeeklyUsageChart;