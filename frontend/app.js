function loadProducts() {
  $.ajax({
    url: "http://localhost:3000/api/products",
    method: "GET",
    success: function (res) {
      displayProducts(res.data);
    },
    error: () => alert("Failed to load products"),
  });
}

function displayProducts(products) {
  let html =
    "<table border='1'><tr><th>Name</th><th>Price</th><th>Category</th></tr>";

  products.forEach((p) => {
    html += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.category}</td>
      </tr>
    `;
  });

  html += "</table>";
  $("#productList").html(html);
}

$("#loadBtn").click(loadProducts);

// ----------------------
// CREATE PRODUCT
// ----------------------
function createProduct(product) {
  $.ajax({
    url: "http://localhost:3000/api/products",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(product),
    success: () => loadProducts(),
    error: () => alert("Create failed"),
  });
}

// ----------------------
// UPDATE PRODUCT
// ----------------------
function updateProduct(id, product) {
  $.ajax({
    url: `http://localhost:3000/api/products/${id}`,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(product),
    success: () => loadProducts(),
    error: () => alert("Update failed"),
  });
}

// ----------------------
// DELETE PRODUCT
// ----------------------
function deleteProduct(id) {
  if (!confirm("Delete product?")) return;

  $.ajax({
    url: `http://localhost:3000/api/products/${id}`,
    method: "DELETE",
    success: () => loadProducts(),
    error: () => alert("Delete failed"),
  });
}
