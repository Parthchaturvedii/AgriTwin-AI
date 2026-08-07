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
  const { user, loading } =
    useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-2xl font-bold">
          🌱 Loading AgriTwin AI...
        </div>
      </div>
    );
  }

  const homeRoute = user
    ? user.role === "buyer"
      ? "/buyer-dashboard"
      : "/dashboard"
    : "/login";

  return (
    <Routes>

      {/* =================================================
          ROOT
      ================================================= */}

      <Route
        path="/"
        element={
          <Navigate
            to={homeRoute}
            replace
          />
        }
      />

      {/* =================================================
          AUTH
      ================================================= */}

      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={homeRoute}
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
              to={homeRoute}
              replace
            />
          ) : (
            <Register />
          )
        }
      />

      {/* =================================================
          DASHBOARDS
      ================================================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer-dashboard"
        element={
          <ProtectedRoute>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          MARKETPLACE
      ================================================= */}

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

      {/* =================================================
          OFFERS
      ================================================= */}

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

      {/* =================================================
          CHAT
      ================================================= */}

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

      {/* =================================================
          FARM MANAGEMENT
      ================================================= */}

      <Route
        path="/farms"
        element={
          <ProtectedRoute>
            <FarmManagement />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          AI ADVISOR
      ================================================= */}

      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <AIAdvisor />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          DIGITAL TWIN
      ================================================= */}

      <Route
        path="/digital-twin"
        element={
          <ProtectedRoute>
            <DigitalTwin />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          DISEASE
      ================================================= */}

      <Route
        path="/disease"
        element={
          <ProtectedRoute>
            <DiseaseDetection />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          WEATHER
      ================================================= */}

      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          SETTINGS
      ================================================= */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* =================================================
          404
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to={homeRoute}
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;