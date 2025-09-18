import React, {useState} from "react";
import {
  Box,
  Button,
  Image,
  HStack,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FileViewer from "./index";

const FileViewerTest = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample images for testing
  const sampleImages = [
    {
      src: "https://picsum.photos/800/600?random=1",
      alt: "Sample Image 1",
      title: "Beautiful Landscape",
    },
    {
      src: "https://picsum.photos/800/600?random=2",
      alt: "Sample Image 2",
      title: "City Skyline",
    },
    {
      src: "https://picsum.photos/800/600?random=3",
      alt: "Sample Image 3",
      title: "Ocean View",
    },
    {
      src: "https://picsum.photos/800/600?random=4",
      alt: "Sample Image 4",
      title: "Mountain Range",
    },
  ];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    onOpen();
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          color="gray.800">
          FileViewer with Chakra UI Modal
        </Text>

        <Text textAlign="center" color="gray.600" fontSize="lg">
          Click on any image to open the LightBox viewer in a Chakra UI Modal
        </Text>

        <HStack spacing={4} justify="center" flexWrap="wrap">
          {sampleImages.map((image, index) => (
            <Box
              key={index}
              position="relative"
              cursor="pointer"
              onClick={() => handleImageClick(index)}
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
            onClick={() => handleImageClick(0)}
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
            Features:
          </Text>
          <VStack align="start" spacing={2}>
            <Text color="gray.600">
              ✅ Chakra UI Modal with full-screen display
            </Text>
            <Text color="gray.600">
              ✅ LightBox functionality with zoom and pan
            </Text>
            <Text color="gray.600">✅ Thumbnail navigation at the bottom</Text>
            <Text color="gray.600">
              ✅ Download functionality for each image
            </Text>
            <Text color="gray.600">
              ✅ Keyboard navigation (arrow keys, escape)
            </Text>
            <Text color="gray.600">✅ Touch/swipe support for mobile</Text>
            <Text color="gray.600">✅ Click outside to close modal</Text>
            <Text color="gray.600">✅ Image counter and controls overlay</Text>
          </VStack>
        </Box>
      </VStack>

      <FileViewer
        isOpen={isOpen}
        onClose={onClose}
        images={sampleImages}
        initialIndex={selectedImageIndex}
      />
    </Box>
  );
};

export default FileViewerTest;
