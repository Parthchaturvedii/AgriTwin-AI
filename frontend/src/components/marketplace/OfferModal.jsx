import { useState } from "react";
import api from "../../services/api";

function OfferModal({ listing, onClose }) {
  const [form, setForm] = useState({
    offeredPrice: "",
    quantity: "",
    message: "",
  });

  const submitOffer = async (e) => {
    e.preventDefault();

    try {
      await api.post("/offers", {
        listingId: listing._id,
        offeredPrice: Number(form.offeredPrice),
        quantity: Number(form.quantity),
        message: form.message,
      });

      alert("Offer Sent Successfully");

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[450px] rounded-xl bg-white p-6">

        <h2 className="mb-5 text-2xl font-bold">
          Send Offer
        </h2>

        <form
          onSubmit={submitOffer}
          className="space-y-4"
        >
          <input
            type="number"
            placeholder="Offer Price"
            value={form.offeredPrice}
            onChange={(e) =>
              setForm({
                ...form,
                offeredPrice: e.target.value,
              })
            }
            className="w-full rounded border p-3"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity: e.target.value,
              })
            }
            className="w-full rounded border p-3"
            required
          />

          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            className="w-full rounded border p-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-5 py-2"
            >
              Cancel
            </button>

            <button
              className="rounded bg-green-600 px-5 py-2 text-white"
            >
              Send Offer
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default OfferModal;