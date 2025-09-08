import {useState} from "react";
import styles from "./AdminPages.module.scss";

const Orders = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      total: "$1,299",
      status: "Completed",
      date: "2024-01-15",
      items: 2,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      total: "$598",
      status: "Processing",
      date: "2024-01-14",
      items: 3,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      total: "$199",
      status: "Pending",
      date: "2024-01-13",
      items: 1,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Order Management</h2>
        <p>Track and manage customer orders</p>
      </div>

      <div className="page-actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">Processing</button>
          <button className="filter-btn">Completed</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <span className="order-id">{order.id}</span>
                </td>
                <td>{order.customer}</td>
                <td>{order.email}</td>
                <td>
                  <span className="items-count">{order.items} items</span>
                </td>
                <td className="price-cell">{order.total}</td>
                <td>
                  <span
                    className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">👁️</button>
                    <button className="action-btn edit">✏️</button>
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

export default Orders;
