const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const knowledgeMapRoutes = require("./routes/knowledgeMapRoutes");
// const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });
dotenv.config();
connectDB();

// Debug: Log environment variables to confirm they are loaded
console.log("Environment Variables Loaded:");
console.log("STRAPI_URL:", process.env.STRAPI_URL);
console.log("STRAPI_TOKEN:", process.env.STRAPI_TOKEN);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", knowledgeMapRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
