const express = require("express");
const router = express.Router();
const db = require("../db");
const { success, error } = require("./responseWrap");

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
