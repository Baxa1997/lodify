import React from "react";
import FiltersComponent from "../../components/FiltersComponent";
import {Badge, Box} from "@chakra-ui/react";
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableTh,
  CTableTd,
} from "../../components/tableElements";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CTableRow from "../../components/tableElements/CTableRow";
import {useQuery} from "@tanstack/react-query";
import assetsService from "../../services/assetsService";
import AddAssetsModal from "./components/AddAssetsModal";
import {
  getVerificationStatusColor,
  tableElements,
} from "./components/mockElements";

const TractorsTab = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [isAddAssetsModalOpen, setIsAddAssetsModalOpen] = useState(false);

  const {data: assets = [], isLoading} = useQuery({
    queryKey: ["GET_ASSETS_LIST"],
    queryFn: () => {
      return assetsService.getList();
    },
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    select: (res) => res?.data?.response ?? [],
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

  const handleRowClick = (assetId, asset) => {
    navigate(`/admin/assets/${assetId}`, {
      state: {
        asset,
      },
    });
  };

  if (isLoading) {
    return (
      <Box mt={"32px"}>
        <FiltersComponent
          filterButton={true}
          verifySelect={true}
          actionButton={true}
        />
        <Box mt={6} p={4} textAlign="center">
          Loading assets...
        </Box>
      </Box>
    );
  }

  return (
    <Box mt={"32px"}>
      <FiltersComponent
        filterButton={true}
        verifySelect={true}
        actionButton={true}
        onActionButtonClick={() => setIsAddAssetsModalOpen(true)}
      />

      <Box mt={6}>
        <CTable
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
            {assets.map((asset, index) => (
              <CTableRow
                key={asset.id || asset.guid || index}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleRowClick(asset.id || asset.guid, asset)}>
                <CTableTd>{asset.units || asset.unit_number || "N/A"}</CTableTd>
                <CTableTd>{asset.type || asset.asset_type || "N/A"}</CTableTd>
                <CTableTd>{asset.make || "N/A"}</CTableTd>
                <CTableTd>
                  {asset.fuel_types_id_data?.name || asset.fuel_type || "N/A"}
                </CTableTd>
                <CTableTd>
                  {asset.model_year || asset.modelYear || asset.year || "N/A"}
                </CTableTd>
                <CTableTd>
                  {asset.licence_plate || asset.licence_plate || "N/A"}
                </CTableTd>
                <CTableTd>{asset.vin_number || "N/A"}</CTableTd>
                <CTableTd>
                  <Badge
                    colorScheme={getVerificationStatusColor(
                      asset.status || asset.status
                    )}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    {Array.isArray(asset.status || asset.status)
                      ? (asset.status || asset.status)[0] || "N/A"
                      : asset.status || asset.status || "N/A"}
                  </Badge>
                </CTableTd>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </Box>

      <AddAssetsModal
        isOpen={isAddAssetsModalOpen}
        onClose={() => setIsAddAssetsModalOpen(false)}
      />
    </Box>
  );
};

export default TractorsTab;
