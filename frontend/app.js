const API_URL = "http://localhost:3000/api/products";

function loadProducts(search = "") {
  $.ajax({
    url: API_URL,
    method: "GET",
    success: function (res) {
      let products = res.data;

      // Filter products if search term is provided
      if (search) {
        const term = search.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            (p.category && p.category.toLowerCase().includes(term))
        );
      }

      displayProducts(products);
    },
    error: () => alert("Failed to load products"),
  });
}

function displayProducts(products) {
  if (!products.length) {
    $("#productList").html("<p>No products found.</p>");
    return;
  }

  let html =
    "<table border='1'><tr><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th></tr>";

  products.forEach((p) => {
    html += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.category || ""}</td>
        <td>${p.stock_quantity || 0}</td>
        <td>
          <button onclick="editProduct(${p.id})">Edit</button>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });

  html += "</table>";
  $("#productList").html(html);
}

// ----------------------
// CREATE / UPDATE PRODUCT
// ----------------------
$("#productForm").submit(function (e) {
  e.preventDefault();

  const productId = $("#productId").val();
  const productData = {
    name: $("#name").val(),
    description: $("#description").val(),
    price: parseFloat($("#price").val()),
    category: $("#category").val(),
    stock_quantity: parseInt($("#stock_quantity").val()) || 0,
  };

  if (productId) {
    updateProduct(productId, productData);
  } else {
    createProduct(productData);
  }
});

function createProduct(product) {
  $.ajax({
    url: API_URL,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(product),
    success: () => {
      resetForm();
      loadProducts();
    },
    error: () => alert("Create failed"),
  });
}

function updateProduct(id, product) {
  $.ajax({
    url: `${API_URL}/${id}`,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(product),
    success: () => {
      resetForm();
      loadProducts();
    },
    error: () => alert("Update failed"),
  });
}

// ----------------------
// DELETE PRODUCT
// ----------------------
function deleteProduct(id) {
  if (!confirm("Delete product?")) return;

  $.ajax({
    url: `${API_URL}/${id}`,
    method: "DELETE",
    success: () => loadProducts(),
    error: () => alert("Delete failed"),
  });
}

// ----------------------
// EDIT PRODUCT
// ----------------------
function editProduct(id) {
  $.ajax({
    url: `${API_URL}/${id}`,
    method: "GET",
    success: (res) => {
      const p = res.data;
      $("#productId").val(p.id);
      $("#name").val(p.name);
      $("#description").val(p.description);
      $("#price").val(p.price);
      $("#category").val(p.category);
      $("#stock_quantity").val(p.stock_quantity);
    },
    error: () => alert("Failed to load product"),
  });
}

// ----------------------
// RESET FORM
// ----------------------
function resetForm() {
  $("#productId").val("");
  $("#productForm")[0].reset();
}

$("#resetBtn").click(resetForm);

// ----------------------
// SEARCH PRODUCTS
// ----------------------
$("#search").on("input", function () {
  const term = $(this).val();
  loadProducts(term);
});

// Initial load
loadProducts();
