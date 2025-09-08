import React from "react";
import {useForm} from "react-hook-form";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Code,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const FormDemo = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isDirty, isValid, touchedFields},
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      country: "",
      newsletter: false,
      bio: "",
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const isFormValid = isValid && isDirty;

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted! Check console for data.");
  };

  const handleReset = () => {
    reset();
  };

  const handleSetSampleData = () => {
    setValue("firstName", "John");
    setValue("lastName", "Doe");
    setValue("email", "john.doe@example.com");
    setValue("age", "25");
    setValue("country", "US");
    setValue("newsletter", true);
    setValue("bio", "This is a sample bio for demonstration.");
  };

  return (
    <Box p={8} maxW="800px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            React Hook Form Demo
          </Heading>
          <Text color="gray.600" mb={6}>
            Advanced form handling with validation, real-time feedback, and form
            state management
          </Text>
        </Box>

        <HStack spacing={6} wrap="wrap">
          <Card flex="1" minW="300px">
            <CardHeader>
              <Heading size="md">Form State</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm">Form Valid:</Text>
                  <Badge colorScheme={isFormValid ? "green" : "red"}>
                    {isFormValid ? "Valid" : "Invalid"}
                  </Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Form Dirty:</Text>
                  <Badge colorScheme={isDirty ? "blue" : "gray"}>
                    {isDirty ? "Dirty" : "Clean"}
                  </Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Touched Fields:</Text>
                  <Badge colorScheme="purple">
                    {Object.keys(touchedFields).length}
                  </Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Errors:</Text>
                  <Badge
                    colorScheme={
                      Object.keys(errors).length > 0 ? "red" : "green"
                    }>
                    {Object.keys(errors).length}
                  </Badge>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          <Card flex="1" minW="300px">
            <CardHeader>
              <Heading size="md">Form Actions</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                <Button
                  onClick={handleSetSampleData}
                  colorScheme="blue"
                  size="sm">
                  Set Sample Data
                </Button>
                <Button onClick={handleReset} colorScheme="gray" size="sm">
                  Reset Form
                </Button>
                <Button
                  onClick={() => console.log("Current values:", getValues())}
                  colorScheme="purple"
                  size="sm">
                  Log Current Values
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </HStack>

        <Card>
          <CardHeader>
            <Heading size="md">Sample Form</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="bold" mb={1}>
                      First Name *
                    </Text>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {value: 2, message: "Minimum 2 characters"},
                      })}
                      placeholder="Enter first name"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: `2px solid ${
                          errors.firstName ? "#e53e3e" : "#e2e8f0"
                        }`,
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                    {errors.firstName && (
                      <Text color="red.500" fontSize="xs" mt={1}>
                        {errors.firstName.message}
                      </Text>
                    )}
                  </Box>

                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="bold" mb={1}>
                      Last Name *
                    </Text>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {value: 2, message: "Minimum 2 characters"},
                      })}
                      placeholder="Enter last name"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: `2px solid ${
                          errors.lastName ? "#e53e3e" : "#e2e8f0"
                        }`,
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                    {errors.lastName && (
                      <Text color="red.500" fontSize="xs" mt={1}>
                        {errors.lastName.message}
                      </Text>
                    )}
                  </Box>
                </HStack>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={1}>
                    Email *
                  </Text>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter email address"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: `2px solid ${
                        errors.email ? "#e53e3e" : "#e2e8f0"
                      }`,
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                  {errors.email && (
                    <Text color="red.500" fontSize="xs" mt={1}>
                      {errors.email.message}
                    </Text>
                  )}
                </Box>

                <HStack spacing={4}>
                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="bold" mb={1}>
                      Age
                    </Text>
                    <input
                      type="number"
                      {...register("age", {
                        min: {value: 18, message: "Must be at least 18"},
                        max: {value: 100, message: "Must be less than 100"},
                      })}
                      placeholder="Enter age"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: `2px solid ${
                          errors.age ? "#e53e3e" : "#e2e8f0"
                        }`,
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                    {errors.age && (
                      <Text color="red.500" fontSize="xs" mt={1}>
                        {errors.age.message}
                      </Text>
                    )}
                  </Box>

                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="bold" mb={1}>
                      Country
                    </Text>
                    <select
                      {...register("country")}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}>
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </Box>
                </HStack>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={1}>
                    Bio
                  </Text>
                  <textarea
                    {...register("bio", {
                      maxLength: {
                        value: 500,
                        message: "Maximum 500 characters",
                      },
                    })}
                    placeholder="Tell us about yourself"
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: `2px solid ${errors.bio ? "#e53e3e" : "#e2e8f0"}`,
                      borderRadius: "6px",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  />
                  {errors.bio && (
                    <Text color="red.500" fontSize="xs" mt={1}>
                      {errors.bio.message}
                    </Text>
                  )}
                </Box>

                <Box>
                  <label
                    style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <input
                      type="checkbox"
                      {...register("newsletter")}
                      style={{margin: 0}}
                    />
                    <Text fontSize="sm">Subscribe to newsletter</Text>
                  </label>
                </Box>

                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={!isFormValid}
                  size="lg">
                  Submit Form
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Current Form Values</Heading>
          </CardHeader>
          <CardBody>
            <Code
              p={4}
              borderRadius="md"
              fontSize="sm"
              maxH="200px"
              overflow="auto">
              {JSON.stringify(watchedValues, null, 2)}
            </Code>
          </CardBody>
        </Card>

        <Alert status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>React Hook Form Features Demonstrated:</AlertTitle>
            <AlertDescription>
              • Real-time validation • Form state management • Error handling •
              Field watching • Form reset • Programmatic value setting •
              Validation rules • Custom validation messages
            </AlertDescription>
          </Box>
        </Alert>
      </VStack>
    </Box>
  );
};

export default FormDemo;
