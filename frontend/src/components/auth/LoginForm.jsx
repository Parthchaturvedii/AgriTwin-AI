import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user.role === "farmer") {
        navigate("/dashboard");
      } else {
        navigate("/buyer-dashboard");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

      <h1 className="text-4xl font-bold text-center text-green-700">
        🌱 AgriTwin AI
      </h1>

      <p className="mt-2 text-center text-gray-500">
        Welcome Back
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3 outline-none focus:border-green-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3 outline-none focus:border-green-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-green-700"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;