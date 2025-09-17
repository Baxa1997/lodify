import React from "react";
import styles from "../style.module.scss";
import {Flex, Box, Text, Button, Badge} from "@chakra-ui/react";
import {VStack} from "@chakra-ui/react";

function RouteInfoComponent() {
  return (
    <>
      <Flex w="100%" borderBottom={"1px solid #D5D7DA"} p={"20px"}>
        <Box>
          <Flex
            w="100%"
            h={"28px"}
            alignItems={"center"}
            gap={"10px"}
            justifyContent={"space-between"}>
            <Text color={"#181D27"} fontSize={"16px"} fontWeight={"600"}>
              111T5NSZ1
            </Text>
            <Button
              minW={"20px"}
              h={"20px"}
              p="0"
              bg={"none"}
              _hover={{bg: "none"}}>
              <img src="/img/threeDots.svg" alt="arrowRight" />
            </Button>
          </Flex>
          <Text w={"95%"} fontSize={"12px"} color={"#535862"}>
            Manage your team members and their account permissions here.
          </Text>
        </Box>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={"10px"}
        px={"20px"}
        pt={"20px"}>
        <Text fontSize={"16px"} color={"#414651"} fontWeight={"600"}>
          Current Status
        </Text>
        <Badge
          w="94px"
          p={"2px 10px"}
          fontSize={"12px"}
          fontWeight={"500"}
          borderRadius={"8px"}
          colorScheme="green">
          Completed
        </Badge>
      </Flex>
      {/* STATUS & ETA */}
      <Box
        borderRadius={"8px"}
        m="20px"
        h={"136px"}
        border={"1px solid #D5D7DA"}
        bg={"#FAFAFA"}
        p={"16px"}>
        <VStack align="start" spacing={1} h="full">
          <Flex align="center" gap={2}>
            <Box
              fontSize="12px"
              w="24px"
              h="24px"
              bg="#E3F2FD"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center">
              2
            </Box>
            <Text fontSize="14px" color="#181D27">
              SAZ2{" "}
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "0 8px",
                }}>
                →
              </span>
            </Text>

            <Box
              fontSize="12px"
              w="24px"
              h="24px"
              bg="#E3F2FD"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center">
              3
            </Box>

            <Text fontSize="14px" color="#181D27">
              DCA2
            </Text>
          </Flex>

          <Text fontSize="14px" color="#414651">
            Completed Jun 24 21:49 PDT
          </Text>

          <Flex h="20px" align="center" gap={2}>
            <Text fontSize="14px" fontWeight={"400"} color="#535862">
              ETA Jun 21:52 PDT
            </Text>
            <Text
              fontSize="14px"
              color="#079455"
              px={2}
              py={1}
              borderRadius="4px">
              1h 10m early
            </Text>
          </Flex>

          <Text fontSize="12px" color="#414651">
            39d 2h 31m - 15 miles
          </Text>
        </VStack>
      </Box>
      {/* TRIP STATUS & PDT */}
      <Box
        p="16px"
        borderRadius={"8px"}
        m="20px"
        h={"144px"}
        border={"1px solid #D5D7DA"}
        bg={"#fff"}>
        <Flex
          w="100%"
          h="28px"
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <img src="/img/mapping.svg" width="23px" height="23px" alt="clock" />
          <Text fontSize="14px" color="#181D27" fontWeight={"400"}>
            PDT
          </Text>
        </Flex>

        <Text
          h="20px"
          mt="8px"
          fontSize="14px"
          color="#194185"
          fontWeight={"500"}>
          DCA2
        </Text>
        <Text
          h="20px"
          fontSize="14px"
          color="#181D27"
          fontWeight={"400"}
          mt="8px">
          33.99277, -117.55142
        </Text>
        <Text
          h="20px"
          fontSize="14px"
          color="#535862"
          fontWeight={"400"}
          mt="8px">
          Trip completed
        </Text>
      </Box>
      {/* PROFILE INFO */}
      <Box
        p="16px"
        borderRadius={"8px"}
        m="20px"
        h={"72px"}
        border={"1px solid #D5D7DA"}
        bg={"#fff"}>
        <Flex>
          <Flex
            w="40px"
            h="40px"
            borderRadius="full"
            alignItems="center"
            justifyContent="center"
            bg="#F5F5F5"
            mr="8px">
            B
          </Flex>
          <Box>
            <Text fontSize="14px" color="#181D27" fontWeight={"600"}>
              Oybek E Karimov
            </Text>
            <Text fontSize="12px" color="#535862" fontWeight={"400"}>
              oybek@eagleyetrucking.com
            </Text>
          </Box>
        </Flex>
      </Box>
      {/* ACTION BUTTONS */}
      <Box className={styles.actionBtns} px="20px">
        <Button className={styles.actionBtn}>
          <img src="/img/navigation.svg" alt="edit" />
          <Text color="#175cd3">Navigation</Text>
        </Button>
        <Button className={styles.actionBtn}>
          <img src="/img/timeline.svg" alt="delete" />
          <Text color="#175cd3">Timeline</Text>
        </Button>
        <Button className={styles.actionBtn}>
          <img src="/img/fullscreen.svg" alt="view" />
          <Text color="#175cd3">Fullscreen</Text>
        </Button>
      </Box>
      {/* DOCUMENT LIST & VIEW */}
      <Box className={styles.documentsContainer}>
        <Box className={styles.documentHeader}>
          <Text fontSize="16px" fontWeight="600" color="#181D27">
            Documents
          </Text>
        </Box>

        <Box>
          <Box className={styles.documentItem}>
            <Box className={styles.documentIcon}>
              <img
                src="/img/pdfFiles.svg"
                alt="PDF"
                width="32px"
                height="40px"
              />
            </Box>
            <Box className={styles.documentInfo}>
              <Text className={styles.documentName}>Rate Confirmation.pdf</Text>
              <Text className={styles.documentDescription}>
                Rate Canfirmation
              </Text>
            </Box>
            <button className={styles.documentAction}>View</button>
          </Box>

          <Box className={styles.documentItem}>
            <Box className={styles.documentIcon}>
              <img
                src="/img/pdfFiles.svg"
                alt="PDF"
                width="32px"
                height="40px"
              />
            </Box>
            <Box className={styles.documentInfo}>
              <Text className={styles.documentName}>photo_2025-08-10.jpg</Text>
              <Text className={styles.documentDescription}>BOL/POD</Text>
            </Box>
            <button className={styles.documentAction}>View</button>
          </Box>

          <Box className={styles.documentItem}>
            <Box className={styles.documentIcon}>
              <img
                src="/img/pdfFiles.svg"
                alt="PDF"
                width="32px"
                height="40px"
              />
            </Box>
            <Box className={styles.documentInfo}>
              <Text className={styles.documentName}>photo_2025-08-10.jpg</Text>
              <Text className={styles.documentDescription}>Other files</Text>
            </Box>
            <button className={styles.documentAction}>View</button>
          </Box>

          <Box className={styles.documentItem}>
            <Box className={styles.documentIcon}>
              <img
                src="/img/filePhoto.svg"
                alt="Image"
                width="32px"
                height="40px"
              />
            </Box>
            <Box className={styles.documentInfo}>
              <Text className={styles.documentName}>photo_2025-08-10.jpg</Text>
              <Text className={styles.documentDescription}>Other files</Text>
            </Box>
            <button className={styles.documentAction}>View</button>
          </Box>

          <Box className={styles.documentItem}>
            <Box className={styles.documentIcon}>
              <img
                src="/img/filePhoto.svg"
                alt="Image"
                width="32px"
                height="40px"
              />
            </Box>
            <Box className={styles.documentInfo}>
              <Text className={styles.documentName}>photo_2025-08-10.jpg</Text>
              <Text className={styles.documentDescription}>Other files</Text>
            </Box>
            <button className={styles.documentAction}>View</button>
          </Box>

          <Box className={styles.documentItem}>
            <Box className={styles.documentIcon}>
              <img
                src="/img/filePhoto.svg"
                alt="Image"
                width="32px"
                height="40px"
              />
            </Box>
            <Box className={styles.documentInfo}>
              <Text className={styles.documentName}>photo_2025-08-10.jpg</Text>
              <Text className={styles.documentDescription}>Other files</Text>
            </Box>
            <button className={styles.documentAction}>View</button>
          </Box>

          <Box className={styles.documentItem}>
            <Box className={styles.documentIcon}>
              <img
                src="/img/pdfFiles.svg"
                alt="PDF"
                width="32px"
                height="40px"
              />
            </Box>
            <Box className={styles.documentInfo}>
              <Text className={styles.documentName}>invoice_000192</Text>
              <Text className={styles.documentDescription}>Invoice</Text>
            </Box>
            <button className={styles.documentAction}>Invoice</button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default RouteInfoComponent;
