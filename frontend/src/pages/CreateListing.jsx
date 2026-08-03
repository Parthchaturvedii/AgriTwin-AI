import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";

function CreateListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cropName: "",
    variety: "",
    quantity: "",
    unit: "Quintal",
    expectedPrice: "",
    state: "",
    district: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/marketplace", form);

      alert(data.message || "Listing Created Successfully");

      navigate("/marketplace");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to create listing."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-white shadow px-8 py-5 flex items-center gap-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Create Crop Listing
        </h1>

      </div>

      <div className="flex justify-center py-10">

        <form
          onSubmit={submit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <input
              name="cropName"
              placeholder="Crop Name"
              value={form.cropName}
              onChange={handleChange}
              required
              className="border rounded-xl p-4"
            />

            <input
              name="variety"
              placeholder="Variety"
              value={form.variety}
              onChange={handleChange}
              required
              className="border rounded-xl p-4"
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="border rounded-xl p-4"
            />

            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="border rounded-xl p-4"
            >
              <option>Kg</option>
              <option>Quintal</option>
              <option>Ton</option>
            </select>

            <input
              type="number"
              name="expectedPrice"
              placeholder="Expected Price"
              value={form.expectedPrice}
              onChange={handleChange}
              required
              className="border rounded-xl p-4"
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
              className="border rounded-xl p-4"
            />

            <input
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
              required
              className="border rounded-xl p-4"
            />

            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

          </div>

          <textarea
            name="description"
            placeholder="Description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            className="border rounded-xl p-4 w-full mt-5"
          />

          <button
            type="submit"
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Create Listing
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateListing;