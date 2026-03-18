const express = require("express");
const router = express.Router();

// TEMP DB (replace later with PostgreSQL)
let suppliers = [];

// GET all suppliers
router.get("/", (req, res) => {
  res.json(suppliers);
});

// ADD supplier
router.post("/", (req, res) => {
  const newSupplier = {
    id: Date.now(),
    ...req.body,
    status: "ACTIVE",
    createdAt: new Date()
  };

  suppliers.push(newSupplier);
  res.json(newSupplier);
});

module.exports = router;