import React, {useState, useCallback, useEffect} from "react";
import {
  Box,
  IconButton,
  Text,
  HStack,
  VStack,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import {Lightbox} from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import {LuX, LuDownload} from "react-icons/lu";

function FileViewerV2({isOpen, onClose, images = [], initialIndex = 0}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClose = useCallback(() => {
    setCurrentIndex(0);
    setIsFullscreen(false);
    onClose();
  }, [onClose]);

  const handleSlideChange = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const handleFullscreenChange = useCallback((fullscreen) => {
    setIsFullscreen(fullscreen);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!images || images.length === 0 || !isOpen) {
    return null;
  }

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={9999}
        bg="blackAlpha.800"
        backdropFilter="blur(4px)"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}>
        {/* Custom Controls Overlay */}
        <Box
          position="absolute"
          top={4}
          right={4}
          zIndex={10000}
          bg="blackAlpha.600"
          borderRadius="md"
          p={2}
          pointerEvents="auto">
          <HStack spacing={2}>
            <Text color="white" fontSize="sm" fontWeight="medium">
              {currentIndex + 1} of {images.length}
            </Text>
            <IconButton
              aria-label="Download image"
              icon={<LuDownload size={16} />}
              size="sm"
              variant="ghost"
              color="white"
              _hover={{bg: "whiteAlpha.200"}}
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement("a");
                link.href =
                  images[currentIndex]?.src || images[currentIndex]?.url;
                link.download = `image-${currentIndex + 1}`;
                link.click();
              }}
            />
            <IconButton
              aria-label="Close viewer"
              icon={<LuX size={16} />}
              size="sm"
              variant="ghost"
              color="white"
              _hover={{bg: "whiteAlpha.200"}}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            />
          </HStack>
        </Box>

        {/* LightBox Component */}
        <Lightbox
          open={isOpen}
          close={handleClose}
          index={currentIndex}
          slides={images}
          on={{
            view: ({index}) => handleSlideChange(index),
          }}
          carousel={{
            finite: true,
            padding: 0,
            spacing: 0,
            imageFit: "contain",
          }}
          plugins={[Thumbnails, Zoom, Download, Fullscreen]}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
            buttonClose: () => null,
          }}
          controller={{
            closeOnBackdropClick: false,
            closeOnPullDown: false,
            closeOnPullUp: false,
          }}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              width: "100%",
              height: "100%",
            },
            slide: {
              padding: "40px 0",
            },
            thumbnailsContainer: {
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              margin: 0,
              padding: "16px 0",
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              zIndex: 11,
              backdropFilter: "blur(8px)",
            },
            thumbnail: {
              width: 80,
              height: 60,
              border: "2px solid transparent",
              borderRadius: "8px",
              background: "transparent",
              margin: "0 4px",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                transform: "scale(1.05)",
              },
            },
            thumbnailActive: {
              borderColor: "#3b82f6",
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
            },
          }}
          animation={{
            swipe: 400,
            fade: 300,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
            doubleClickMaxStops: 2,
            keyboardMoveDistance: 50,
            wheelZoomDistanceFactor: 100,
            pinchZoomDistanceFactor: 100,
            scrollToZoom: true,
          }}
          fullscreen={{
            ref: null,
            on: {
              change: handleFullscreenChange,
            },
          }}
        />
      </Box>
    </Portal>
  );
}

export default FileViewerV2;
