import { useState } from "react";
import { X, Save } from "lucide-react";

function AddFarmModal({ open, onClose }) {
  const [form, setForm] = useState({
    farmName: "",
    owner: "",
    location: "",
    crop: "",
    area: "",
    soil: "",
    irrigation: "",
    plantingDate: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(form);

    // Later
    // POST /api/farms

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-green-700">
            Add New Farm
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            name="farmName"
            placeholder="Farm Name"
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="owner"
            placeholder="Owner Name"
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="location"
            placeholder="Village / District"
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="crop"
            placeholder="Current Crop"
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="area"
            placeholder="Area (Acres)"
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <select
            name="soil"
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option>Soil Type</option>
            <option>Clay</option>
            <option>Loamy</option>
            <option>Sandy</option>
            <option>Black Soil</option>
          </select>

          <select
            name="irrigation"
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option>Irrigation</option>
            <option>Drip</option>
            <option>Sprinkler</option>
            <option>Canal</option>
            <option>Rainfed</option>
          </select>

          <input
            type="date"
            name="plantingDate"
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          <Save size={20} />
          Save Farm
        </button>

      </div>

    </div>
  );
}

export default AddFarmModal;