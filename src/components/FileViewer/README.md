# FileViewer Component

A powerful LightBox image viewer built with Chakra UI Modal and `yet-another-react-lightbox`.

## Features

- 🖼️ **Full-screen image viewing** with smooth animations
- 🔍 **Zoom functionality** with mouse wheel, pinch, and double-click support
- 🖱️ **Thumbnail navigation** at the bottom of the viewer
- ⌨️ **Keyboard navigation** (arrow keys, escape, space)
- 📱 **Touch/swipe support** for mobile devices
- 📥 **Download functionality** for individual images
- 🎨 **Customizable styling** with Chakra UI theming
- ♿ **Accessibility features** with proper ARIA labels
- 🔄 **Smooth transitions** and animations

## Installation

The component uses the following dependencies (already included in your project):

- `@chakra-ui/react`
- `yet-another-react-lightbox`
- `react-icons`

## Usage

### Basic Usage

```jsx
import React, {useState} from "react";
import {Button} from "@chakra-ui/react";
import FileViewer from "./components/FileViewer";

function MyComponent() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const images = [
    {
      src: "https://example.com/image1.jpg",
      alt: "Image 1",
      title: "Beautiful Landscape",
    },
    {
      src: "https://example.com/image2.jpg",
      alt: "Image 2",
      title: "City Skyline",
    },
  ];

  return (
    <>
      <Button onClick={() => setIsViewerOpen(true)}>Open Image Gallery</Button>

      <FileViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={images}
        initialIndex={0}
      />
    </>
  );
}
```

### Advanced Usage with Image Grid

```jsx
import React, {useState} from "react";
import {Box, Image, Grid} from "@chakra-ui/react";
import FileViewer from "./components/FileViewer";

function ImageGallery() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [
    {src: "/images/photo1.jpg", alt: "Photo 1"},
    {src: "/images/photo2.jpg", alt: "Photo 2"},
    {src: "/images/photo3.jpg", alt: "Photo 3"},
  ];

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            cursor="pointer"
            onClick={() => handleImageClick(index)}
            _hover={{opacity: 0.8}}
          />
        ))}
      </Grid>

      <FileViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={images}
        initialIndex={selectedIndex}
      />
    </Box>
  );
}
```

## Props

| Prop           | Type       | Default | Description                                                    |
| -------------- | ---------- | ------- | -------------------------------------------------------------- |
| `isOpen`       | `boolean`  | `false` | Controls the visibility of the modal                           |
| `onClose`      | `function` | -       | Callback function called when the modal is closed              |
| `images`       | `array`    | `[]`    | Array of image objects with `src`, `alt`, and optional `title` |
| `initialIndex` | `number`   | `0`     | Index of the image to display initially                        |

## Image Object Structure

```typescript
interface ImageObject {
  src: string; // Required: Image URL
  alt: string; // Required: Alt text for accessibility
  title?: string; // Optional: Image title
  width?: number; // Optional: Image width
  height?: number; // Optional: Image height
}
```

## Keyboard Shortcuts

- `Escape` - Close the viewer
- `Arrow Left/Right` - Navigate between images
- `Space` - Toggle fullscreen
- `+/-` - Zoom in/out
- `0` - Reset zoom

## Mobile Gestures

- **Swipe left/right** - Navigate between images
- **Pinch** - Zoom in/out
- **Double tap** - Toggle zoom
- **Tap and hold** - Show context menu

## Customization

The component uses Chakra UI's theming system. You can customize the appearance by:

1. **Modal styling** - Modify the Modal props
2. **LightBox styling** - Update the `styles` prop in the Lightbox component
3. **Button styling** - Customize the IconButton components

## Example Styling Customization

```jsx
<FileViewer
  isOpen={isViewerOpen}
  onClose={() => setIsViewerOpen(false)}
  images={images}
  initialIndex={0}
  // Custom styles can be added by modifying the component
/>
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Tips

1. **Lazy loading** - Consider implementing lazy loading for large image galleries
2. **Image optimization** - Use appropriately sized images for better performance
3. **Memory management** - Close the viewer when not in use to free up memory

## Troubleshooting

### Common Issues

1. **Images not loading** - Check that image URLs are accessible and CORS is properly configured
2. **Touch gestures not working** - Ensure the component is not inside a scrollable container
3. **Keyboard navigation not working** - Make sure the modal has focus

### Debug Mode

Enable debug mode by adding `debug={true}` to the Lightbox component (if needed).

## License

This component is part of your project and follows the same license terms.
