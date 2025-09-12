import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Flex, Text, Button} from "@chakra-ui/react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import HeadBreadCrumb from "../../components/HeadBreadCrumb";
import CustomRadio from "../../components/CustomRadio";
import Select from "../../components/Select";
import styles from "./SingleUser.module.scss";
import AccountTab from "./components/AccountTab";

const SingleUser = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      status: "Active",
      role: "",
      company: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      domicile: "US",
      language: "en-US",
      timezone: "ET",
    },
  });

  useEffect(() => {
    const mockUserData = {
      id: id,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      role: "Admin",
      company: "Example Corp",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      domicile: "US",
      language: "en-US",
      timezone: "ET",
    };

    setTimeout(() => {
      setUserData(mockUserData);
      reset(mockUserData);
      setLoading(false);
    }, 1000);
  }, [id, reset]);

  const handleBackToUsers = () => {
    navigate("/admin/users");
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const handleSaveAndExit = () => {
    console.log("Save and exit");
    navigate("/admin/users");
  };

  if (loading) {
    return (
      <Flex flexDir={"column"} gap={"20px"}>
        <HeadBreadCrumb
          customPath={[
            {label: "Account", path: `/admin/users/${id}`},
            {label: "Users", path: "/admin/users"},
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
          {label: "Account", path: `/admin/users/${id}`},
          {label: "Users", path: "/admin/users"},
        ]}
      />

      <Box h={"32px"}>
        <Text h={"32px"} color={"#181D27"} fontWeight={"600"} fontSize={"24px"}>
          {userData
            ? `${userData.firstName} ${userData.lastName}`
            : "User Details"}
        </Text>
      </Box>

      <Tabs className={styles.tabsContainer}>
        <TabList>
          <Tab>Account</Tab>
          <Tab>Communication</Tab>
          <Tab>User Role</Tab>
          <Tab>Permissions</Tab>
        </TabList>

        <TabPanel>
          <AccountTab control={control} watch={watch} userId={id} />
        </TabPanel>

        <TabPanel>
          <Box mt={"32px"}>
            <Text>Communication settings will be displayed here</Text>
          </Box>
        </TabPanel>

        <TabPanel>
          <Box mt={"32px"}>
            <Text>User role settings will be displayed here</Text>
          </Box>
        </TabPanel>

        <TabPanel>
          <Box mt={"32px"}>
            <Text>Permissions settings will be displayed here</Text>
          </Box>
        </TabPanel>
      </Tabs>
    </Flex>
  );
};

export default SingleUser;
