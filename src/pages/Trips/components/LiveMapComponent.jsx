import React, {useMemo, useState} from "react";
import GoogleMapReact from "google-map-react";
import {Box, Button, Flex, Text, Tooltip} from "@chakra-ui/react";
import styles from "../style.module.scss";

const initialStops = [
  {
    address: "asdf dsaf sdfa asdf ",
    city: "qattadur",
    country: "qatdur ",
    date_time: "2025-09-01T03:45:00",
    files: null,
    images: [
      "https://cdn.u-code.io/3cab0a2e-1d20-40a1-8b46-8b4d1a66f2f1/media/4989a90b-b7f4-4470-886d-a98b5b6f488e_Screenshotfrom2025-09-1707-53-58.png",
    ],
    location: null,
    note: "asdfasdfda dfas dfasd ",
    status: ["Arrival"],
  },
  {
    address: "asdf",
    city: "asdf",
    country: "asdf",
    date_time: "2025-09-02T02:50:00",
    files: [
      "https://cdn.u-code.io/3cab0a2e-1d20-40a1-8b46-8b4d1a66f2f1/media/112b6e70-1cc7-4ca8-8ddf-106f9e3b3ed2_Screenshotfrom2025-09-1516-12-20.png",
    ],
    images: null,
    location: null,
    note: "nma",
    status: ["Stopped"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-03T03:51:00",
    files: null,
    images: null,
    location: null,
    note: "asdfdf",
    status: ["Departure"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-04T04:32:00",
    files: null,
    images: null,
    location: null,
    note: "asdfasdfsadfsad dsfa dsf sdfa ",
    status: ["Stopped"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-05T04:34:00",
    files: null,
    images: null,
    location: null,
    note: null,
    status: ["Arrival"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-06T04:34:00",
    files: null,
    images: null,
    location: null,
    note: "nmadur note nmadur note 111",
    status: null,
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-07T04:35:00",
    files: null,
    images: null,
    location: null,
    note: "note note note 22",
    status: null,
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-08T04:35:00",
    files: null,
    images: null,
    location: null,
    note: "",
    status: ["Departure"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-09T04:35:00",
    files: null,
    images: null,
    location: null,
    note: "",
    status: ["Stopped"],
  },
  {
    address: null,
    city: null,
    country: null,
    date_time: "2025-09-10T04:36:00",
    files: null,
    images: null,
    location: null,
    note: null,
    status: ["Arrival"],
  },
  {
    address: "dd",
    city: "dddddd",
    country: "ddd",
    date_time: "2025-09-19T03:51:00",
    files: null,
    images: null,
    location: null,
    note: "kimdur",
    status: ["Completed"],
  },
];

const LocationMarker = ({lat, lng, onClick}) => (
  <div className={styles.marker} onClick={onClick}>
    <div className={styles.markerInner}>
      <div className={styles.markerDot}></div>
    </div>
  </div>
);

function LiveMapComponent() {
  const [latitude, setLatitude] = useState(37.422);
  const [longitude, setLongitude] = useState(-122.0862);

  const dateTimeMap = useMemo(() => {
    return initialStops
      ?.filter((item) => item.status?.[0])
      .map((stop) => ({
        [stop.status?.[0] ?? "Note"]: stop.date_time,
      }));
  }, [initialStops]);

  const timelineEvents = useMemo(() => {
    const stopsWithStatus = initialStops.filter((s) => s.status?.[0]);
    if (!stopsWithStatus.length) return [];
    const count = stopsWithStatus.length;
    return stopsWithStatus.map((s, idx) => {
      const percent = (idx / (count - 1)) * 100; // equal spacing
      return {
        status: s.status[0],
        date_time: s.date_time,
        percent,
      };
    });
  }, []);

  const stoppedSegments = useMemo(() => {
    const stopsWithStatus = initialStops.filter((s) => s.status?.[0]);
    if (stopsWithStatus.length < 2) return [];

    const startTime = new Date(stopsWithStatus[0].date_time).getTime();
    const endTime = new Date(
      stopsWithStatus[stopsWithStatus.length - 1].date_time
    ).getTime();
    const totalTime = endTime - startTime;

    const segs = [];
    for (let i = 1; i < stopsWithStatus.length; i++) {
      const prevTime = new Date(stopsWithStatus[i - 1].date_time).getTime();
      const currTime = new Date(stopsWithStatus[i].date_time).getTime();
      if (stopsWithStatus[i].status?.[0] === "Stopped") {
        // segment start/end percent relative to total time
        const left = ((prevTime - startTime) / totalTime) * 100;
        const width = ((currTime - prevTime) / totalTime) * 100;
        segs.push({left, width});
      }
    }
    return segs;
  }, [initialStops]);

  console.log("dateTimeMapdateTimeMap", dateTimeMap);
  return (
    <>
      <Box
        width="100%"
        overflow="hidden"
        height="410px"
        borderRadius="12px"
        border="1px solid #E2E8F0">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCMunNEPgmmEcQ1wvtwmuHNqcosmmBNFeU",
          }}
          defaultCenter={{
            lat: latitude ?? 37.422,
            lng: longitude ?? -122.0862,
          }}
          defaultZoom={11}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            mapTypeId: "roadmap",
          }}>
          <LocationMarker
            lat={latitude ?? 37.422}
            lng={longitude ?? -122.0862}
            onClick={() => {}}
          />
        </GoogleMapReact>
      </Box>

      <Flex justifyContent="space-between" alignItems="center" mt="12px">
        <Text p="6px 12px" borderRadius="8px" border="1px solid #E2E8F0">
          Jun 25, 09:48 +05
        </Text>
        <Box>
          <Button
            px="10px"
            bg="transparent"
            border="none"
            _hover={{bg: "transparent"}}>
            <img src="/img/arrow-left-double.svg" alt="" />
          </Button>
          <Button
            px="10px"
            bg="transparent"
            border="none"
            _hover={{bg: "transparent"}}>
            <img src="/img/play.svg" alt="" />
          </Button>
          <Button
            px="10px"
            bg="transparent"
            border="none"
            _hover={{bg: "transparent"}}>
            <img src="/img/arrow-right-double.svg" alt="" />
          </Button>
        </Box>

        <Box>
          <Button
            px="12px"
            bg={"none"}
            border="1px solid #D5D7DA"
            _hover={{bg: "none"}}>
            1x
          </Button>
          <Button
            ml="10px"
            px="12px"
            bg={"none"}
            border="1px solid #D5D7DA"
            _hover={{bg: "none"}}>
            <img src="/img/refreshIcon.svg" alt="" />
          </Button>
        </Box>
      </Flex>

      <Box mt="16px" width="96%" m={"0 6px"} position="relative" height="80px">
        <Box
          position="absolute"
          top="40px"
          left="0"
          width="100%"
          height="8px"
          bg="#E2E8F0"
          borderRadius="4px"
        />

        {stoppedSegments.map((seg, idx) => (
          <Box
            key={idx}
            position="absolute"
            top="40px"
            left={`${seg.left}%`}
            width={`${seg.width}%`}
            height="8px"
            bg="#4A5568"
            borderRadius="4px"
          />
        ))}

        {timelineEvents.map((ev, idx) => (
          <Box key={idx}>
            <Tooltip
              label={`${ev.status} – ${new Date(
                ev.date_time
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}, ${new Date(ev.date_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
              fontSize="sm"
              hasArrow>
              <Box
                position="absolute"
                top="28px"
                left={`${ev.percent}%`}
                transform="translate(-50%, -50%)"
                width="10px"
                height="10px"
                bg="#2D3748"
                borderRadius="2px"
                cursor="pointer"
              />
            </Tooltip>
            <Text
              position="absolute"
              top="55px"
              left={`${ev.percent}%`}
              transform="translateX(-50%)"
              fontSize="10px"
              color="#2D3748"
              whiteSpace="nowrap">
              {new Date(ev.date_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default LiveMapComponent;
