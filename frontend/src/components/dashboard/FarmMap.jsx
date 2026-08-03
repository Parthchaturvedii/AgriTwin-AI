import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FarmMap() {
  const farm = [26.78, 79.02];

  const mandis = [
    {
      name: "Etawah Mandi",
      position: [26.775, 79.015],
      price: "₹2780 / Quintal",
      distance: "4 km",
      time: "10 min",
      demand: "Very High",
      best: true,
    },
    {
      name: "Mainpuri Mandi",
      position: [27.23, 79.02],
      price: "₹2650 / Quintal",
      distance: "32 km",
      time: "40 min",
      demand: "Medium",
      best: false,
    },
    {
      name: "Kanpur Mandi",
      position: [26.45, 80.35],
      price: "₹2600 / Quintal",
      distance: "92 km",
      time: "2 hrs",
      demand: "Low",
      best: false,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-green-700">
            🗺 AI Smart Market Route
          </h2>

          <p className="text-gray-500 mt-1">
            Compare nearby mandis and choose the most profitable destination.
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          AI Optimized Route
        </span>

      </div>

      <MapContainer
        center={farm}
        zoom={9}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "18px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Farm */}

        <Marker position={farm}>
          <Popup>
            <strong>🌾 Green Valley Farm</strong>
            <br />
            Your Current Farm
          </Popup>
        </Marker>

        {/* Mandis */}

        {mandis.map((mandi, index) => (
          <Marker
            key={index}
            position={mandi.position}
          >
            <Popup>

              <h3 className="font-bold">
                {mandi.name}
              </h3>

              <p>💰 {mandi.price}</p>
              <p>📍 {mandi.distance}</p>
              <p>🚚 {mandi.time}</p>
              <p>📊 Demand : {mandi.demand}</p>

              {mandi.best && (
                <p className="text-green-700 font-bold mt-2">
                  ⭐ AI Recommended Market
                </p>
              )}

            </Popup>
          </Marker>
        ))}

        {/* Best Route */}

        <Polyline
          positions={[farm, mandis[0].position]}
          color="green"
          weight={6}
        />
      </MapContainer>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-5 mt-6">

        {mandis.map((mandi, index) => (

          <div
            key={index}
            className={`rounded-xl border p-5 transition-all ${
              mandi.best
                ? "bg-green-50 border-green-400 shadow-md"
                : "bg-white border-gray-200"
            }`}
          >

            <h3 className="font-bold text-lg">
              {mandi.name}
            </h3>

            <div className="space-y-2 mt-4">

              <p>💰 {mandi.price}</p>

              <p>📍 {mandi.distance}</p>

              <p>🚚 {mandi.time}</p>

              <p>📊 Demand : {mandi.demand}</p>

            </div>

            {mandi.best && (

              <div className="mt-5 bg-green-600 text-white rounded-lg py-2 text-center font-semibold">
                ⭐ Highest Profit
              </div>

            )}

          </div>

        ))}

      </div>

      {/* AI Summary */}

      <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-50 border border-green-300 rounded-xl p-6">

        <h3 className="text-xl font-bold text-green-700">
          🤖 AI Selling Recommendation
        </h3>

        <div className="space-y-3 mt-4 text-gray-700">

          <p>
            • Current Market Price :
            <strong> ₹2450 / Quintal</strong>
          </p>

          <p>
            • Predicted Price after 5 Days :
            <strong className="text-green-700">
              {" "}₹2780 / Quintal
            </strong>
          </p>

          <p>
            • Recommended Market :
            <strong> Etawah Mandi</strong>
          </p>

          <p>
            • Estimated Extra Profit :
            <strong className="text-green-700">
              {" "}₹18,500
            </strong>
          </p>

          <div className="mt-5 bg-white rounded-xl border p-4">

            <p className="font-semibold text-green-700">
              Final Decision
            </p>

            <p className="mt-2">
              Hold your crop for <strong>5 more days</strong> and
              transport it to <strong>Etawah Mandi</strong>.
              This route provides the highest expected return after
              considering demand, travel distance and transport cost.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FarmMap;