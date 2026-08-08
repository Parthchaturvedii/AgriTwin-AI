import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  // ==========================================
  // WAIT FOR AUTHENTICATION CHECK
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">
            🌱
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            Loading AgriTwin AI...
          </h2>

          <p className="text-gray-500 mt-2">
            Verifying your account...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // CHECK TOKEN
  // ==========================================

  const token = localStorage.getItem("token");

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!user || !token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // ==========================================
  // AUTHENTICATED
  // ==========================================

  return children;
}

export default ProtectedRoute;