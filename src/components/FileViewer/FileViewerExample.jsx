import React, {useState} from "react";
import {Box, Button, Image, HStack, VStack, Text} from "@chakra-ui/react";
import FileViewer from "./index";

const FileViewerExample = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Example images - replace with your actual image URLs
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
    setIsViewerOpen(true);
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          FileViewer LightBox Example
        </Text>

        <Text textAlign="center" color="gray.600">
          Click on any image to open the LightBox viewer
        </Text>

        <HStack spacing={4} justify="center" flexWrap="wrap">
          {sampleImages.map((image, index) => (
            <Box
              key={index}
              position="relative"
              cursor="pointer"
              onClick={() => handleImageClick(index)}
              _hover={{transform: "scale(1.02)"}}
              transition="transform 0.2s ease">
              <Image
                src={image.src}
                alt={image.alt}
                boxSize="200px"
                objectFit="cover"
                borderRadius="lg"
                boxShadow="lg"
                _hover={{boxShadow: "xl"}}
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
                fontSize="sm">
                {index + 1}
              </Box>
            </Box>
          ))}
        </HStack>

        <Box textAlign="center">
          <Button
            colorScheme="blue"
            onClick={() => handleImageClick(0)}
            size="lg">
            Open Image Gallery
          </Button>
        </Box>
      </VStack>

      <FileViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={sampleImages}
        initialIndex={selectedImageIndex}
      />
    </Box>
  );
};

export default FileViewerExample;
