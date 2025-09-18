import React, {useState} from "react";
import {Box, Button, VStack, Text, HStack, Image} from "@chakra-ui/react";
import FileViewerV2 from "./FileViewerV2";

const TestV2 = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    {
      src: "https://picsum.photos/800/600?random=3",
      alt: "Test Image 3",
      title: "Ocean View",
    },
  ];

  const handleOpen = (index = 0) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={6}>
        <Text fontSize="3xl" fontWeight="bold" color="gray.800">
          FileViewer V2 - Portal Version
        </Text>

        <Text textAlign="center" color="gray.600" fontSize="lg">
          This version uses Chakra UI Portal for better modal control
        </Text>

        <HStack spacing={4} flexWrap="wrap" justify="center">
          {testImages.map((image, index) => (
            <Box
              key={index}
              position="relative"
              cursor="pointer"
              onClick={() => handleOpen(index)}
              _hover={{transform: "scale(1.02)"}}
              transition="transform 0.2s ease"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              _hover={{boxShadow: "xl"}}>
              <Image
                src={image.src}
                alt={image.alt}
                boxSize="200px"
                objectFit="cover"
              />
              <Box
                position="absolute"
                top={2}
                right={2}
                bg="blackAlpha.600"
                color="white"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="sm"
                fontWeight="medium">
                {index + 1}
              </Box>
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="blackAlpha.600"
                color="white"
                p={2}
                fontSize="sm">
                {image.title}
              </Box>
            </Box>
          ))}
        </HStack>

        <Box textAlign="center">
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => handleOpen(0)}
            px={8}
            py={6}
            fontSize="lg">
            Open Image Gallery
          </Button>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200">
          <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.800">
            V2 Features:
          </Text>
          <VStack align="start" spacing={2}>
            <Text color="gray.600">
              ✅ Uses Chakra UI Portal for better control
            </Text>
            <Text color="gray.600">✅ Prevents body scroll when open</Text>
            <Text color="gray.600">
              ✅ Full-screen overlay with backdrop blur
            </Text>
            <Text color="gray.600">
              ✅ LightBox with zoom, pan, and thumbnails
            </Text>
            <Text color="gray.600">✅ Download and close functionality</Text>
            <Text color="gray.600">✅ Keyboard and touch navigation</Text>
            <Text color="gray.600">✅ Click outside to close</Text>
            <Text color="gray.600">✅ No modal size restrictions</Text>
          </VStack>
        </Box>
      </VStack>

      <FileViewerV2
        isOpen={isOpen}
        onClose={handleClose}
        images={testImages}
        initialIndex={selectedIndex}
      />
    </Box>
  );
};

export default TestV2;
