import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Input,
  VStack,
  HStack,
  Alert,
  AlertTitle,
  AlertDescription,
  useToast,
  Divider,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";

const ChakraExample = () => {
  const toast = useToast();

  const handleClick = () => {
    toast({
      title: "Chakra UI is working!",
      description: "You have successfully set up Chakra UI in your project.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8} maxW="600px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Card>
          <CardHeader>
            <Heading size="lg" color="blue.600">
              Chakra UI Setup Complete! 🎉
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text color="gray.600">
                This component demonstrates that Chakra UI is properly
                configured and working in your React application.
              </Text>

              <Alert status="info">
                <Box>
                  <AlertTitle>Setup Complete!</AlertTitle>
                  <AlertDescription>
                    Chakra UI is now ready to use throughout your application.
                  </AlertDescription>
                </Box>
              </Alert>

              <HStack spacing={4}>
                <Button colorScheme="blue" onClick={handleClick}>
                  Test Toast
                </Button>
                <Button variant="outline" colorScheme="blue">
                  Outline Button
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Ghost Button
                </Button>
              </HStack>

              <Input placeholder="Chakra Input component" />
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Search Input Components</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Default Search Input
                </Text>
                <SearchInput
                  placeholder="Search anything..."
                  onSearch={(value) => console.log("Search:", value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Small Search Input (Sidebar)
                </Text>
                <SearchInput
                  placeholder="Search"
                  size="sm"
                  onSearch={(value) => console.log("Sidebar search:", value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Search Input without Keyboard Shortcut
                </Text>
                <SearchInput
                  placeholder="Search without ⌘K"
                  showKeyboardShortcut={false}
                  onSearch={(value) =>
                    console.log("No shortcut search:", value)
                  }
                />
              </Box>

              <Divider />

              <Text fontSize="sm" color="gray.500">
                💡 Try pressing <strong>⌘K</strong> (or <strong>Ctrl+K</strong>)
                to focus the search input!
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default ChakraExample;
