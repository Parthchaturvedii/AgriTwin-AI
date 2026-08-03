import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function FarmerRegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    state: "",
    district: "",
    village: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        state: formData.state,
        district: formData.district,
        village: formData.village,
        role: "farmer",
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <input
        type="text"
        name="district"
        placeholder="District"
        value={formData.district}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <input
        type="text"
        name="village"
        placeholder="Village"
        value={formData.village}
        onChange={handleChange}
        required
        className="w-full rounded-xl border p-3"
      />

      <button
        disabled={loading}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
      >
        {loading
          ? "Creating Account..."
          : "Create Farmer Account"}
      </button>

      {message && (
        <div className="rounded-xl bg-red-100 p-3 text-center text-red-700">
          {message}
        </div>
      )}

      <p className="text-center">

        Already have an account?

        <Link
          to="/login"
          className="ml-2 font-semibold text-green-600"
        >
          Login
        </Link>

      </p>

    </form>
  );
}

export default FarmerRegisterForm;