import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
} from "lucide-react";

function FarmList() {
  const navigate = useNavigate();

  const farms = [
    {
      id: 1,
      name: "North Field",
      crop: "Wheat",
      area: "12 Acres",
      health: "95%",
    },
    {
      id: 2,
      name: "East Field",
      crop: "Rice",
      area: "9 Acres",
      health: "91%",
    },
    {
      id: 3,
      name: "South Field",
      crop: "Tomato",
      area: "5 Acres",
      health: "88%",
    },
  ];

  const openFarm = (farm) => {
    navigate("/digital-twin", {
      state: {
        farm,
      },
    });
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-green-700">
        My Farms
      </h2>

      <div className="space-y-4">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="flex items-center justify-between rounded-2xl border p-5 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <MapPin className="text-green-600" />

              <div>
                <h3 className="font-bold">
                  {farm.name}
                </h3>

                <p className="text-gray-500">
                  {farm.crop} • {farm.area}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold text-green-700">
                {farm.health}
              </span>

              <button
                onClick={() => openFarm(farm)}
                className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700 hover:scale-105"
                title="Open Digital Twin"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmList;