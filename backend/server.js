require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* =====================================
   CONNECT DATABASE
===================================== */

connectDB();

/* =====================================
   CORS CONFIGURATION
===================================== */

const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:3000",

  // Main Vercel frontend
  "https://agri-twin-ai-one.vercel.app",

  // Previous frontend deployment
  "https://agri-twin-ai-dusky.vercel.app",

  // Specific Vercel deployment
  "https://agri-twin-ai-87pc-9sde0b4ag-parth-chaturvedis-projects-050e1cb5.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without Origin
    // Example: Postman, mobile apps, server-to-server
    if (!origin) {
      return callback(null, true);
    }

    // Allow exact origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow Vercel preview deployments
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    console.log("❌ CORS blocked origin:", origin);

    return callback(
      new Error(`CORS blocked for origin: ${origin}`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],

  exposedHeaders: [
    "Authorization",
  ],

  optionsSuccessStatus: 204,
};

/* =====================================
   MIDDLEWARE
===================================== */

app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

/* =====================================
   REQUEST LOGGER
===================================== */

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} | ${req.method} ${req.originalUrl}`
  );

  if (req.headers.origin) {
    console.log(`🌐 Origin: ${req.headers.origin}`);
  }

  next();
});

/* =====================================
   API ROUTES
===================================== */

/* ---------- Authentication ---------- */

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

/* ---------- User ---------- */

app.use(
  "/api/user",
  require("./routes/userRoutes")
);

/* ---------- Farmer ---------- */

app.use(
  "/api/farms",
  require("./routes/farmRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

/* ---------- Marketplace ---------- */

app.use(
  "/api/marketplace",
  require("./routes/marketplaceRoutes")
);

/* ---------- Offers ---------- */

app.use(
  "/api/offers",
  require("./routes/offerRoutes")
);

app.use(
  "/api/farmer-offers",
  require("./routes/farmerOfferRoutes")
);

/* ---------- Chat ---------- */

app.use(
  "/api/chats",
  require("./routes/chatRoutes")
);

app.use(
  "/api/messages",
  require("./routes/messageRoutes")
);

/* ---------- AI ---------- */

app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

app.use(
  "/api/weather",
  require("./routes/weatherRoutes")
);

app.use(
  "/api/predictions",
  require("./routes/predictionRoutes")
);

app.use(
  "/api/profit",
  require("./routes/profitRoutes")
);

app.use(
  "/api/recommendation",
  require("./routes/recommendationRoutes")
);

app.use(
  "/api/chatbot",
  require("./routes/chatbotRoutes")
);

app.use(
  "/api/disease",
  require("./routes/diseaseRoutes")
);

app.use(
  "/api/digital-twin",
  require("./routes/digitalTwinRoutes")
);

/* =====================================
   ROOT ROUTE
===================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "AgriTwin AI",
    version: "1.0.0",
    status: "Running",
    message:
      "🌱 AgriTwin AI Backend is running successfully.",
  });
});

/* =====================================
   HEALTH CHECK
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
   CORS TEST
===================================== */

app.get("/api/cors-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CORS is working correctly!",
    origin: req.headers.origin || null,
  });
});

/* =====================================
   404 HANDLER
===================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* =====================================
   GLOBAL ERROR HANDLER
===================================== */

app.use((err, req, res, next) => {
  console.error("====================================");
  console.error("❌ SERVER ERROR");
  console.error(err);
  console.error("====================================");

  // CORS error
  if (
    err.message &&
    err.message.startsWith("CORS blocked")
  ) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
});

/* =====================================
   START SERVER
===================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("\n====================================");
  console.log("🌱 AgriTwin AI Backend Started");
  console.log("====================================");

  console.log(`🚀 Server Port : ${PORT}`);

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
   UNEXPECTED ERRORS
===================================== */

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection");
});