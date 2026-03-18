require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/suppliers", require("./routes/supplier"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK boss 👌", node: process.version });
});

// Example API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

// Serve React build
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});