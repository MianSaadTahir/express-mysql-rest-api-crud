# Product Management System

A full-stack web application for managing products and categories. The backend is built with Node.js, Express, and MySQL providing RESTful APIs, while the frontend is a dynamic interface built with JavaScript, jQuery, and Bootstrap that consumes these APIs.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [API Documentation](#API-Documentation)
- [Contributing](#contributing)

## Features

- Full CRUD operations for products (Create, Read, Update, Delete)
- Category management and viewing products by category
- RESTful API with standardized JSON responses
- Frontend dynamically consumes APIs using jQuery AJAX
- Real-time search and filter on product list
- Responsive and clean UI with Bootstrap
- Input validation and error handling for all operations

## Screenshots

<img src="/assets/1.png" alt="frontend" width="75%">

## Technologies Used

- Node.js
- Express.js
- MySQL
- JavaScript
- jQuery
- AJAX
- Bootstrap 5
- HTML/CSS

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/express-mysql-rest-api-crud.git
   ```
2. Navigate to the backend folder:
   `cd express-mysql-rest-api-crud/backend`
3. Install backend dependencies:
   `npm install`
4. Create the MySQL database and tables:
   Use `database/product_management.sql` to create database, tables, and sample data.
   `mysql -u root -p < database/product_management.sql`
5. Start the backend server:
   `node app.js`
6. Open the frontend:
   Open `frontend/index.html` in a web browser (ensure backend server is running).

## API Documentation

### Products API

**GET /api/products**

- Description: Retrieve all products.
- Request: None
- Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "category": "Electronics",
      "stock_quantity": 15
    },
    {
      "id": 2,
      "name": "Smartphone",
      "description": "Latest smartphone model",
      "price": 699.99,
      "category": "Electronics",
      "stock_quantity": 25
    }
  ],
  "message": "Products retrieved"
}
```

**GET /api/products/{id}**

- Description: Retrieve a single product by ID.
- Request: None
- Response:

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock_quantity": 15
  },
  "message": "Product retrieved"
}
```

**POST /api/products**

- Description: Create a new product.
- Request Body:

```{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "category": "Books",
  "stock_quantity": 10
}
```

- Response:

```{
  "status": "success",
  "data": {
    "id": 3,
    "name": "New Product",
    "description": "Product description",
    "price": 49.99,
    "category": "Books",
    "stock_quantity": 10
  },
  "message": "Product created"
}
```

**PUT /api/products/{id}**

- Description: Update an existing product by ID.
- Request Body: (any fields to update)

```{
  "name": "Updated Product",
  "price": 59.99
}
```

- Response:

```{
  "status": "success",
  "data": {
    "id": 3,
    "name": "Updated Product",
    "description": "Product description",
    "price": 59.99,
    "category": "Books",
    "stock_quantity": 10
  },
  "message": "Product updated"
}
```

**DELETE /api/products/{id}**

- Description: Delete a product by ID.
- Request: None
- Response:

```{
  "status": "success",
  "data": {
    "id": 3
  },
  "message": "Product deleted"
}
```

### Categories API

**GET /api/categories**

- Description: Retrieve all categories.
- Request: None
- Response:

```{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic devices and accessories"
    },
    {
      "id": 2,
      "name": "Books",
      "description": "Various books and publications"
    }
  ],
  "message": "Categories retrieved"
}
```

**GET /api/categories/{id}/products**

- Description: Retrieve all products under a specific category by category ID.
- Request: None
- Response:

```{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "category": "Electronics",
      "stock_quantity": 15
    },
    {
      "id": 2,
      "name": "Smartphone",
      "description": "Latest smartphone model",
      "price": 699.99,
      "category": "Electronics",
      "stock_quantity": 25
    }
  ],
  "message": "Products by category"
}
```

## Contributing

Contributions, issues, and feature requests are welcome.
Feel free to check out the [issues page](https://github.com/MianSaadTahir/express-mysql-rest-api-crud/issues) for more information.
