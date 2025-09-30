import React, { useEffect, useState } from "react";
import styles from "../style.module.scss";
import { Flex, Box, Text, Button, Badge, useToast } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { getShortFileName } from "./mockElements";
import FilesReader from "../../../components/FileViewer/FilesReader";
import { getHoursMinutesDifference } from "../../../utils/getHoursDifference";
import { format } from "date-fns";
import { isValid } from "date-fns";
import fileService from "@services/fileService";
import HFFileUpload from "@components/HFFileUpload";
import { useForm } from "react-hook-form";
import { useCreateItemMutation } from "@services/items.service";
import { useGetCompanyId } from "@hooks/useGetCompanyId";

function RouteInfoComponent({ tripData = {} }) {
  const [isFilesReaderOpen, setIsFilesReaderOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { last_statuses, end_trip_point } = tripData;

  const companyId = useGetCompanyId();

  const { control, watch, setValue } = useForm();

  const getStatusColor = (status) => {
    if (status === "Completed") return "green";
    if (status === "Arrival") return "yellow";
    if (status === "Pending") return "red";
    return "gray";
  };

  const handleFilesReaderOpen = (file) => {
    setSelectedFile(file);
    setIsFilesReaderOpen(true);
  };

  const handleFilesReaderClose = () => {
    setIsFilesReaderOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const createFileItemMutation = useCreateItemMutation({
    onSuccess: () => {
      toast({
        status: "success",
        description: "Successfully uploaded",
        position: "top-right",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpload = (data) => {
    setLoading(true);
    fileService.folderUpload(data)
      .then(res => {
        setValue("file", res.file_name_download);
        createFileItemMutation.mutate({
          slug: "upload_files",
          data: {
            data: {
              companies_id: companyId,
              file: `https://cdn.u-code.io/${res.link}`,
            },
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Flex
        w="100%"
        borderBottom={"1px solid #D5D7DA"}
        p={"20px"}>
        <Flex
          w="100%"
          h={"28px"}
          alignItems={"center"}
          gap={"10px"}
          justifyContent={"space-between"}>
          <Text
            color={"#181D27"}
            fontSize={"16px"}
            fontWeight={"600"}>
            {tripData?.id}
          </Text>
          <Button
            minW={"20px"}
            h={"20px"}
            p="0"
            bg={"none"}
            _hover={{ bg: "none" }}>
            <img
              src="/img/threeDots.svg"
              alt="arrowRight" />
          </Button>
        </Flex>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={"10px"}
        px={"20px"}
        pt={"20px"}>
        <Text
          fontSize={"16px"}
          color={"#414651"}
          fontWeight={"600"}>
          Current Status
        </Text>
        <Badge
          w="94px"
          p={"2px 10px"}
          fontSize={"12px"}
          fontWeight={"500"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={"8px"}
          colorScheme={getStatusColor(tripData?.order_status?.[0])}>
          {tripData?.order_status?.[0]}
        </Badge>
      </Flex>

      {/* STATUS & ETA */}
      <Box
        borderRadius={"8px"}
        m="20px"
        h={"136px"}
        border={"1px solid #D5D7DA"}
        bg={"#FAFAFA"}
        p={"16px 14px"}>
        <VStack
          align="start"
          spacing={1}
          h="full">
          <Flex
            align="center"
            gap={1}>
            <Box
              fontSize="12px"
              w="24px"
              h="20px"
              bg="#E3F2FD"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center">
              {last_statuses?.[0]?.index}
            </Box>
            <Text
              fontSize="14px"
              color="#181D27">
              {last_statuses?.[0]?.address}
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
              {last_statuses?.[1]?.index}
            </Box>

            <Text
              fontSize="14px"
              color="#181D27">
              {last_statuses?.[1]?.address}
            </Text>
          </Flex>

          <Text
            fontSize="14px"
            color="#414651">
            Completed{" "}
            {isValid(last_statuses?.[1]?.date_time)
              ? format(last_statuses?.[1]?.date_time, "MMM d HH:mm")
              : "Invalid Date"}{" "}
            PDT
          </Text>

          <Flex
            h="20px"
            align="center"
            gap={2}>
            <Text
              fontSize="14px"
              fontWeight={"400"}
              color="#535862">
              ETA{" "}
              {tripData?.eta && isValid(tripData?.eta)
                ? format(tripData?.eta, "MMM d HH:mm")
                : "Invalid Date"}{" "}
              PDT
            </Text>
          </Flex>

          <Text
            fontSize="12px"
            color="#414651">
            {getHoursMinutesDifference(
              last_statuses?.[0]?.date_time,
              last_statuses?.[1]?.date_time,
            )}
          </Text>
        </VStack>
      </Box>

      {/* TRIP STATUS & PDT */}
      <Box
        p="14px 10px"
        borderRadius={"8px"}
        m="20px"
        minH={"144px"}
        maxH={"160px"}
        border={"1px solid #D5D7DA"}
        bg={"#fff"}>
        <Flex
          w="100%"
          h="28px"
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <img
            src="/img/mapping.svg"
            width="23px"
            height="23px"
            alt="clock" />
          <Text
            fontSize="14px"
            color="#181D27"
            fontWeight={"400"}>
            PDT
          </Text>
        </Flex>

        <Text
          h="20px"
          mt="8px"
          fontSize="14px"
          color="#194185"
          fontWeight={"500"}>
          {end_trip_point?.[0]?.address}
        </Text>
        <Text
          h="20px"
          fontSize="13px"
          color="#181D27"
          fontWeight={"400"}
          mt="8px">
          {end_trip_point?.[0]?.location ?? "-"}
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
            {tripData?.drivers?.first_name?.[0]}
          </Flex>
          <Box>
            <Text
              fontSize="14px"
              color="#181D27"
              fontWeight={"600"}>
              {`${tripData?.drivers?.first_name ?? ""} ${
                tripData?.drivers?.last_name ?? ""
              }`}
            </Text>
            <Text
              fontSize="12px"
              color="#535862"
              fontWeight={"400"}>
              {tripData?.drivers?.email ?? ""}
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* ACTION BUTTONS */}
      <Box
        className={styles.actionBtns}
        px="20px">
        <Button className={styles.actionBtn}>
          <img
            src="/img/navigation.svg"
            alt="edit" />
          <Text color="#175cd3">Navigation</Text>
        </Button>
        <Button className={styles.actionBtn}>
          <img
            src="/img/timeline.svg"
            alt="delete" />
          <Text color="#175cd3">Timeline</Text>
        </Button>
        <Button className={styles.actionBtn}>
          <img
            src="/img/fullscreen.svg"
            alt="view" />
          <Text color="#175cd3">Fullscreen</Text>
        </Button>
      </Box>

      {/* DOCUMENT LIST & VIEW */}
      <Box className={styles.documentsContainer}>
        <Box className={styles.documentHeader}>
          <Text
            fontSize="16px"
            fontWeight="600"
            color="#181D27">
            Documents
          </Text>
        </Box>

        <Box>
          {tripData?.documents?.map((document, index) => (
            <Box
              className={styles.documentItem}
              key={index}
            >
              <Box className={styles.documentIcon}>
                <img
                  src={document}
                  alt="PDF"
                  width="32px"
                  height="40px" />
              </Box>
              <Box className={styles.documentInfo}>
                <Text className={styles.documentName}>
                  {getShortFileName(document, 10)}
                </Text>
              </Box>
              <button
                className={styles.documentAction}
                onClick={() => handleFilesReaderOpen(document)}>
                View
              </button>
            </Box>
          ))}
        </Box>
        <Box padding="12px">
          <HFFileUpload
            name="file"
            control={control}
            disableRequest
            onChange={handleUpload}
            loading={loading}
          />
        </Box>
        {/* <Button className={styles.actionBtn}>
          <img
            src="/img/navigation.svg"
            alt="edit" />
          <Text color="#175cd3">Upload file</Text>
        </Button> */}
      </Box>

      <FilesReader
        isOpen={isFilesReaderOpen}
        onClose={handleFilesReaderClose}
        file={selectedFile}
      />
    </>
  );
}

export default RouteInfoComponent;
