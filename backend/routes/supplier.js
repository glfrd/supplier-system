const express = require("express");
const router = express.Router();

let suppliers = [];

// GET all
router.get("/", (req, res) => {
  res.json(suppliers);
});

// ADD
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

// UPDATE
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  suppliers = suppliers.map(s =>
    s.id === id ? { ...s, ...req.body } : s
  );

  res.send("Updated");
});

// DELETE / BLACKLIST
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  suppliers = suppliers.map(s =>
    s.id === id ? { ...s, status: "BLACKLISTED" } : s
  );

  res.send("Blacklisted");
});

module.exports = router;