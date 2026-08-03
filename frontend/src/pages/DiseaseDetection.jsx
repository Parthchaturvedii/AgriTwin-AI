import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
} from "lucide-react";

import UploadCard from "../components/disease/UploadCard";
import ResultCard from "../components/disease/ResultCard";
import DiseaseInfo from "../components/disease/DiseaseInfo";
import TreatmentCard from "../components/disease/TreatmentCard";
import DetectionHistory from "../components/disease/DetectionHistory";

function DiseaseDetection() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const result = {
    disease: "Healthy Leaf",
    confidence: 98,
    severity: "Low",
    crop: "Tomato",
    recommendation:
      "Continue regular irrigation and monitor crop health weekly.",
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      <div className="mx-auto max-w-7xl p-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-white dark:bg-slate-800 p-3 shadow-lg transition hover:scale-105"
            >
              <ArrowLeft
                size={24}
                className="text-slate-700 dark:text-white"
              />
            </button>

            <div>

              <h1 className="flex items-center gap-3 text-4xl font-bold text-green-700 dark:text-green-400">

                <Leaf size={40} />

                Disease Detection

              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Upload crop images and let AgriTwin AI detect diseases instantly.
              </p>

            </div>

          </div>

        </div>

        {/* Upload & Result */}

        <div className="grid gap-6 lg:grid-cols-2">

          <UploadCard
            image={image}
            setImage={setImage}
          />

          <ResultCard
            result={result}
          />

        </div>

        {/* Disease Details */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <DiseaseInfo
            result={result}
          />

          <TreatmentCard
            result={result}
          />

        </div>

        {/* History */}

        <div className="mt-6">

          <DetectionHistory />

        </div>

      </div>

    </div>
  );
}

export default DiseaseDetection;