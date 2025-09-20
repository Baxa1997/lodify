import React from "react";
import {useFieldArray} from "react-hook-form";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import PickupFields from "./PickupFields";

function AddressSection({control, isLoading = false, onCancel}) {
  const {fields, append, remove} = useFieldArray({
    control,
    name: "driver_order_items",
  });

  return (
    <Box>
      {fields.map((field, index) => (
        <PickupFields
          key={field.id}
          control={control}
          index={index}
          removePickup={remove}
          field={field}
        />
      ))}

      <Flex
        mt="20px"
        borderTop="1px solid #E9EAEB"
        pt="20px"
        gap="12px"
        justifyContent="space-between">
        <Box>
          {" "}
          <Button
            mr={2}
            colorScheme="blue"
            bg="transparent"
            border="1px solid #84CAFF"
            _hover={{bg: "transparent"}}
            borderRadius="8px"
            p="10px 16px"
            onClick={() =>
              append({
                type: ["Pickup"],
                name: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
              })
            }>
            <img
              src="/img/addIconColor.svg"
              alt="add"
              width="14px"
              height="14px"
            />
            <Text ml="6px" fontSize="14px" fontWeight="600" color="#175CD3">
              Add Pickup
            </Text>
          </Button>
          <Button
            colorScheme="green"
            border="1px solid #84CAFF"
            bg="transparent"
            _hover={{bg: "transparent"}}
            borderRadius="8px"
            fontSize="14px"
            fontWeight="600"
            color="#175CD3"
            p="10px 16px"
            onClick={() =>
              append({
                type: ["Delivery"],
                name: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
              })
            }>
            <img
              src="/img/addIconColor.svg"
              alt="add"
              width="14px"
              height="14px"
            />
            <Text ml="6px" fontSize="14px" fontWeight="600" color="#175CD3">
              Add Delivery
            </Text>
          </Button>
        </Box>

        <Box>
          <Button
            type="button"
            w="80px"
            border="1px solid #E9EAEB"
            borderRadius="8px"
            bg="transparent"
            mr="12px"
            _hover={{bg: "transparent"}}
            onClick={onCancel}
            isDisabled={isLoading}>
            <Text ml="6px" fontSize="14px" fontWeight="600" color="#A4A7AE">
              Cancel
            </Text>
          </Button>
          <Button
            w="80px"
            type="submit"
            _hover={{bg: "#1570EF"}}
            bg="#1570EF"
            loadingText="Saving..."
            isDisabled={isLoading}>
            <Text ml="6px" fontSize="14px" fontWeight="600" color="#fff">
              {isLoading ? "Saving..." : "Save"}
            </Text>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default AddressSection;
