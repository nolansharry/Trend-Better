require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const connectDB = require("./config/db");

const marketRoutes = require("./routes/marketRoutes");
const { syncAll } = require("./services/marketSync");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// Routes


// Start scheduled sync inside main()
async function main() {
  await connectDB();

  // Initial sync on startup
  await syncAll();

  // Schedule sync every N minutes
  const CACHE_MINUTES = parseInt(process.env.ODDSPIPE_CACHE_MINUTES) || 5;
  setInterval(syncAll, CACHE_MINUTES * 60 * 1000);

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret-change-me",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("TrendBetter API is running!"));
app.use("/api/users", userRoutes);
app.use("/api/markets", marketRoutes);

// Add this AFTER all routes, at the bottom of index.js
app.use((err, req, res, next) => {
  console.error("Express error handler:", err);
  res.status(500).json({ error: err.message });
});

// Start
const PORT = process.env.PORT || 5000;

async function main() {
  await connectDB();

  // Initial sync on startup
  await syncAll();

  // Schedule sync every N minutes
  const CACHE_MINUTES = parseInt(process.env.ODDSPIPE_CACHE_MINUTES) || 5;
  setInterval(syncAll, CACHE_MINUTES * 60 * 1000);

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

main();