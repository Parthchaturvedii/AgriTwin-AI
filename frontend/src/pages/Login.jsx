import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Tractor,
  ShoppingCart,
} from "lucide-react";

import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setMessage("");

    const { data } = await api.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    if (!data.success || !data.token || !data.user) {
      throw new Error("Invalid login response.");
    }

    // IMPORTANT:
    // Update AuthContext immediately
    login(data.user, data.token);

    setMessage("✅ Login Successful");

    // Redirect according to role
    if (data.user.role === "buyer") {
      navigate("/buyer-dashboard", {
        replace: true,
      });
    } else {
      navigate("/dashboard", {
        replace: true,
      });
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    setMessage(
      error.response?.data?.message ||
        error.message ||
        "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4">

      <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">

        <div className="text-center">

          <div className="mb-4 flex justify-center">

            <div className="rounded-full bg-green-100 p-4">

              <Tractor
                size={40}
                className="text-green-600"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-green-700">
            AgriTwin AI
          </h1>

          <p className="mt-2 text-gray-500">
            Smart Agriculture Platform
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
              className="w-full rounded-xl border p-3 outline-none transition focus:border-green-500"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter Password"
                className="w-full rounded-xl border p-3 pr-12 outline-none transition focus:border-green-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm">

              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              Remember Me

            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        {message && (
          <div
            className={`mt-5 rounded-xl p-3 text-center font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-green-50 p-4">

          <div className="flex items-center gap-3">

            <ShoppingCart
              className="text-green-600"
              size={24}
            />

            <div>

              <h3 className="font-semibold">
                New to AgriTwin AI?
              </h3>

              <p className="text-sm text-gray-600">
                Register as a Farmer or Buyer.
              </p>

            </div>

          </div>

          <Link
            to="/register"
            className="mt-4 block rounded-xl bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700"
          >
            Create New Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;