import {useState} from "react";
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import {Box, HStack, VStack, Text, Flex} from "@chakra-ui/react";
import SearchInput from "../components/SearchInput";
import {LuSearch} from "react-icons/lu";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "/img/dashboard.svg",
      path: "/admin/dashboard",
    },
    {
      id: "trips",
      label: "Trips",
      icon: "/img/route.svg",
      path: "#",
    },
    {
      id: "user",
      label: "User",
      icon: "/img/user.svg",
      path: "#",
    },
    {
      id: "resources",
      label: "Managing Recourses",
      icon: "/img/resources.svg",
      path: "#",
    },
    {
      id: "contracts",
      label: "Contracts",
      icon: "/img/contacts.svg",
      path: "#",
    },
    {
      id: "clients",
      label: "Clients",
      icon: "/img/clients.svg",
      path: "#",
    },
    {
      id: "payments",
      label: "Payments",
      icon: "/img/payments.svg",
      path: "#",
    },
    {
      id: "company_profile",
      label: "Company Profile",
      icon: "/img/profile.svg",
      path: "#",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

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
              onSearch={(value) => console.log("Sidebar search:", value)}
              size="sm"
            />
          </Box>
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${
                    isActiveRoute(item.path) ? styles.active : ""
                  }`}
                  onClick={() => navigate(item.path)}>
                  <span className={styles.navIcon}>
                    <img src={item.icon} alt="" />
                  </span>
                  {sidebarOpen && (
                    <span className={styles.navLabel}>{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <Flex p={"8px 12px"} gap={"8px"} h={"40px"} mb={"16px"}>
            <Box>
              <img src="/img/setting.svg" alt="" />
            </Box>
            <Box>
              <Text fontSize={"16px"} fontWeight={"600"} color={"#CECFD2"}>
                Settings
              </Text>
            </Box>
          </Flex>
          <Flex
            position={"relative"}
            bg={"#12161C"}
            alignItems={"center"}
            gap={"8px"}
            borderRadius={"12px"}
            border={"1px solid #22262F"}
            p={"8px 12px"}
            h={"64px"}>
            <Box
              cursor={"pointer"}
              position={"absolute"}
              right={"12px"}
              top={"12px"}>
              <img src="/img/chevron.svg" alt="" />
            </Box>
            <Box
              w={"40px"}
              h={"40px"}
              bg={"#22262F"}
              borderRadius={"50%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              color={"#94979C"}
              fontWeight={"600"}
              fontSize={"16px"}>
              J
            </Box>
            <Flex flexDirection={"column"} gap={"0px"}>
              <Text fontSize={"14px"} fontWeight={"600"} color={"#fff"}>
                Javlon
              </Text>
              <Text fontSize={"14px"} fontWeight={"400"} color={"#94979C"}>
                javlon@lodify.com
              </Text>
            </Flex>
          </Flex>
        </div>
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
