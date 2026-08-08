import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

// ==============================
// Authentication Pages
// ==============================

import Login from "./pages/Login";
import Register from "./pages/Register";

// ==============================
// Dashboard Pages
// ==============================

import Dashboard from "./pages/Dashboard";
import BuyerDashboard from "./pages/BuyerDashboard";

// ==============================
// Marketplace
// ==============================

import Marketplace from "./pages/Marketplace";
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";

// ==============================
// Offers
// ==============================

import Offers from "./pages/Offers";
import FarmerOffers from "./pages/FarmerOffers";

// ==============================
// Chat / Inbox
// ==============================

import Inbox from "./pages/Inbox";
import ChatPage from "./pages/ChatPage";

// ==============================
// Other Pages
// ==============================

import AIAdvisor from "./pages/AIAdvisor";
import DigitalTwin from "./pages/DigitalTwin";
import FarmManagement from "./pages/FarmManagement";
import DiseaseDetection from "./pages/DiseaseDetection";
import Weather from "./pages/Weather";
import Settings from "./pages/Settings";

// ==============================
// Protected Route
// ==============================

import ProtectedRoute from "./components/auth/ProtectedRoute";


function App() {
  const { user, loading } = useContext(AuthContext);

  // =====================================================
  // WAIT FOR AUTHENTICATION TO LOAD
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">

          <div className="text-5xl mb-4">
            🌱
          </div>

          <h1 className="text-2xl font-bold text-green-700">
            Loading AgriTwin AI...
          </h1>

          <p className="mt-2 text-gray-500">
            Please wait...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // HOME ROUTE
  // =====================================================

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
          AUTHENTICATION
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
          FARMER DASHBOARD
      ================================================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      {/* =================================================
          BUYER DASHBOARD
      ================================================= */}

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

      {/* Buyer Offers */}

      <Route
        path="/offers"
        element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        }
      />

      {/* Farmer Offers */}

      <Route
        path="/farmer-offers"
        element={
          <ProtectedRoute>
            <FarmerOffers />
          </ProtectedRoute>
        }
      />


      {/* =================================================
          ONE CENTRAL INBOX
      ================================================= */}

      <Route
        path="/inbox"
        element={
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        }
      />


      {/* =================================================
          BACKWARD COMPATIBILITY
          
          If any old button still uses:
          
          /chat
          
          send the user to the same Inbox.

          This means we don't need a separate Chat menu.
      ================================================= */}

      <Route
        path="/chat"
        element={
          <Navigate
            to="/inbox"
            replace
          />
        }
      />


      {/* =================================================
          SPECIFIC CHAT / NEGOTIATION
          
          Example:
          
          /chat/65abc123...
          
          opens one specific conversation.
      ================================================= */}

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
          DISEASE DETECTION
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