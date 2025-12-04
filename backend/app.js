const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
