import { useState, Suspense, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import SearchInput from "../components/SearchInput";
import Sidebar from "./Sidebar";
import ContentLoader from "../components/ContentLoader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchInput(false);
      }
    };

    if (showSearchInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchInput]);

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
              <img
                src="/img/lodifyLogo.svg"
                alt="Lodify Admin" />
            ) : (
              <img
                src="/img/singleLogo.svg"
                alt="Lodify Admin" />
            )}
          </div>
          {sidebarOpen ? (
            <Box
              px={"24px"}
              mt={"20px"}
              className={styles.sidebarSearch}>
              <SearchInput
                placeholder="Search"
                onSearch={(value) => setSearchValue(value)}
                size="sm"
                height="40px"
                bg="rgba(255, 255, 255, 0.1)"
                borderColor="rgba(255, 255, 255, 0.2)"
                focusBorderColor="rgba(255, 255, 255, 0.4)"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                _focus={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                }}
              />
            </Box>
          ) : (
            <Box className={styles.sidebarSearchIcon}>
              <Tooltip
                label="Search"
                placement="right"
                hasArrow>
                <IconButton
                  aria-label="Search"
                  icon={<LuSearch size={20} />}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  size="sm"
                  className={styles.searchIconButton}
                />
              </Tooltip>
            </Box>
          )}
        </div>

        <Sidebar
          searchValue={searchValue}
          sidebarOpen={sidebarOpen} />
      </div>

      {!sidebarOpen && showSearchInput && (
        <Box
          ref={searchInputRef}
          position="fixed"
          top="80px"
          left="90px"
          zIndex={99999}
          p={4}
          borderRadius="lg"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
          border="1px solid"
          borderColor="gray.200"
          minW="300px"
          bg="white"
          opacity={1}>
          <SearchInput
            showKeyboardShortcut={false}
            placeholder="Search"
            onSearch={(value) => {
              setSearchValue(value);
            }}
            size="md"
            color="gray.700"
            borderColor="gray.300"
            placeholderStyle={{
              color: "#9CA3AF",
              fontSize: "14px",
            }}
            bg="white"
            focusBorderColor="blue.400"
            _hover={{ bg: "white", borderColor: "gray.400" }}
            _focus={{ bg: "white", borderColor: "blue.400" }}
          />
        </Box>
      )}

      <div className={styles.mainContent}>
        <main
          className={styles.pageContent}
          style={{ position: "relative" }}>
          <Suspense fallback={<ContentLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
