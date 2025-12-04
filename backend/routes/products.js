const express = require("express");
const router = express.Router();
const db = require("../db");

// FORMATTERS
function success(data, message = "OK") {
  return { status: "success", data, message };
}

function error(message, code = 400) {
  return { status: "error", message, code };
}

// ------------------------------
// GET all products
// ------------------------------
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(error("Database error", 500));

    res.json(success(results, "Products retrieved"));
  });
});

// ------------------------------
// GET product by ID
// ------------------------------
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(error("Database error"));

      if (data.length === 0)
        return res.status(404).json(error("Product not found", 404));

      res.json(success(data[0], "Product retrieved"));
    }
  );
});

// ------------------------------
// CREATE product
// ------------------------------
router.post("/", (req, res) => {
  const { name, description, price, category, stock_quantity } = req.body;

  if (!name || !price)
    return res.status(400).json(error("Name and price are required"));

  const sql = `INSERT INTO products (name, description, price, category, stock_quantity)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [name, description, price, category, stock_quantity],
    (err, result) => {
      if (err) return res.status(500).json(error("Database error"));

      res.status(201).json(
        success(
          {
            id: result.insertId,
            name,
            description,
            price,
            category,
            stock_quantity,
          },
          "Product created"
        )
      );
    }
  );
});

// ------------------------------
// UPDATE product
// ------------------------------
router.put("/:id", (req, res) => {
  const { name, description, price, category, stock_quantity } = req.body;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(error("Database error"));

      if (data.length === 0)
        return res.status(404).json(error("Product not found", 404));

      const updated = {
        name: name ?? data[0].name,
        description: description ?? data[0].description,
        price: price ?? data[0].price,
        category: category ?? data[0].category,
        stock_quantity: stock_quantity ?? data[0].stock_quantity,
      };

      const sql = `UPDATE products SET name=?, description=?, price=?, category=?, stock_quantity=? WHERE id=?`;

      db.query(
        sql,
        [
          updated.name,
          updated.description,
          updated.price,
          updated.category,
          updated.stock_quantity,
          req.params.id,
        ],
        () => {
          res.json(success(updated, "Product updated"));
        }
      );
    }
  );
});

// ------------------------------
// DELETE product
// ------------------------------
router.delete("/:id", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(error("Database error"));

      if (data.length === 0)
        return res.status(404).json(error("Product not found", 404));

      db.query("DELETE FROM products WHERE id = ?", [req.params.id], () => {
        res.json(success({ id: req.params.id }, "Product deleted"));
      });
    }
  );
});

module.exports = router;
