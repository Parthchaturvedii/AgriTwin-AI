import {
  Pill,
  Droplets,
  Sprout,
  ShieldCheck,
} from "lucide-react";

function TreatmentCard({ result }) {
  if (!result) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-green-700">
          Treatment Recommendation
        </h2>

        <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300">

          <p className="text-gray-500">
            Upload an image to receive AI treatment recommendations.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-green-700">
        🌿 AI Treatment Recommendation
      </h2>

      <div className="space-y-5">

        {/* Pesticide */}
        <div className="rounded-2xl bg-red-50 p-5">

          <div className="flex gap-3">

            <Pill
              className="text-red-600"
              size={24}
            />

            <div>

              <h3 className="font-bold">
                Recommended Treatment
              </h3>

              <p className="mt-2 text-gray-700">
                {result.treatment}
              </p>

            </div>

          </div>

        </div>

        {/* Irrigation */}
        <div className="rounded-2xl bg-blue-50 p-5">

          <div className="flex gap-3">

            <Droplets
              className="text-blue-600"
              size={24}
            />

            <div>

              <h3 className="font-bold">
                Irrigation Advice
              </h3>

              <p className="mt-2 text-gray-700">
                {result.irrigation}
              </p>

            </div>

          </div>

        </div>

        {/* Fertilizer */}
        <div className="rounded-2xl bg-green-50 p-5">

          <div className="flex gap-3">

            <Sprout
              className="text-green-600"
              size={24}
            />

            <div>

              <h3 className="font-bold">
                Fertilizer Recommendation
              </h3>

              <p className="mt-2 text-gray-700">
                {result.fertilizer}
              </p>

            </div>

          </div>

        </div>

        {/* Precaution */}
        <div className="rounded-2xl bg-yellow-50 p-5">

          <div className="flex gap-3">

            <ShieldCheck
              className="text-yellow-600"
              size={24}
            />

            <div>

              <h3 className="font-bold">
                Precautions
              </h3>

              <p className="mt-2 text-gray-700">
                {result.precaution}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TreatmentCard;