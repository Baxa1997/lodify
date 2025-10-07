import styles from "./style.module.scss";
import {Box, Button, Text, HStack, VStack, Flex} from "@chakra-ui/react";
import StarRating from "../../../../components/Rating";
import {FiPhone, FiMail, FiMapPin} from "react-icons/fi";
import {FaCheck, FaTimes} from "react-icons/fa";

export const CompanyInfo = () => {
  const companyData = {
    name: "Nussabaum Transportation Service Inc",
    rating: 5,
    ids: "TX 6912286 / DOT 00071317 / MC 120436 / SCAC - NUSH / SCAC - NUST",
    phone: "+1 (309) 319-9295",
    email: "nussabaum@lodify.io",
    address: "19336 N 1425 EAST RD HUDSON, IL 61748",
    metrics: [
      {label: "Common", value: "+1 (309) 319-9295", status: "success"},
      {label: "Broker", value: "Inactive", status: "error"},
      {label: "Safety Rating", value: "Satisfactory", status: "success"},
      {label: "ELD", value: "Geotab", status: "success"},
      {label: "Contract", value: "24+ months", status: "success"},
      {label: "Operating Status", value: "Property", status: "success"},
      {label: "Certifications", value: "Smartway", status: "success"},
      {label: "TIN", value: "Verified", status: "success"},
    ],
    equipment: [
      {type: "Power Units", count: "670", image: "/img/truck.svg"},
      {type: "Dry Van", count: "670", image: "/img/trailerImage.svg"},
      {type: "Uncategorized", count: "670", image: "/img/trailerImage.svg"},
      {type: "Box Trucks", count: "670", image: "/img/truck.svg"},
      {type: "Flat Bed", count: "9", image: "/img/trailerImage.svg"},
      {type: "Heavy Haul", count: "1", image: "/img/trailerImage.svg"},
      {type: "Low Boy", count: "1", image: "/img/trailerImage.svg"},
    ],
    resources: [
      {type: "Power Units", count: "670", image: "/img/truck.svg"},
      {type: "Solo Drivers", count: "9", image: "/img/user.svg"},
      {type: "Team Drivers", count: "1", image: "/img/user.svg"},
      {type: "Trailers", count: "80", image: "/img/trailerImage.svg"},
      {type: "Box Trucks", count: "670", image: "/img/truck.svg"},
    ],
  };

  const getTypeImage = (type) => {
    switch (type) {
      case "Power Units":
        return <img src="/img/powerUnit.svg" alt="Power Units" />;
      case "Box Trucks":
        return <img src="/img/boxTrucks.svg" alt="Box Trucks" />;
      case "Low Boy":
        return <img src="/img/lowBoy.svg" alt="Low Boy" />;
      case "Heavy Haul":
        return <img src="/img/heavyHaul.svg" alt="Heavy Haul" />;
      case "Flat Bed":
        return <img src="/img/flatBed.svg" alt="Flat Bed" />;
      default:
        return <img src="/img/dryVan.svg" alt="Dry Van" />;
    }
  };

  const PowerUnits = [
    {
      title: "Power Units",
      count: "670",
    },
    {
      title: "Dry Van",
      count: "9",
    },
    {
      title: "Uncategorized",
      count: "1",
    },
    {
      title: "Box Trucks",
      count: "80",
    },
    {
      title: "Flat Bed",
      count: "670",
    },
    {
      title: "Heavy Haul",
      count: "670",
    },
    {
      title: "Low Boy",
      count: "670",
    },
  ];

  const StatusIcon = ({status}) => {
    return status === "success" ? (
      <Flex
        w="17px"
        h="17px"
        borderRadius="50%"
        bg="#EDFCF2"
        justifyContent="center"
        alignItems="center">
        <FaCheck color="#22C55E" size={12} />
      </Flex>
    ) : (
      <Flex
        w="17px"
        h="17px"
        borderRadius="50%"
        bg="#FFEBEA"
        justifyContent="center"
        alignItems="center">
        <FaTimes color="#FF3B30" size={12} />
      </Flex>
    );
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.headerSection}>
        <Box className={styles.companyHeader}>
          <VStack align="flex-start" spacing={3}>
            <StarRating value={companyData.rating} size={20} />
            <Text fontSize="24px" fontWeight="bold" color="gray.800">
              {companyData.name}
            </Text>
            <Text fontSize="14px" color="gray.600">
              {companyData.ids}
            </Text>
          </VStack>
          <Button
            bg="#F97316"
            color="white"
            _hover={{bg: "#EA580C"}}
            px={4}
            py={3}
            borderRadius="8px"
            fontSize="14px"
            fontWeight="600">
            Connect Carrier
          </Button>
        </Box>

        <Box className={styles.contactsSection}>
          <Text fontSize="16px" fontWeight="400" mb={"16px"} color="#535862">
            Dispatch Contacts
          </Text>
          <VStack align="flex-start" flexDir={"row"} spacing={"24px"}>
            <HStack spacing={3}>
              <img src="/img/phone.svg" alt="phone" />
              <Text fontSize="14px" color="#181D27" fontWeight="500">
                {companyData.phone}
              </Text>
            </HStack>
            <HStack spacing={3}>
              <img src="/img/mailpin.svg" alt="mail" />
              <Text fontSize="14px" color="#181D27" fontWeight="500">
                {companyData.email}
              </Text>
            </HStack>
            <HStack spacing={3}>
              <img src="/img/markerPin.svg" alt="map" />
              <Text fontSize="14px" color="#181D27" fontWeight="500">
                {companyData.address}
              </Text>
            </HStack>
          </VStack>
        </Box>

        <Box className={styles.metricsSection}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            gap={6}
            bg="white"
            borderRadius="12px">
            {companyData.metrics.map((metric, index) => (
              <Flex key={index} alignItems="center" gap="6px">
                <Flex flexDir={"row"} alignItems="center" gap="6px">
                  <Text h="20px" fontSize="14px" color="#535862">
                    {metric.label}:
                  </Text>
                  <Text
                    h="20px"
                    fontSize="14px"
                    fontWeight="500"
                    color="#181D27">
                    {metric.value}
                  </Text>
                </Flex>
                <StatusIcon status={metric.status} />
              </Flex>
            ))}
          </Box>
        </Box>

        <Flex borderBottom="1px solid #E9EAEB" py="16px">
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap="12px"
            width="100%">
            {PowerUnits.map((unit, index) => (
              <Flex
                key={index}
                bg="#EAF9F4"
                borderRadius="8px"
                border="1px solid #E9EAEB"
                justifyContent="space-between"
                p="14px 14px 14px 16px">
                <Box>
                  <Text color="#535862" fontSize="16px">
                    {unit.title}
                  </Text>
                  <Text color="#181D27" fontSize="22px" fontWeight="500">
                    {unit.count}
                  </Text>
                </Box>
                <Box>{getTypeImage(unit.title)}</Box>
              </Flex>
            ))}
          </Box>
        </Flex>

        <Box borderBottom="1px solid #E9EAEB" py="16px">
          <Text mb="16px" fontSize={"16px"} color="#181D27" fontWeight={600}>
            Verified Carrier Resources on Lodify
          </Text>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap="12px"
            width="100%">
            {PowerUnits.map((unit, index) => (
              <Flex
                key={index}
                bg="#EAF9F4"
                borderRadius="8px"
                border="1px solid #E9EAEB"
                justifyContent="space-between"
                p="14px 14px 14px 16px">
                <Box>
                  <Text color="#535862" fontSize="16px">
                    {unit.title}
                  </Text>
                  <Text color="#181D27" fontSize="22px" fontWeight="500">
                    {unit.count}
                  </Text>
                </Box>
                <Box>{getTypeImage(unit.title)}</Box>
              </Flex>
            ))}
          </Box>
        </Box>

        <Box py="16px">
          <Text mb="16px" fontSize={"16px"} color="#181D27" fontWeight={600}>
            Carrier’s Performance Score on Lodify
          </Text>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap="12px"
            width="100%"></Box>
        </Box>
      </Box>
    </Box>
  );
};
