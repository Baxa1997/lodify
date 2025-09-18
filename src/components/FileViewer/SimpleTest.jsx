import React, {useState} from "react";
import {Box, Button, VStack, Text, useDisclosure} from "@chakra-ui/react";
import FileViewer from "./index";

const SimpleTest = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testImages = [
    {
      src: "https://picsum.photos/800/600?random=1",
      alt: "Test Image 1",
      title: "Beautiful Landscape",
    },
    {
      src: "https://picsum.photos/800/600?random=2",
      alt: "Test Image 2",
      title: "City Skyline",
    },
  ];

  const handleOpen = (index = 0) => {
    setSelectedIndex(index);
    onOpen();
  };

  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Simple FileViewer Test
        </Text>

        <Button colorScheme="blue" onClick={() => handleOpen(0)}>
          Open First Image
        </Button>

        <Button colorScheme="green" onClick={() => handleOpen(1)}>
          Open Second Image
        </Button>

        <Text fontSize="sm" color="gray.600" textAlign="center">
          Click the buttons above to test the FileViewer with Chakra UI Dialog
        </Text>
      </VStack>

      <FileViewer
        isOpen={isOpen}
        onClose={onClose}
        images={testImages}
        initialIndex={selectedIndex}
      />
    </Box>
  );
};

export default SimpleTest;
