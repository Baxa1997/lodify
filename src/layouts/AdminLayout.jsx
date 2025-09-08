import {useState} from "react";
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import {Box} from "@chakra-ui/react";
import SearchInput from "../components/SearchInput";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.adminLayout}>
      <div
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.open : styles.closed
        }`}>
        <div className={styles.sidebarHeader}>
          <div
            className={styles.logo}
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <img src="/img/lodifyLogo.svg" alt="Lodify Admin" />
            ) : (
              <img src="/img/singleLogo.svg" alt="Lodify Admin" />
            )}
          </div>
          <Box px={"24px"} mt={"20px"} className={styles.sidebarSearch}>
            <SearchInput
              placeholder="Search"
              onSearch={(value) => setSearchValue(value)}
              size="sm"
            />
          </Box>
        </div>

        <Sidebar searchValue={searchValue} sidebarOpen={sidebarOpen} />
      </div>

      <div className={styles.mainContent}>
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
