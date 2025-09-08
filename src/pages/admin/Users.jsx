import {useState} from "react";
import styles from "./AdminPages.module.scss";

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
      avatar: "👤",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2024-01-14",
      avatar: "👩",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Moderator",
      status: "Inactive",
      lastLogin: "2024-01-10",
      avatar: "👨",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h2>User Management</h2>
        <p>Manage your users and their permissions</p>
      </div>

      <div className={styles.pageActions}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
        <button className={styles.primaryBtn}>
          <span>➕</span>
          Add User
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar}>{user.avatar}</div>
                    <span className={styles.userName}>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`${styles.roleBadge} ${
                      styles[user.role.toLowerCase()]
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[user.status.toLowerCase()]
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionBtn} ${styles.edit}`}>
                      ✏️
                    </button>
                    <button className={`${styles.actionBtn} ${styles.delete}`}>
                      🗑️
                    </button>
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

export default Users;
