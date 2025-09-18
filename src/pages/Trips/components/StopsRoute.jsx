import React, {useState} from "react";
import {Box, Flex, Text, Button, Link} from "@chakra-ui/react";
import {differenceInMinutes, format} from "date-fns";
import {getShortFileName} from "./mockElements";
import FileViewer from "../../../components/FileViewer";

function StopsRoute({stop, index, initialStops}) {
  const lastElement = index === initialStops?.length - 1;
  function formatTimeFromDate(dateObj) {
    return format(dateObj, "HH:mm");
  }
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);

  function getHoursMinutesDifference(dateTimeA, dateTimeB) {
    const d1 = new Date(dateTimeA);
    const d2 = new Date(dateTimeB);

    const totalMinutes = Math.abs(differenceInMinutes(d1, d2));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  }

  return (
    <Box key={index} margin="0 20px 0">
      <Flex gap="12px">
        <Box minW={"80px"}>
          <Text
            h="20px"
            textAlign="end"
            fontSize="14px"
            fontWeight="600"
            color="#414651">
            {formatTimeFromDate(stop.date_time)}
          </Text>
          <Text
            h="20px"
            textAlign="end"
            fontSize="14px"
            fontWeight="400"
            color="#535862">
            {Boolean(initialStops?.[index + 1]?.status?.length) &&
              stop?.date_time &&
              initialStops?.[index + 1]?.date_time &&
              getHoursMinutesDifference(
                stop?.date_time,
                initialStops?.[index + 1]?.date_time
              )}
          </Text>
        </Box>
        <Flex
          flexDirection="column"
          justifyContent={!lastElement ? "center" : "flex-start"}
          alignItems="center">
          {!stop?.status?.[0] ? (
            <Flex
              w="24px"
              h="24px"
              color="#fff"
              justifyContent="center"
              alignItems="center">
              <img src="/img/chat.svg" alt="arrival" />
            </Flex>
          ) : stop?.status?.[0] === "Stopped" ? (
            <Flex
              w="24px"
              h="24px"
              color="#fff"
              justifyContent="center"
              alignItems="center">
              <img src="/img/stopIcon.svg" alt="stop" />
            </Flex>
          ) : (
            <Flex
              w="24px"
              h="24px"
              borderRadius="50%"
              bg="#1570EF"
              color="#fff"
              p="2px 7px"
              fontSize="14px"
              justifyContent="center"
              alignItems="center">
              {index + 1}
            </Flex>
          )}
          {!lastElement && (
            <Box
              h="90%"
              w="2px"
              fontSize="14px"
              fontWeight="600"
              color="#414651"
              m="6px 0px"
              borderRadius="2px"
              bg="#2E90FA"></Box>
          )}
        </Flex>

        <Box width={"100%"} pb="20px">
          <Box mb="12px">
            <Text h="20px" fontSize="14px" fontWeight="600" color="#414651">
              {stop?.status?.[0]}
            </Text>
            <Text h="20px" fontSize="14px" fontWeight="400" color="#535862">
              {stop?.note}
            </Text>
          </Box>

          {/* IF INDEX === 1 or IF THERE IS A IMAGES LIST */}
          {stop?.images?.length > 0 && (
            <Box
              w="100%"
              overflowX="auto"
              mb="6px"
              sx={{
                "&::-webkit-scrollbar": {
                  height: "0px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#c1c1c1",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#a8a8a8",
                },
              }}>
              {stop?.images?.map((image) => (
                <Box
                  width="40px"
                  height="60px"
                  borderRadius="8px"
                  overflow="hidden"
                  onClick={() => {
                    console.log("clicked", isFileViewerOpen);
                    setIsFileViewerOpen(true);
                  }}>
                  <img
                    src={image}
                    alt="image"
                    width="40px"
                    height="60px"
                    style={{objectFit: "cover", height: "60px"}}
                    objectFit="cover"
                  />
                </Box>
              ))}
              {/* </Flex> */}
            </Box>
          )}

          {/* IF THERE A FILE EXIST ATTACHMENTS */}
          {stop?.files?.length > 0 && (
            <Box
              w="100%"
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              gap="6px"
              p="6px"
              overflow="auto"
              mb="6px"
              sx={{
                "&::-webkit-scrollbar": {
                  height: "0px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#c1c1c1",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#a8a8a8",
                },
              }}>
              {stop?.files?.map((file) => (
                <Button
                  as={Link}
                  href={file}
                  target="_blank"
                  borderRadius="9999px"
                  minW="101px"
                  w="max-content"
                  h="28px"
                  p="4px 10px"
                  fontSize="14px"
                  fontWeight="500"
                  gap="4px"
                  color="#414651"
                  variant="outline">
                  <img src="/img/pdfTrip.svg" alt="image" />
                  <Text>{getShortFileName(file)}</Text>
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Flex>
      <FileViewer
        isOpen={isFileViewerOpen}
        onClose={() => setIsFileViewerOpen(false)}
        images={stop?.images}
      />
    </Box>
  );
}

export default StopsRoute;
