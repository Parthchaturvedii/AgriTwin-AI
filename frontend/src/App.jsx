import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import BuyerDashboard from "./pages/BuyerDashboard";

import Marketplace from "./pages/Marketplace";
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";

import Offers from "./pages/Offers";
import FarmerOffers from "./pages/FarmerOffers";

import Inbox from "./pages/Inbox";
import ChatPage from "./pages/ChatPage";

import AIAdvisor from "./pages/AIAdvisor";
import DigitalTwin from "./pages/DigitalTwin";
import FarmManagement from "./pages/FarmManagement";
import DiseaseDetection from "./pages/DiseaseDetection";
import Weather from "./pages/Weather";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h1 className="animate-pulse text-3xl font-bold text-green-600">
          🌱 Loading AgriTwin AI...
        </h1>
      </div>
    );
  }

  return (
    <Routes>

      {/* ================= Root ================= */}

      <Route
        path="/"
        element={
          user ? (
            <Navigate
              to={
                user.role === "buyer"
                  ? "/buyer-dashboard"
                  : "/dashboard"
              }
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ================= Auth ================= */}

      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={
                user.role === "buyer"
                  ? "/buyer-dashboard"
                  : "/dashboard"
              }
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/register"
        element={
          user ? (
            <Navigate
              to={
                user.role === "buyer"
                  ? "/buyer-dashboard"
                  : "/dashboard"
              }
              replace
            />
          ) : (
            <Register />
          )
        }
      />

            {/* ================= Farmer Dashboard ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= Buyer Dashboard ================= */}

      <Route
        path="/buyer-dashboard"
        element={
          <ProtectedRoute>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= Marketplace ================= */}

      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/listing/:id"
        element={
          <ProtectedRoute>
            <ListingDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-listing"
        element={
          <ProtectedRoute>
            <CreateListing />
          </ProtectedRoute>
        }
      />

      {/* ================= Offers ================= */}

      <Route
        path="/offers"
        element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/farmer-offers"
        element={
          <ProtectedRoute>
            <FarmerOffers />
          </ProtectedRoute>
        }
      />

      {/* ================= Inbox & Chat ================= */}

      <Route
        path="/inbox"
        element={
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat/:chatId"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      {/* ================= Farm Management ================= */}

      <Route
        path="/farms"
        element={
          <ProtectedRoute>
            <FarmManagement />
          </ProtectedRoute>
        }
      />

      {/* ================= AI Advisor ================= */}

      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <AIAdvisor />
          </ProtectedRoute>
        }
      />

      {/* ================= Digital Twin ================= */}

      <Route
        path="/digital-twin"
        element={
          <ProtectedRoute>
            <DigitalTwin />
          </ProtectedRoute>
        }
      />

      {/* ================= Disease Detection ================= */}

      <Route
        path="/disease"
        element={
          <ProtectedRoute>
            <DiseaseDetection />
          </ProtectedRoute>
        }
      />

      {/* ================= Weather ================= */}

      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        }
      />

      {/* ================= Settings ================= */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

            {/* ================= 404 / Fallback ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to={
              user
                ? user.role === "buyer"
                  ? "/buyer-dashboard"
                  : "/dashboard"
                : "/login"
            }
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;