import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import clsx from "clsx";
import styles from "../style.module.scss";

function MainContent() {
  return (
    <Accordion
      height="93px"
      allowMultiple
      width="100%"
      overflow="hidden"
      // m="24px"
      border="1px solid #E9EAEB"
      borderRadius="12px"
      allowToggle>
      <AccordionItem className={styles.accordionItem}>
        <AccordionButton
          className={styles.pickupAccordionButton}
          id="pickup-accordion"
          borderTopRadius="12px"
          borderBottom="1px solid #D5D7DA">
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p="24px">
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default MainContent;
