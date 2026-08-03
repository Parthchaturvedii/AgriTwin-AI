import {
  Sprout,
  Droplets,
  Thermometer,
  Wheat,
  Activity,
  Tractor,
} from "lucide-react";

function FarmStats() {
  const stats = [
    {
      title: "Farm Health",
      value: "95%",
      icon: <Activity size={28} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Active Crops",
      value: "6",
      icon: <Sprout size={28} />,
      color: "from-lime-500 to-green-600",
    },
    {
      title: "Soil Moisture",
      value: "68%",
      icon: <Droplets size={28} />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Temperature",
      value: "29°C",
      icon: <Thermometer size={28} />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Estimated Yield",
      value: "18.5 T",
      icon: <Wheat size={28} />,
      color: "from-yellow-500 to-amber-600",
    },
    {
      title: "Irrigation",
      value: "Active",
      icon: <Tractor size={28} />,
      color: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`bg-gradient-to-r ${item.color} rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">
                {item.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {item.value}
              </h2>
            </div>

            <div className="rounded-full bg-white/20 p-4">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FarmStats;