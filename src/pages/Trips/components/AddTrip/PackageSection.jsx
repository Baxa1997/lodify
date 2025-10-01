import React, {useState} from "react";
import {Box, Flex, Text, Radio, RadioGroup, Stack} from "@chakra-ui/react";
import {Controller} from "react-hook-form";

const PackageSection = ({control}) => {
  const [selectedPackage, setSelectedPackage] = useState("core");

  const packages = [
    {
      id: "core",
      title: "Core",
      description: "Visibility + basic fraud prevention without heavy gates",
      price: "$15 per Load",
      icon: "📊",
    },
    {
      id: "high-value",
      title: "High-Value",
      description:
        "3-of-N consensus, insurance-gated release, team enforcement",
      price: "$30 Per Load",
      icon: "👥",
    },
    {
      id: "secure",
      title: "Secure",
      description: "Lock PU#/DEL numbers to presence; enforce asset checks",
      price: "$45 Per Load",
      icon: "🛡️",
    },
    {
      id: "ultra-secure",
      title: "Ultra-Secure",
      description: "Max gates, corridor rules, ELD session/HOS gating included",
      price: "$60 Per Load",
      icon: "⚡",
    },
  ];

  return (
    <Box mb="32px" mt="24px">
      <Text fontSize="24px" fontWeight="600" color="#181D27" mb="8px">
        Choose the Right Plan for Your Freight
      </Text>
      <Text fontSize="16px" color="#717680" mb="24px">
        From standard shipments to high-value cargo, Lodify offers tiered
        protection to fit your needs.
      </Text>

      <Controller
        name="package_plan"
        control={control}
        defaultValue="core"
        render={({field}) => (
          <RadioGroup
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              setSelectedPackage(value);
            }}>
            <Flex gap="16px" flexWrap="wrap">
              {packages.map((pkg) => (
                <Box
                  key={pkg.id}
                  flex="1"
                  minW="280px"
                  maxW="320px"
                  p="24px"
                  bg="white"
                  borderRadius="12px"
                  border="2px solid"
                  borderColor={
                    selectedPackage === pkg.id ? "#FF6B35" : "#E9EAEB"
                  }
                  position="relative"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor:
                      selectedPackage === pkg.id ? "#FF6B35" : "#D5D7DA",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => {
                    field.onChange(pkg.id);
                    setSelectedPackage(pkg.id);
                  }}>
                  {/* Radio Button */}
                  <Radio
                    value={pkg.id}
                    position="absolute"
                    top="16px"
                    right="16px"
                    colorScheme="orange"
                    size="lg"
                  />

                  {/* Icon */}
                  <Box
                    fontSize="32px"
                    mb="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="48px"
                    h="48px"
                    bg={selectedPackage === pkg.id ? "#FFF4F0" : "#F8F9FA"}
                    borderRadius="8px">
                    {pkg.icon}
                  </Box>

                  {/* Title */}
                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color="#181D27"
                    mb="8px">
                    {pkg.title}
                  </Text>

                  {/* Description */}
                  <Text
                    fontSize="14px"
                    color="#717680"
                    mb="16px"
                    lineHeight="1.5"
                    minH="42px">
                    {pkg.description}
                  </Text>

                  {/* Price */}
                  <Text
                    fontSize="16px"
                    fontWeight="600"
                    color="#181D27"
                    mb="12px">
                    {pkg.price}
                  </Text>

                  {/* More Details Link */}
                  <Text
                    fontSize="14px"
                    color="#FF6B35"
                    fontWeight="500"
                    cursor="pointer"
                    _hover={{
                      textDecoration: "underline",
                    }}>
                    More Details
                  </Text>
                </Box>
              ))}
            </Flex>
          </RadioGroup>
        )}
      />
    </Box>
  );
};

export default PackageSection;
