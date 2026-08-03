import {
  MapPinned,
  Sprout,
  Droplets,
  Tractor,
} from "lucide-react";

function FarmOverview() {
  const cards = [
    {
      title: "Total Farms",
      value: "4",
      icon: <MapPinned size={28} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Active Crops",
      value: "9",
      icon: <Sprout size={28} />,
      color: "from-lime-500 to-green-600",
    },
    {
      title: "Water Sources",
      value: "3",
      icon: <Droplets size={28} />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Machinery",
      value: "5",
      icon: <Tractor size={28} />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">

            <div>
              <p>{card.title}</p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.value}
              </h2>
            </div>

            {card.icon}

          </div>
        </div>
      ))}

    </div>
  );
}

export default FarmOverview;