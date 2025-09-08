import {useState} from "react";
import styles from "./AdminPages.module.scss";

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Laptop Pro",
      category: "Electronics",
      price: "$1,299",
      stock: 45,
      status: "Active",
      image: "💻",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      category: "Audio",
      price: "$199",
      stock: 120,
      status: "Active",
      image: "🎧",
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Wearables",
      price: "$399",
      stock: 0,
      status: "Out of Stock",
      image: "⌚",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.adminPage}>
      <div className="page-header">
        <h2>Product Management</h2>
        <p>Manage your product catalog and inventory</p>
      </div>

      <div className="page-actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <button className="primary-btn">
          <span>➕</span>
          Add Product
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <div className="product-image">{product.image}</div>
                    <span className="product-name">{product.name}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td className="price-cell">{product.price}</td>
                <td>
                  <span
                    className={`stock-badge ${
                      product.stock > 10
                        ? "in-stock"
                        : product.stock > 0
                        ? "low-stock"
                        : "out-of-stock"
                    }`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${product.status
                      .toLowerCase()
                      .replace(" ", "-")}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit">✏️</button>
                    <button className="action-btn delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
