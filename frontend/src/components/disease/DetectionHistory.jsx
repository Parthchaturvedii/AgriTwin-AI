import {
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

function DetectionHistory() {
  const history = [
    {
      crop: "Tomato",
      disease: "Healthy Leaf",
      confidence: 98,
      date: "Today",
      status: "Healthy",
    },
    {
      crop: "Rice",
      disease: "Leaf Blast",
      confidence: 94,
      date: "Yesterday",
      status: "Infected",
    },
    {
      crop: "Wheat",
      disease: "Rust",
      confidence: 91,
      date: "2 Days Ago",
      status: "Infected",
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="mb-6 flex items-center gap-3">

        <Clock
          size={28}
          className="text-green-600"
        />

        <div>

          <h2 className="text-2xl font-bold text-green-700">
            Detection History
          </h2>

          <p className="text-gray-500">
            Previous AI disease scans
          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Crop
              </th>

              <th className="py-3 text-left">
                Disease
              </th>

              <th className="py-3 text-left">
                Confidence
              </th>

              <th className="py-3 text-left">
                Status
              </th>

              <th className="py-3 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {history.map((item, index) => (

              <tr
                key={index}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-4 font-semibold">
                  {item.crop}
                </td>

                <td>{item.disease}</td>

                <td>{item.confidence}%</td>

                <td>

                  {item.status === "Healthy" ? (

                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                      <CheckCircle size={16} />

                      Healthy

                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                      <AlertTriangle size={16} />

                      Infected

                    </span>

                  )}

                </td>

                <td>{item.date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DetectionHistory;