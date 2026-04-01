import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { connectDB } from "./server/config/db.js";
import authRoutes from "./server/routes/auth.js";
import postRoutes from "./server/routes/posts.js";

dotenv.config();
await connectDB();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
}));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);