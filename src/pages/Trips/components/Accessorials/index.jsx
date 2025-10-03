import React, {useState} from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  HStack,
  VStack,
  Flex,
  Grid,
  IconButton,
  useDisclosure,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {Controller, useFieldArray} from "react-hook-form";

function Accessorials({control, name, label, required}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const [newAccessorial, setNewAccessorial] = useState({name: "", price: 0});
  const toast = useToast();

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: name,
  });

  const handleAddAccessorial = () => {
    if (!newAccessorial.name.trim()) {
      toast({
        title: "Please enter accessorial name",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (newAccessorial.price <= 0) {
      toast({
        title: "Please enter a valid price",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    append({
      name: newAccessorial.name,
      price: parseFloat(newAccessorial.price),
    });
    setNewAccessorial({name: "", price: 0});
    onAddClose();
  };

  const handlePriceChange = (index, price) => {
    update(index, {
      ...fields[index],
      price: parseFloat(price) || 0,
    });
  };

  const getTotalAmount = () => {
    return fields.reduce((total, field) => total + (field.price || 0), 0);
  };

  const getDisplayValue = () => {
    if (fields.length === 0) return "Select Accessorials";
    if (fields.length === 1) return fields[0].name;
    return `${fields.length} Accessorials Selected`;
  };

  return (
    <>
      <Box>
        {label && (
          <Text mb="6px" fontSize="14px" fontWeight="500" color="#414651">
            {label}{" "}
            {required && (
              <Box as="span" color="blue.500">
                *
              </Box>
            )}
          </Text>
        )}
        <Button
          w="100%"
          h="40px"
          border="1px solid #D5D7DA"
          borderRadius="md"
          bg="white"
          color="#414651"
          fontWeight="normal"
          textAlign="left"
          justifyContent="flex-start"
          px="12px"
          _hover={{bg: "gray.50"}}
          onClick={onOpen}>
          {getDisplayValue()}
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px solid #E9EAEB">
            Accessorial's
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {fields.length > 0 && (
                <Grid
                  maxH="400px"
                  overflowY="auto"
                  templateColumns="repeat(2, 1fr)"
                  gap={4}>
                  {fields.map((field, index) => (
                    <Box key={field.id}>
                      <HStack justify="space-between" mb="2">
                        <Text fontSize="14px" fontWeight="500" color="#414651">
                          {field.name}
                        </Text>
                      </HStack>
                      <Input
                        value={`$ ${field.price}`}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, "");
                          handlePriceChange(index, value);
                        }}
                        placeholder="$ 0"
                        size="md"
                        border="1px solid #D5D7DA"
                        borderRadius="md"
                      />
                    </Box>
                  ))}
                </Grid>
              )}

              <Button
                onClick={onAddOpen}
                w="146px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="8px"
                border="1px solid #ffcaad"
                bg="#fff"
                _hover={{bg: "#fff"}}>
                <AddIcon w="16px" h="16px" color="#EF6820" />
                <Text color="#181D27">Reference</Text>
              </Button>

              <Box mt="10px">
                <Text
                  pb="7px"
                  borderBottom="1px solid #E9EAEB"
                  w="100%"
                  fontSize="14px"
                  fontWeight="600"
                  color="#181D27">
                  Total Accessorial's
                </Text>
                <Text
                  p="14px 8px"
                  fontSize="16px"
                  fontWeight="600"
                  color="#181D27">
                  ${getTotalAmount().toFixed(2)}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter borderTop="1px solid #E9EAEB">
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              border="1px solid #D5D7DA">
              Close
            </Button>
            <Button
              bg="#EF6820"
              color="white"
              _hover={{bg: "#EF6820"}}
              onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddOpen} onClose={onAddClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Accessorial's</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb="2" fontSize="14px" fontWeight="500">
                  Accessorial's
                </Text>
                <Input
                  value={newAccessorial.name}
                  onChange={(e) =>
                    setNewAccessorial({
                      ...newAccessorial,
                      title: e.target.value,
                    })
                  }
                  placeholder="Accessorial's name"
                  size="md"
                  border="1px solid #D5D7DA"
                  borderRadius="md"
                />
              </Box>
              <Box w="100%">
                <Text mb="2" fontSize="14px" fontWeight="500">
                  Price
                </Text>
                <Input
                  value={`$ ${newAccessorial.price}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    setNewAccessorial({...newAccessorial, amount: value});
                  }}
                  placeholder="$ 0"
                  size="md"
                  border="1px solid #D5D7DA"
                  borderRadius="md"
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onAddClose}
              border="1px solid #D5D7DA">
              Close
            </Button>
            <Button
              bg="#EF6820"
              color="white"
              _hover={{bg: "#EF6820"}}
              onClick={handleAddAccessorial}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function HFAccessorialsField({
  control,
  name,
  label,
  rules,
  required,
  disabled,
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      rules={{
        required: required ? "This is a required field" : false,
        ...rules,
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <FormControl isInvalid={!!error}>
          <Accessorials
            control={control}
            label={label}
            name={name}
            required={required}
            disabled={disabled}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
