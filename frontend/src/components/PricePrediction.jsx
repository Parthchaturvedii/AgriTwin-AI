import { useState } from "react";
import api from "../services/api";

function PricePrediction() {

    const [crop, setCrop] = useState("");
    const [state, setState] = useState("");
    const [season, setSeason] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");


    const predictPrice = async () => {

        try {

            setError("");

            const { data } = await api.post(
                "/predictions/price",
                {
                    crop,
                    state,
                    season
                }
            );

            setResult(data);

        } catch (error) {

            console.error(error);

            setResult(null);

            setError(
                error.response?.data?.message ||
                "Prediction failed"
            );
        }
    };


    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-green-700">
                🌾 Crop Price Prediction
            </h2>


            <input
                className="border p-3 rounded-lg w-full mt-4"
                placeholder="Crop name (e.g. Wheat)"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
            />


            <input
                className="border p-3 rounded-lg w-full mt-3"
                placeholder="State (e.g. Uttar Pradesh)"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />


            <input
                className="border p-3 rounded-lg w-full mt-3"
                placeholder="Season (e.g. Rabi)"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
            />


            <button
                onClick={predictPrice}
                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
                Predict Price
            </button>


            {error && (
                <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg">
                    {error}
                </div>
            )}


            {result && (
                <div className="mt-5 bg-green-50 p-4 rounded-lg">

                    <h3 className="font-bold">
                        🌾 Crop: {result.crop}
                    </h3>

                    <h3 className="font-bold">
                        📍 State: {result.state}
                    </h3>

                    <h3 className="font-bold">
                        🌦 Season: {result.season}
                    </h3>

                    <h3 className="font-bold text-green-700 mt-2">
                        💰 Expected Price: ₹{result.predictedPrice}/Qtl
                    </h3>

                    <h3 className="font-bold">
                        🤖 Confidence: {result.confidence}
                    </h3>

                </div>
            )}

        </div>
    );
}

export default PricePrediction;