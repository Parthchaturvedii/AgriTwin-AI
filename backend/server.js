require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

/* =====================================
   Connect Database
===================================== */

connectDB();

/* =====================================
   Middleware
===================================== */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://agri-twin-ai-dusky.vercel.app",
      "https://agri-twin-ai-one.vercel.app",
      "https://agri-twin-ai-87pc-9sde0b4ag-parth-chaturvedis-projects-050e1cb5.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================================
   API Routes
===================================== */

// Authentication
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Farmer
app.use("/api/farms", require("./routes/farmRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Marketplace
app.use("/api/marketplace", require("./routes/marketplaceRoutes"));

// Offers
app.use("/api/offers", require("./routes/offerRoutes"));
app.use("/api/farmer-offers", require("./routes/farmerOfferRoutes"));

// NEW CHAT SYSTEM
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

// AI
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));
app.use("/api/predictions", require("./routes/predictionRoutes"));
app.use("/api/profit", require("./routes/profitRoutes"));
app.use("/api/recommendation", require("./routes/recommendationRoutes"));
app.use("/api/chatbot", require("./routes/chatbotRoutes"));
app.use("/api/disease", require("./routes/diseaseRoutes"));
app.use("/api/digital-twin", require("./routes/digitalTwinRoutes"));

/* =====================================
   Root Route
===================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "AgriTwin AI",
    version: "1.0.0",
    status: "Running",
    message: "🌱 AgriTwin AI Backend is running successfully.",
  });
});

/* =====================================
   Health Check
===================================== */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    server: "Healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

/* =====================================
   404 Handler
===================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* =====================================
   Global Error Handler
===================================== */

app.use((err, req, res, next) => {
  console.error("====================================");
  console.error("❌ SERVER ERROR");
  console.error(err);
  console.error("====================================");

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* =====================================
   Start Server
===================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("\n====================================");
  console.log("🌱 AgriTwin AI Backend Started");
  console.log("====================================");
  console.log(`🚀 Server : http://localhost:${PORT}`);
  console.log(
    `📦 Environment : ${
      process.env.NODE_ENV || "development"
    }`
  );
  console.log(
    `🤖 Gemini API : ${
      process.env.GEMINI_API_KEY
        ? "Loaded ✅"
        : "Missing ❌"
    }`
  );
  console.log("====================================\n");
});

/* =====================================
   Handle Unexpected Errors
===================================== */

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection");
  console.error(err);
});