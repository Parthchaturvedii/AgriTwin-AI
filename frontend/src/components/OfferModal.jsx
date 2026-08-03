import { useState } from "react";
import api from "../services/api";

function OfferModal({ listing, onClose }) {
  const [offeredPrice, setOfferedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOffer = async () => {
    if (!offeredPrice || !quantity) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/offers/${listing._id}`, {
        offeredPrice,
        quantity,
        message,
      });

      alert("✅ Offer Sent Successfully");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Send Offer
        </h2>

        <p className="mb-5">
          <strong>{listing.cropName}</strong>
        </p>

        <input
          type="number"
          placeholder="Offered Price"
          className="border rounded-lg p-3 w-full mb-4"
          value={offeredPrice}
          onChange={(e) => setOfferedPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="border rounded-lg p-3 w-full mb-4"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <textarea
          placeholder="Message"
          className="border rounded-lg p-3 w-full mb-6"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={sendOffer}
            disabled={loading}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            {loading ? "Sending..." : "Send Offer"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default OfferModal;