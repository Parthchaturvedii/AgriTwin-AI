import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("farmer");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
    phone: "",
    state: "",
    district: "",
    village: "",
    companyName: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectRole = (newRole) => {
    setRole(newRole);

    setFormData((prev) => ({
      ...prev,
      role: newRole,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", formData);

      if (data.success) {
        setIsSuccess(true);
        setMessage("✅ Registration Successful! Redirecting to Login...");

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      } else {
        setMessage(data.message || "Registration Failed");
      }
    } catch (err) {
  setIsSuccess(false);

  console.error("Registration Error:", err);

  setMessage(
    err.response?.data?.message ||
      "Registration failed. Please try again."
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10"
      >
        <h1 className="text-4xl font-bold text-center text-green-600">
          🌱 Join AgriTwin AI
        </h1>

        <p className="text-center mt-2 text-gray-500">
          Choose your account type
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <button
            type="button"
            onClick={() => selectRole("farmer")}
            className={`rounded-2xl border-2 p-6 transition ${
              role === "farmer"
                ? "border-green-600 bg-green-50"
                : "border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-bold">👨‍🌾 Farmer</h2>

            <p className="mt-2 text-gray-500">
              Sell crops, monitor farms and use AI.
            </p>
          </button>

          <button
            type="button"
            onClick={() => selectRole("buyer")}
            className={`rounded-2xl border-2 p-6 transition ${
              role === "buyer"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-bold">🏢 Buyer</h2>

            <p className="mt-2 text-gray-500">
              Purchase directly from farmers.
            </p>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5 mt-10"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-xl p-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border rounded-xl p-4"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-xl p-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="border rounded-xl p-4"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-xl p-4"
          />

          {role === "buyer" ? (
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />
          ) : (
            <>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="village"
                placeholder="Village"
                value={formData.village}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-green-600 text-white rounded-xl py-4 text-lg font-bold hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center font-semibold ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-8 text-center">
          Already have an account?
          <Link
            to="/login"
            className="ml-2 font-bold text-green-600"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;