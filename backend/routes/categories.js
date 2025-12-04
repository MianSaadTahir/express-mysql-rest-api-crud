const express = require("express");
const router = express.Router();
const db = require("../db");

// Helper functions
function success(data, message) {
  return { status: "success", message, data };
}

function error(message, data = null) {
  return { status: "error", message, data };
}

// GET categories
router.get("/", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json(error("Database error"));
    res.json(success(results, "Categories retrieved"));
  });
});

// GET products by category ID
router.get("/:id/products", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE category = (SELECT name FROM categories WHERE id = ?)",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(error("Database error"));
      res.json(success(results, "Products by category"));
    }
  );
});

module.exports = router;
