import clsx from "clsx";
import styles from "./style.module.scss";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

<<<<<<< HEAD
export const SectionCard = ({
  children,
  isAccordion,
  variant = "default",
  onChange = () => {},
  ...props
}) => {
  if (isAccordion) {
    return (
      <Accordion allowMultiple allowToggle onChange={onChange}>
        <AccordionItem
          border="none"
          className={clsx(styles.sectionCard, styles[variant])}
          {...props}>
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {isAccordion})
=======
export const SectionCard = ({ children, isAccordion, variant = "default", onChange = () => {}, defaultIndex, ...props }) => {

  if(isAccordion) {
    return <Accordion
      allowMultiple
      onChange={onChange}
      defaultIndex={defaultIndex}
    >
      <AccordionItem
        border="none"
        className={clsx(styles.sectionCard, styles[variant])}
        {...props}>
        {
          React.Children.map(children, (child) => (
            React.isValidElement(child) 
              ? React.cloneElement(child, { isAccordion })
>>>>>>> 466409f9cf3d4b984c210d6f7a72c62c47ecddd1
              : child
          )}
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Box className={clsx(styles.sectionCard, styles[variant])} {...props}>
      {children}
    </Box>
  );
};

export const SectionCardHeader = ({children, isAccordion, ...props}) => {
  if (isAccordion) {
    return (
      <AccordionButton {...props}>
        <Box width="100%" textAlign="left">
          {children}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    );
  }

  return <Box {...props}>{children}</Box>;
};

export const SectionCardBody = ({children, isAccordion, ...props}) => {
  if (isAccordion) {
    return <AccordionPanel {...props}>{children}</AccordionPanel>;
  }

  return <Box {...props}>{children}</Box>;
};
