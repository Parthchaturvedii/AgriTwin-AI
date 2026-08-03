import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    unit: "kg",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/marketplace", form);

      alert("Listing Created Successfully");

      navigate("/marketplace");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to create listing."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Add Crop Listing
        </h1>

        <input
          name="crop"
          placeholder="Crop Name"
          className="border w-full p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <input
          name="quantity"
          placeholder="Quantity"
          className="border w-full p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <select
          name="unit"
          className="border w-full p-3 rounded mb-4"
          onChange={handleChange}
        >
          <option>kg</option>
          <option>quintal</option>
          <option>ton</option>
        </select>

        <input
          name="price"
          placeholder="Price"
          className="border w-full p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border w-full p-3 rounded mb-5"
          rows="4"
          onChange={handleChange}
        />

        <button
          className="bg-green-600 text-white w-full py-3 rounded-lg"
        >
          Publish Listing
        </button>

      </form>

    </div>
  );
}

export default AddListing;