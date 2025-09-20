import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import styles from "./style.module.scss";
import PickupFieldsComponent from "./PickupFieldsComponent";

function PickupFields({control, index, removePickup, field}) {
  return (
    <Accordion
      overflow="hidden"
      my="24px"
      border="1px solid #E9EAEB"
      borderRadius="12px"
      allowToggle>
      <AccordionItem borderTopRadius="12px">
        <AccordionButton
          className={
            field.type?.[0] === "pickup"
              ? styles.pickupAccordionButton
              : styles.deliveryAccordionButton
          }
          id="pickup-accordion"
          borderTopRadius="12px"
          borderBottom="1px solid #D5D7DA">
          <Flex
            alignItems="center"
            gap="8px"
            flex="1"
            borderTopRadius="12px"
            textAlign="left">
            <Text fontWeight="600" fontSize="18px" color="#181D27">
              {field.type?.[0] === "pickup" ? "Pickup" : "Delivery"}
            </Text>
            <Flex
              width="24px"
              height={"22px"}
              border="1px solid #3E4784"
              alignItems="center"
              justifyContent="center"
              borderRadius={"50%"}
              fontSize="12px"
              fontWeight="500"
              color="#363F72">
              {index + 1}
            </Flex>
          </Flex>

          <AccordionIcon style={{width: "30px", height: "30px"}} />
          <Button
            onClick={removePickup}
            bg="transparent"
            _hover={{bg: "transparent"}}>
            <img
              src="/img/delete.svg"
              alt="delete"
              width="18px"
              height="18px"
            />
          </Button>
        </AccordionButton>
        <AccordionPanel p="24px">
          <PickupFieldsComponent field={field} control={control} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default PickupFields;
