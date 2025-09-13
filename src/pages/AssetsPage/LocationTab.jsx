import React, {useState, useCallback, useRef} from "react";
import {Box, Flex, Text, Badge, Icon, Button} from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import {
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaCar,
  FaClock,
  FaCrosshairs,
} from "react-icons/fa";
import {format} from "date-fns";
import styles from "./LocationTab.module.scss";
import assetsService from "../../services/assetsService";
import {useQuery} from "@tanstack/react-query";
import {useLocation} from "react-router-dom";

const LocationMarker = ({lat, lng, onClick}) => (
  <div className={styles.marker} onClick={onClick}>
    <div className={styles.markerInner}>
      <div className={styles.markerDot}></div>
    </div>
  </div>
);

const InfoPopup = ({isOpen, onClose, mapData}) => {
  if (!isOpen) return null;

  return (
    <Box className={styles.infoPopup}>
      <Box className={styles.popupHeader}>
        <Text className={styles.driverId}>{mapData?.number}</Text>
        <Box className={styles.closeButton} onClick={onClose}>
          ×
        </Box>
      </Box>

      <Box className={styles.popupContent}>
        <Text className={styles.driverName}>{mapData?.name || "Driver"}</Text>

        <Flex align="center" gap="8px" mb="12px">
          <Box className={styles.statusIndicator}></Box>
          <Text className={styles.statusText}>{mapData?.code}</Text>
        </Flex>

        <Flex align="center" gap="8px" mb="8px">
          <Icon as={FaTachometerAlt} color="#10B981" />
          <Text className={styles.speedText}>{mapData?.speed}</Text>
        </Flex>

        <Flex
          pb="8px"
          borderBottom="1px solid #E2E8F0"
          align="center"
          gap="8px"
          mb="8px">
          <Icon as={FaCar} color="#6B7280" />
          <Text className={styles.mileageText}>{mapData?.odometer}</Text>
        </Flex>

        <Flex align="center" gap="8px">
          <Text>Last updated:</Text>
          <Text className={styles.lastUpdatedText}>
            {mapData?.timestamp
              ? format(new Date(mapData?.timestamp), "MMM d, h:mm a")
              : "N/A"}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

const LocationTab = () => {
  const location = useLocation();
  const asset = location.state?.asset;
  const [showInfoPopup, setShowInfoPopup] = useState(true);
  const mapRef = useRef(null);

  const {data: mapData, isLoading: mapLoading} = useQuery({
    queryKey: ["MAP_INVOKE"],
    queryFn: () =>
      assetsService.mapInovke({
        data: {
          companies_id: asset?.companies_id,
          external_key: asset?.external_key,
          asset_id: asset?.guid,
        },
      }),
    select: (data) => data?.data,
  });

  const parseCoordinate = (value, fallback = 0) => {
    if (!value) return fallback;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  };

  const latitude = parseCoordinate(mapData?.[0]?.latitude, 35.1495);
  const longitude = parseCoordinate(mapData?.[0]?.longitude, -90.049);

  // Map load handler
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Focus on asset location
  const focusOnAssetLocation = useCallback(() => {
    if (mapRef.current && latitude && longitude) {
      mapRef.current.panTo({lat: latitude, lng: longitude});
      mapRef.current.setZoom(15); // Zoom level for detailed view
    }
  }, [latitude, longitude]);

  if (mapLoading) {
    return (
      <Box
        className={styles.mapContainer}
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Text>Loading map data...</Text>
      </Box>
    );
  }

  return (
    <Box className={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCMunNEPgmmEcQ1wvtwmuHNqcosmmBNFeU",
        }}
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
        defaultZoom={11}
        onGoogleApiLoaded={({map}) => onMapLoad(map)}
        options={{
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          mapTypeId: "roadmap",
        }}>
        <LocationMarker
          lat={latitude}
          lng={longitude}
          onClick={() => {
            setShowInfoPopup(true);
          }}
        />
      </GoogleMapReact>

      <Button
        className={styles.focusButton}
        onClick={focusOnAssetLocation}
        size="sm"
        width="40px"
        height="40px"
        borderRadius="none"
        variant="solid"
        backgroundColor="#fff"
        position="absolute"
        top="77%"
        right="10px"
        zIndex="10">
        <Icon fontSize="20px" color="#666666" as={FaCrosshairs} />
      </Button>

      <InfoPopup
        mapData={mapData?.[0]}
        isOpen={showInfoPopup}
        onClose={() => setShowInfoPopup(false)}
      />
    </Box>
  );
};

export default LocationTab;
