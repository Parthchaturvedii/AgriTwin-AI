import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import OfferModal from "../components/OfferModal";

function Marketplace() {

    const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

  const [listings, setListings] =useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const [form, setForm] = useState({
    cropName: "",
    variety: "",
    quantity: "",
    unit: "Quintal",
    expectedPrice: "",
    state: "",
    district: "",
    description: "",
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/marketplace");

      if (data.success) {
        setListings(data.listings);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createListing = async (e) => {
    e.preventDefault();

    try {
      await api.post("/marketplace", form);

      alert("✅ Listing Added Successfully");

      setForm({
        cropName: "",
        variety: "",
        quantity: "",
        unit: "Quintal",
        expectedPrice: "",
        state: "",
        district: "",
        description: "",
      });

      fetchListings();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to create listing."
      );
    }
  };

    return (
  <div className="min-h-screen bg-slate-100 p-8">

    {/* Header */}
    <div className="flex items-center justify-between mb-8">

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            navigate(
              user?.role === "buyer"
                ? "/buyer-dashboard"
                : "/dashboard"
            )
          }
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Marketplace
        </h1>

      </div>

    </div>

    {/* Create Listing Form */}
    <form
      onSubmit={createListing}
      className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow-lg"
    >

      <input
        name="cropName"
        placeholder="Crop Name"
        value={form.cropName}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <input
        name="variety"
        placeholder="Variety"
        value={form.variety}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <select
        name="unit"
        value={form.unit}
        onChange={handleChange}
        className="border rounded-lg p-3"
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
        className="border rounded-lg p-3"
      />

      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <input
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
        required
        className="border rounded-lg p-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border rounded-lg p-3 md:col-span-2"
      />

      <button
        type="submit"
        className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 text-lg font-semibold"
      >
        Create Listing
      </button>

    </form>

    {/* Listings */}
    <div className="mt-12">

      <h2 className="text-3xl font-bold mb-6">
        Available Listings
      </h2>

      {loading ? (
        <h2 className="text-center text-xl">
          Loading Listings...
        </h2>
      ) : listings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          No Crop Listings Available.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <h2 className="text-2xl font-bold">
                {item.cropName}
              </h2>

              <p className="text-gray-500">
                {item.variety}
              </p>

              <p className="mt-2">
                <strong>Quantity:</strong> {item.quantity} {item.unit}
              </p>

              <p className="text-green-600 font-bold text-xl mt-2">
                ₹ {item.expectedPrice}
              </p>

              <p className="mt-2">
                📍 {item.district}, {item.state}
              </p>

              <p className="mt-3 text-gray-600">
                {item.description}
              </p>

              <div className="flex gap-3 mt-6">

                <Link
                  to={`/listing/${item._id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  View Details
                </Link>

                <button
  onClick={() => setSelectedListing(item)}
  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
>
  Send Offer
</button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
    {selectedListing && (
  <OfferModal
    listing={selectedListing}
    onClose={() => setSelectedListing(null)}
  />
)}

  </div>
);
}

export default Marketplace;