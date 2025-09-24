import React, {useState} from "react";
import {Box, Flex, Text, Button} from "@chakra-ui/react";
import HeadBreadcrumb from "../../components/HeadBreadCrumb";
import FiltersComponent from "../../components/FiltersComponent";
import {CTable} from "@components/tableElements";
import {
  CTableHead,
  CTableTh,
  CTableBody,
  CTableTd,
} from "@components/tableElements";
import {tableElements} from "./components/mockElements";
import CTableRow from "@components/tableElements/CTableRow";
import clientsService from "../../services/clientsService";
import {useQuery} from "@tanstack/react-query";

function Shipper() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({key: "name", direction: "asc"});
  const [search, setSearch] = useState("");
  const [assets, setAssets] = useState([]);

  const {data: clients} = useQuery({
    queryKey: ["CLIENTS_LIST"],
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    queryFn: () => clientsService.getListShipper(),
    select: (data) => data?.data?.response || [],
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const handleRowClick = (id, asset) => {
    console.log(id, asset);
  };

  return (
    <Flex flexDir={"column"} gap={"20px"}>
      <HeadBreadcrumb />
      <Box h={"32px"}>
        <Text h={"32px"} color={"#181D27"} fontWeight={"600"} fontSize={"24px"}>
          Shipper
        </Text>
      </Box>

      <FiltersComponent filterButton={true} actionButton={true} />

      <Box mt={6}>
        <CTable
          height="calc(100vh - 270px)"
          overflow="auto"
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}>
          <CTableHead>
            {tableElements.map((element) => (
              <CTableTh
                key={element.key}
                sortable={element.sortable}
                sortDirection={
                  sortConfig.key === element.key ? sortConfig.direction : null
                }
                onSort={() => handleSort(element.key)}>
                {element.label}
              </CTableTh>
            ))}
          </CTableHead>

          <CTableBody>
            {clients?.map((asset, index) => (
              <CTableRow
                key={asset.id || asset.guid || index}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleRowClick(asset.id || asset.guid, asset)}>
                <CTableTd>{asset.name || asset.title || ""}</CTableTd>
                <CTableTd>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    w="32px"
                    h="32px"
                    borderRadius="50%"
                    overflow={"hidden"}>
                    <img
                      src={asset?.logo}
                      alt=""
                      style={{width: "100%", height: "100%"}}
                    />
                  </Flex>
                </CTableTd>
                <CTableTd>
                  <Box w="100%" textAlign="end">
                    <Button w="20px" h="20px" bg="none" _hover={{bg: "none"}}>
                      <img src="/img/threeDots.svg" alt="" />
                    </Button>
                  </Box>
                </CTableTd>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </Box>
    </Flex>
  );
}

export default Shipper;
