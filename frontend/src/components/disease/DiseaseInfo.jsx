import {
  Bug,
  AlertTriangle,
  ShieldCheck,
  Leaf,
} from "lucide-react";

function DiseaseInfo({ result }) {
  if (!result) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-green-700">
          Disease Information
        </h2>

        <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300">

          <div className="text-center text-gray-500">

            <Leaf
              size={60}
              className="mx-auto mb-4"
            />

            Upload an image to view disease information.

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-green-700">
        Disease Information
      </h2>

      <div className="space-y-5">

        <div className="rounded-2xl bg-red-50 p-5">

          <div className="flex gap-3">

            <Bug className="text-red-600" />

            <div>

              <h3 className="font-bold">
                Cause
              </h3>

              <p className="mt-2 text-gray-600">
                {result.cause}
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-5">

          <div className="flex gap-3">

            <AlertTriangle className="text-yellow-600" />

            <div>

              <h3 className="font-bold">
                Symptoms
              </h3>

              <p className="mt-2 text-gray-600">
                {result.symptoms}
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-blue-50 p-5">

          <div className="flex gap-3">

            <ShieldCheck className="text-blue-600" />

            <div>

              <h3 className="font-bold">
                Spread Risk
              </h3>

              <p className="mt-2 text-gray-600">
                {result.spread}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DiseaseInfo;