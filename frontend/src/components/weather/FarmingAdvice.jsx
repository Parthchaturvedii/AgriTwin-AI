import {
  Bot,
  Droplets,
  Sun,
  CloudRain
} from "lucide-react";

function FarmingAdvice() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">

      <div className="mb-5 flex items-center gap-3">

        <Bot
          className="text-green-700"
          size={28}
        />

        <h2 className="text-2xl font-bold text-green-700">
          AI Farming Advice
        </h2>

      </div>

      <div className="space-y-4">

        <div className="flex gap-3 rounded-xl bg-green-100 p-4">

          <Droplets className="text-blue-600" />

          <p>
            Irrigate during the evening to reduce evaporation.
          </p>

        </div>

        <div className="flex gap-3 rounded-xl bg-yellow-100 p-4">

          <Sun className="text-yellow-600" />

          <p>
            Avoid fertilizer application during peak afternoon heat.
          </p>

        </div>

        <div className="flex gap-3 rounded-xl bg-blue-100 p-4">

          <CloudRain className="text-blue-700" />

          <p>
            Delay pesticide spraying due to expected rainfall.
          </p>

        </div>

      </div>

    </div>
  );
}

export default FarmingAdvice;