import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {Box, Flex, Text, Button} from "@chakra-ui/react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import HFTextField from "../../components/HFTextField";
import CustomRadio from "../../components/CustomRadio";
import Select from "../../components/Select";
import driversService from "../../services/driversService";
import styles from "./style.module.scss";

const SingleDriver = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      phone: "",
      email: "",
      date_of_birth: "",
      hire_date: "",
      address: "",
      address_2: "",
      country: "",
      state: "",
      zip_code: "",
      cdl_class: "",
      licence: "",
      medical_card: "",
      region: "",
      status: "",
      companies_id: "",
    },
  });

  const {data: driverData, isLoading: driverLoading} = useQuery({
    queryKey: ["GET_DRIVER_BY_ID", id],
    queryFn: () => driversService.getDriverById(id),
    enabled: !!id,
    select: (res) => res?.data?.data || res?.data || {},
  });

  const updateDriverMutation = useMutation({
    mutationFn: (data) => driversService.updateDriver(id, {data}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["GET_DRIVER_BY_ID", id]});
      queryClient.invalidateQueries({queryKey: ["GET_DRIVERS_LIST"]});
    },
  });

  useEffect(() => {
    if (driverData) {
      const formData = {
        first_name: driverData?.first_name || "",
        middle_name: driverData.middle_name || "",
        last_name: driverData?.last_name || "",
        phone: driverData?.phone || "",
        email: driverData?.email || "",
        date_of_birth: driverData?.date_of_birth || "",
        hire_date: driverData?.hire_date || "",
        address: driverData?.address || "",
        address_2: driverData?.address_2 || "",
        country: driverData?.country || "",
        state: driverData?.state || "",
        zip_code: driverData?.zip_code || "",
        cdl_class: driverData?.cdl_class || "",
        licence: driverData?.licence || "",
        medical_card: driverData?.medical_card || "",
        region: driverData?.region || "",
        status: driverData?.status || "",
        companies_id: driverData?.companies_id || "",
      };
      reset(formData);
    }
  }, [driverData, reset]);

  const handleBackToDrivers = () => {
    navigate("/admin/drivers");
  };

  const onSubmit = (data) => {
    updateDriverMutation.mutate(data);
  };

  const handleSaveAndExit = () => {
    handleSubmit(onSubmit)();
    navigate("/admin/drivers");
  };

  if (driverLoading) {
    return (
      <Flex flexDir={"column"} gap={"20px"}>
        <HeadBreadCrumb
          customPath={[
            {label: "Driver Info", path: `/admin/drivers/${id}`},
            {label: "Drivers", path: "/admin/drivers"},
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
          {label: "Driver Info", path: `/admin/drivers/${id}`},
          {label: "Drivers", path: "/admin/drivers"},
        ]}
      />

      <Box h={"32px"}>
        <Text h={"32px"} color={"#181D27"} fontWeight={"600"} fontSize={"24px"}>
          {driverData
            ? `${driverData.first_name || ""} ${
                driverData.last_name || ""
              }`.trim() || "Driver Details"
            : "Driver Details"}
        </Text>
      </Box>

      <Tabs className={styles.tabsContainer}>
        <TabList>
          <Tab>Driver Info</Tab>
          <Tab>Documents</Tab>
        </TabList>

        <TabPanel>
          <Box bg={"white"} borderRadius={"8px"} p={"24px"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDir={"column"} align={"stretch"}>
                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"48%"}>
                      <Text
                        fontWeight={"500"}
                        fontSize={"14px"}
                        color={"#181D27"}
                        mb={"8px"}>
                        Hired to <span style={{color: "#1570EF"}}>*</span>
                      </Text>
                      <Controller
                        name="companies_id"
                        control={control}
                        render={({field}) => (
                          <Select
                            placeholder="Select company"
                            value={field.value || ""}
                            options={[
                              {
                                value: "STRAIGHT CARGO LLC",
                                label: "STRAIGHT CARGO LLC",
                              },
                              {
                                value: "LOGISTICS PRO LLC",
                                label: "LOGISTICS PRO LLC",
                              },
                              {
                                value: "FREIGHT MASTERS INC",
                                label: "FREIGHT MASTERS INC",
                              },
                            ]}
                            onChange={(value) => field.onChange(value)}
                            borderColor={"#E2E8F0"}
                            focusBorderColor={"#3182CE"}
                          />
                        )}
                      />
                    </Box>
                    <Box w={"48%"}></Box>
                  </Flex>
                </Box>

                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"48%"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"16px"}
                        color={"#181D27"}
                        mb={"16px"}>
                        Personal Details
                      </Text>
                      <Flex gap={"16px"} flexDir={"column"}>
                        <Box>
                          <Text
                            fontWeight={"500"}
                            fontSize={"14px"}
                            color={"#181D27"}
                            mb={"8px"}>
                            First name <span style={{color: "#1570EF"}}>*</span>
                          </Text>
                          <HFTextField
                            control={control}
                            name="first_name"
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
                            Middle name{" "}
                            <span style={{color: "#1570EF"}}>*</span>
                          </Text>
                          <HFTextField
                            control={control}
                            name="middle_name"
                            borderColor={"#E2E8F0"}
                            _focus={{borderColor: "#3182CE"}}
                          />
                        </Box>
                        <Flex flex={1} flexDir={"column"} gap={"16px"}>
                          <Box>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Last Name{" "}
                              <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <HFTextField
                              control={control}
                              name="last_name"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>

                        <Flex w={"100%"} flex={1} gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Phone <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <HFTextField
                              control={control}
                              name="phone"
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
                              Email Address{" "}
                              <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <HFTextField
                              control={control}
                              name="email"
                              type="email"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>

                        <Flex w={"100%"} gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Hire(d) Date{" "}
                              <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <HFTextField
                              control={control}
                              name="hire_date"
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
                              Data of Birth{" "}
                              <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <HFTextField
                              control={control}
                              name="date_of_birth"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                    <Box w={"48%"}></Box>
                  </Flex>
                </Box>

                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"48%"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"16px"}
                        color={"#181D27"}
                        mb={"16px"}>
                        Current Address{" "}
                        <span style={{color: "#1570EF"}}>*</span>
                      </Text>
                      <Flex flexDir={"column"} gap={"16px"}>
                        <Box>
                          <Controller
                            name="country"
                            control={control}
                            render={({field}) => (
                              <Flex gap={"24px"} flexDir={"column"}>
                                <CustomRadio
                                  value="United States"
                                  name="country"
                                  checked={field.value === "United States"}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }>
                                  United States{" "}
                                </CustomRadio>
                                <CustomRadio
                                  value="Canada"
                                  name="country"
                                  checked={field.value === "Canada"}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }>
                                  Canada
                                </CustomRadio>
                                <CustomRadio
                                  value="Mexico"
                                  name="country"
                                  checked={field.value === "Mexico"}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }>
                                  Mexico
                                </CustomRadio>
                              </Flex>
                            )}
                          />
                        </Box>

                        <Box>
                          <Text
                            fontWeight={"500"}
                            fontSize={"14px"}
                            color={"#181D27"}
                            mb={"8px"}>
                            Address <span style={{color: "#1570EF"}}>*</span>
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
                              Address 2{" "}
                              <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <HFTextField
                              control={control}
                              name="address_2"
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
                              City <span style={{color: "#1570EF"}}>*</span>
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
                              State <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <Controller
                              name="state"
                              control={control}
                              render={({field}) => (
                                <Select
                                  placeholder="Select state"
                                  value={field.value || ""}
                                  options={[
                                    {value: "Ohio", label: "Ohio"},
                                    {value: "California", label: "California"},
                                    {value: "Texas", label: "Texas"},
                                    {value: "New York", label: "New York"},
                                  ]}
                                  onChange={(value) => field.onChange(value)}
                                  borderColor={"#E2E8F0"}
                                  focusBorderColor={"#3182CE"}
                                />
                              )}
                            />
                          </Box>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              ZIP Code <span style={{color: "#1570EF"}}>*</span>
                            </Text>
                            <HFTextField
                              control={control}
                              name="zip_code"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                    <Box w={"48%"}></Box>
                  </Flex>
                </Box>

                {/* Driver License & Medical Information */}
                <Box
                  w={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  pb={"24px"}
                  mb={"24px"}>
                  <Flex gap={"32px"}>
                    <Box w={"48%"}>
                      <Text
                        fontWeight={"600"}
                        fontSize={"16px"}
                        color={"#181D27"}
                        mb={"16px"}>
                        License & Medical Info
                      </Text>
                      <Flex flexDir={"column"} gap={"16px"}>
                        <Flex w={"100%"} gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              CDL Class
                            </Text>
                            <HFTextField
                              control={control}
                              name="cdl_class"
                              placeholder="CDL Class"
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
                              License Number
                            </Text>
                            <HFTextField
                              control={control}
                              name="licence"
                              placeholder="License Number"
                              borderColor={"#E2E8F0"}
                              _focus={{borderColor: "#3182CE"}}
                            />
                          </Box>
                        </Flex>
                        <Flex w={"100%"} gap={"16px"}>
                          <Box flex={1}>
                            <Text
                              fontWeight={"500"}
                              fontSize={"14px"}
                              color={"#181D27"}
                              mb={"8px"}>
                              Medical Card
                            </Text>
                            <HFTextField
                              control={control}
                              name="medical_card"
                              placeholder="Medical Card"
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
                              Region
                            </Text>
                            <Controller
                              name="region"
                              control={control}
                              render={({field}) => (
                                <Select
                                  placeholder="Select region"
                                  value={field.value || ""}
                                  options={[
                                    {value: "North", label: "North"},
                                    {value: "South", label: "South"},
                                    {value: "East", label: "East"},
                                    {value: "West", label: "West"},
                                    {value: "Central", label: "Central"},
                                  ]}
                                  onChange={(value) => field.onChange(value)}
                                  borderColor={"#E2E8F0"}
                                  focusBorderColor={"#3182CE"}
                                />
                              )}
                            />
                          </Box>
                        </Flex>
                        <Box>
                          <Text
                            fontWeight={"500"}
                            fontSize={"14px"}
                            color={"#181D27"}
                            mb={"8px"}>
                            Status
                          </Text>
                          <Controller
                            name="status"
                            control={control}
                            render={({field}) => (
                              <Select
                                placeholder="Select status"
                                value={field.value || ""}
                                options={[
                                  {value: "Active", label: "Active"},
                                  {value: "Inactive", label: "Inactive"},
                                  {value: "Pending", label: "Pending"},
                                  {value: "Suspended", label: "Suspended"},
                                ]}
                                onChange={(value) => field.onChange(value)}
                                borderColor={"#E2E8F0"}
                                focusBorderColor={"#3182CE"}
                              />
                            )}
                          />
                        </Box>
                      </Flex>
                    </Box>
                    <Box w={"48%"}></Box>
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
                        _hover={{bg: "#F7FAFC"}}
                        isLoading={updateDriverMutation.isPending}
                        loadingText="Saving...">
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
                        _hover={{bg: "#2C5AA0"}}
                        isLoading={updateDriverMutation.isPending}
                        loadingText="Saving...">
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
