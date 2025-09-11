import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Flex, Text, Button} from "@chakra-ui/react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import HFTextField from "../../components/HFTextField";
import CustomRadio from "../../components/CustomRadio";
import Select from "../../components/Select";
import styles from "./style.module.scss";

const SingleDriver = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      hiredTo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      hireDate: "",
      country: "United States",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      statementEmail: "",
      emergencyFirstName: "",
      emergencyLastName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
    },
  });

  useEffect(() => {
    const mockDriverData = {
      id: id,
      firstName: "Ermaton",
      middleName: "Middle Name",
      lastName: "IBROKHIMBEK",
      phone: "513-496-9171",
      email: "ibrokhimbek@list.ru",
      dateOfBirth: "07/13/1995",
      hireDate: "04/30/2025",
      hiredTo: "STRAIGHT CARGO LLC",
      country: "United States",
      address: "9672 WATERFORD PL APT 312",
      address2: "Address 2",
      city: "LOVERLAND",
      state: "Ohio",
      zipCode: "45140",
      statementEmail: "",
      emergencyFirstName: "",
      emergencyLastName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
    };

    setTimeout(() => {
      setDriverData(mockDriverData);
      reset(mockDriverData);
      setLoading(false);
    }, 1000);
  }, [id, reset]);

  const handleBackToDrivers = () => {
    navigate("/admin/drivers");
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const handleSaveAndExit = () => {
    handleSubmit(onSubmit)();
    navigate("/admin/drivers");
  };

  if (loading) {
    return (
      <Flex flexDir={"column"} gap={"20px"}>
        <HeadBreadCrumb
          customPath={[
            {label: "Managing Resource", path: "/admin"},
            {label: "Drivers", path: "/admin/drivers"},
            {label: "Driver Tab", path: `/admin/drivers/${id}`},
          ]}
        />
        <Box>Loading...</Box>
      </Flex>
    );
  }

  return (
    <Flex flexDir={"column"} gap={"20px"}>
      <HeadBreadCrumb
        customPath={[
          {label: "Managing Resource", path: "/admin"},
          {label: "Drivers", path: "/admin/drivers"},
          {label: "Driver Tab", path: `/admin/drivers/${id}`},
        ]}
      />

      <Box h={"32px"}>
        <Text h={"32px"} color={"#181D27"} fontWeight={"600"} fontSize={"24px"}>
          {driverData
            ? `${driverData.firstName} ${driverData.lastName}`
            : "Driver Details"}
        </Text>
      </Box>

      <Tabs className={styles.tabsContainer}>
        <TabList>
          <Tab>Driver Info</Tab>
          <Tab>Documents</Tab>
        </TabList>

        <TabPanel>
          <Box mt={"32px"} bg={"white"} borderRadius={"8px"} p={"24px"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDir={"column"} align={"stretch"}>
                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"280px"}></Box>
                    <Box w={"512px"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"14px"}
                        color={"#181D27"}
                        mb={"8px"}>
                        Hired to *
                      </Text>
                      <Select
                        placeholder="Select company"
                        value={driverData?.hiredTo || ""}
                        options={[
                          {
                            value: "STRAIGHT CARGO LLC",
                            label: "STRAIGHT CARGO LLC",
                          },
                        ]}
                        onChange={(value) => {
                          console.log("Hired to changed to:", value);
                        }}
                        borderColor={"#E2E8F0"}
                        focusBorderColor={"#3182CE"}
                      />
                    </Box>
                  </Flex>
                </Box>

                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"280px"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"16px"}
                        color={"#181D27"}>
                        Personal Details
                      </Text>
                    </Box>

                    <Box w={"512px"}>
                      <Flex gap={"16px"}>
                        <Flex flex={1} flexDir={"column"} gap={"16px"}>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              First name *
                            </Text>
                            <HFTextField
                              control={control}
                              name="firstName"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Last Name *
                            </Text>
                            <HFTextField
                              control={control}
                              name="lastName"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Phone *
                            </Text>
                            <HFTextField
                              control={control}
                              name="phone"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Data of Birth *
                            </Text>
                            <HFTextField
                              control={control}
                              name="dateOfBirth"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>

                        <Flex flex={1} flexDir={"column"} gap={"16px"}>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Middle name *
                            </Text>
                            <HFTextField
                              control={control}
                              name="middleName"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Email Address *
                            </Text>
                            <HFTextField
                              control={control}
                              name="email"
                              type="email"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Hire(d) Date *
                            </Text>
                            <HFTextField
                              control={control}
                              name="hireDate"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"280px"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"16px"}
                        color={"#181D27"}>
                        Current Address
                      </Text>
                    </Box>

                    <Box w={"512px"}>
                      <Flex flexDir={"column"} gap={"16px"}>
                        <Box>
                          <Flex gap={"24px"} flexDir={"column"}>
                            <CustomRadio
                              value="United States"
                              name="country"
                              checked={driverData?.country === "United States"}
                              onChange={(e) => {
                                console.log(
                                  "Country changed to:",
                                  e.target.value
                                );
                              }}>
                              United States
                            </CustomRadio>
                            <CustomRadio
                              value="Canada"
                              name="country"
                              checked={driverData?.country === "Canada"}
                              onChange={(e) => {
                                console.log(
                                  "Country changed to:",
                                  e.target.value
                                );
                              }}>
                              Canada
                            </CustomRadio>
                            <CustomRadio
                              value="Mexico"
                              name="country"
                              checked={driverData?.country === "Mexico"}
                              onChange={(e) => {
                                console.log(
                                  "Country changed to:",
                                  e.target.value
                                );
                              }}>
                              Mexico
                            </CustomRadio>
                          </Flex>
                        </Box>

                        <Box>
                          <Text
                            fontWeight={"500"}
                            fontSize={"14px"}
                            color={"#181D27"}
                            mb={"8px"}>
                            Address *
                          </Text>
                          <HFTextField
                            control={control}
                            name="address"
                            borderColor={"#E2E8F0"}
                            _focus={{borderColor: "#3182CE"}}
                          />
                        </Box>

                        <Flex gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Address 2
                            </Text>
                            <HFTextField
                              control={control}
                              name="address2"
                              placeholder="Address 2"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              City *
                            </Text>
                            <HFTextField
                              control={control}
                              name="city"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>

                        <Flex gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              State *
                            </Text>
                            <Select
                              placeholder="Select state"
                              value={driverData?.state || ""}
                              options={[
                                {value: "Ohio", label: "Ohio"},
                                {value: "California", label: "California"},
                                {value: "Texas", label: "Texas"},
                                {value: "New York", label: "New York"},
                              ]}
                              onChange={(value) => {
                                console.log("State changed to:", value);
                              }}
                              borderColor={"#E2E8F0"}
                              focusBorderColor={"#3182CE"}
                            />
                          </Box>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              ZIP Code *
                            </Text>
                            <HFTextField
                              control={control}
                              name="zipCode"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"280px"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"16px"}
                        color={"#181D27"}>
                        Statement Email
                      </Text>
                      <Text fontSize={"14px"} color={"#718096"} mb={"12px"}>
                        Note: The system send generated statements to this email
                        address
                      </Text>
                    </Box>
                    <Box w={"512px"}>
                      <HFTextField
                        control={control}
                        name="statementEmail"
                        placeholder="Email Address"
                        type="email"
                        borderColor={"#E2E8F0"}
                        _focus={{borderColor: "#3182CE"}}
                      />
                    </Box>
                  </Flex>
                </Box>

                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"280px"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"16px"}
                        color={"#181D27"}>
                        Emergency Contact
                      </Text>
                    </Box>

                    <Box w={"512px"}>
                      <Flex flexDir={"column"} gap={"16px"}>
                        <Flex gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              First name
                            </Text>
                            <HFTextField
                              control={control}
                              name="emergencyFirstName"
                              placeholder="First name"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Last name
                            </Text>
                            <HFTextField
                              control={control}
                              name="emergencyLastName"
                              placeholder="Last name"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>
                        <Flex gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Relationship
                            </Text>
                            <Select
                              placeholder="Relationship"
                              value={driverData?.emergencyRelationship || ""}
                              options={[
                                {value: "Spouse", label: "Spouse"},
                                {value: "Parent", label: "Parent"},
                                {value: "Sibling", label: "Sibling"},
                                {value: "Friend", label: "Friend"},
                              ]}
                              onChange={(value) => {
                                console.log("Relationship changed to:", value);
                              }}
                              borderColor={"#E2E8F0"}
                              focusBorderColor={"#3182CE"}
                            />
                          </Box>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Phone
                            </Text>
                            <HFTextField
                              control={control}
                              name="emergencyPhone"
                              placeholder="Phone"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box w={"100%"} mt={"24px"}>
                  <Flex justify={"space-between"}>
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleBackToDrivers}
                      bg={"#F7FAFC"}
                      border={"1px solid #E9EAEB"}
                      borderColor={"#E2E8F0"}
                      color={"#4A5568"}
                      borderRadius={"8px"}
                      px={"16px"}
                      py={"8px"}
                      _hover={{bg: "#EDF2F7"}}>
                      Exit
                    </Button>

                    <Flex gap={"12px"}>
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={handleSaveAndExit}
                        bg={"white"}
                        border={"1px solid #E9EAEB"}
                        color={"#4A5568"}
                        borderRadius={"8px"}
                        px={"16px"}
                        py={"8px"}
                        _hover={{bg: "#F7FAFC"}}>
                        Save & Exit
                      </Button>
                      <Button
                        type="submit"
                        bg={"#3182CE"}
                        color={"white"}
                        size="md"
                        borderRadius={"8px"}
                        px={"16px"}
                        py={"8px"}
                        _hover={{bg: "#2C5AA0"}}>
                        Next →
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </form>
          </Box>
        </TabPanel>

        <TabPanel>
          <Box mt={"32px"}>
            <Text>Driver Documents will be displayed here</Text>
          </Box>
        </TabPanel>
      </Tabs>
    </Flex>
  );
};

export default SingleDriver;
