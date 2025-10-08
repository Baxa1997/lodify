import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Box,
  Flex,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";
import styles from "../style.module.scss";

function MainContent() {
  return (
    <Box className={styles.accordionContainer}>
      <Accordion allowMultiple className={styles.mainAccordion}>
        <AccordionItem className={styles.accordionItem}>
          <AccordionButton className={styles.connectionButton}>
            <Flex justify="space-between" align="center" width="100%">
              <Text fontSize="16px" fontWeight="600" color="#181d27">
                Connection
              </Text>
              <HStack spacing={3}>
                <Text fontSize="14px" color="#6b7280">
                  Completed at 2:28 PM on 26/03/2025
                </Text>
                <AccordionIcon />
              </HStack>
            </Flex>
          </AccordionButton>
          <AccordionPanel className={styles.accordionPanel}>
            <Text>Connection details content here...</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple className={styles.mainAccordion}>
        <AccordionItem className={styles.accordionItem}>
          <AccordionButton className={styles.identityTheftButton}>
            <Flex justify="space-between" align="center" width="100%">
              <Text fontSize="16px" fontWeight="600" color="#181d27">
                Victim of Identity Theft
              </Text>
              <HStack spacing={3}>
                <Badge
                  bg="#10b981"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="12px"
                  fontWeight="500">
                  Victim of Identity Theft
                </Badge>
                <AccordionIcon />
              </HStack>
            </Flex>
          </AccordionButton>
          <AccordionPanel className={styles.accordionPanel}>
            <Text>Identity theft details content here...</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple className={styles.mainAccordion}>
        <AccordionItem className={styles.accordionItem}>
          <AccordionButton className={styles.connectedButton}>
            <Flex justify="space-between" align="center" width="100%">
              <HStack spacing={3}>
                <Box
                  w="24px"
                  h="24px"
                  bg="#10b981"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <CheckIcon color="white" w="12px" h="12px" />
                </Box>
                <VStack align="start" spacing={1}>
                  <Text fontSize="16px" fontWeight="600" color="#181d27">
                    Connected
                  </Text>
                  <Text fontSize="14px" color="#6b7280">
                    The carrier has a connected and active ELD providing a clear
                    physical and digital footprint
                  </Text>
                  <Text fontSize="12px" color="#9ca3af">
                    Connected on 4/2/2025, Updated 13 minutes ago
                  </Text>
                </VStack>
              </HStack>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
          <AccordionPanel className={styles.accordionPanel}>
            <Text>Connection status details content here...</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion allowMultiple className={styles.mainAccordion}>
        <AccordionItem className={styles.accordionItem}>
          <AccordionButton className={styles.assessmentButton}>
            <Flex justify="space-between" align="center" width="100%">
              <Text fontSize="16px" fontWeight="600" color="#181d27">
                Assessment
              </Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>
          <AccordionPanel className={styles.assessmentPanel}>
            <Flex gap={6}>
              <Box flex={1}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontSize="16px" fontWeight="600" color="#181d27">
                    Assessment
                  </Text>
                  <Badge
                    bg="#10b981"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="12px"
                    fontWeight="500">
                    Pass
                  </Badge>
                </Flex>
                <VStack align="start" spacing={2}>
                  <HStack spacing={2}>
                    <CheckIcon color="#10b981" w="16px" h="16px" />
                    <Text fontSize="14px" color="#181d27">
                      Base Risk Assessment
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    <CheckIcon color="#10b981" w="16px" h="16px" />
                    <Text fontSize="14px" color="#181d27">
                      High Value
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    <CheckIcon color="#10b981" w="16px" h="16px" />
                    <Text fontSize="14px" color="#181d27">
                      Temperature Controlled
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <Box flex={1}>
                <Text fontSize="16px" fontWeight="600" color="#181d27" mb={4}>
                  Load Limit
                </Text>
                <Box
                  h="120px"
                  bg="#f9fafb"
                  borderRadius="8px"
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Text fontSize="14px" color="#6b7280">
                    Chart placeholder - Jan to Dec timeline
                  </Text>
                </Box>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default MainContent;
