import {Box, Flex, Text, Button, Radio} from "@chakra-ui/react";
import React from "react";
import Select from "../../../components/Select";
import SaveSection from "./SaveSection";

const AccountTab = ({userId}) => {
  return (
    <Box mt={"24px"}>
      <Box pb={"20px"} borderBottom={"1px solid #E9EAEB"}>
        <Text fontSize={"18px"} fontWeight={"600"} color={"#181D27"}>
          Account Login
        </Text>
        <Text fontSize={"14px"} color={"#535862"}>
          {` To change your Lodify account details, go to Lodify.com > Your Account
          > Login & Security`}
        </Text>
      </Box>

      <SaveSection
        py="24px"
        title="Lodify Team"
        description="lodify@eagleyetruckingllc.com"
        onCancel={() => {}}
        onSave={() => {}}
        p={"24px 0"}
      />

      <Box pb="18px" borderBottom={"1px solid #E9EAEB"}>
        <Flex gap="64px">
          <Text w={"26%"} fontSize="14px" fontWeight="600" color="#181D27">
            Status
          </Text>

          <Flex w={"48%"} flexDir="column" gap="8px">
            <Radio>Active</Radio>
            <Radio>Inactive</Radio>
          </Flex>
        </Flex>
      </Box>

      <Box pt="18px">
        <Flex gap="64px">
          <Text w={"26%"} fontSize="14px" fontWeight="600" color="#181D27">
            Assigned Location
          </Text>

          <Flex w={"48%"} flexDir="column" gap="16px">
            <Box>
              <Text fontSize="14px" fontWeight="500" color="#181D27" mb="8px">
                Domicile(s) *
              </Text>
              <Select
                placeholder="Select domicile"
                value=""
                options={[
                  {value: "US", label: "United States"},
                  {value: "CA", label: "Canada"},
                  {value: "MX", label: "Mexico"},
                ]}
                onChange={(value) => {
                  console.log("Domicile changed to:", value);
                }}
                borderColor="#E2E8F0"
                focusBorderColor="#3182CE"
              />
            </Box>

            <Box>
              <Text fontSize="14px" fontWeight="500" color="#181D27" mb="8px">
                Language Preference *
              </Text>
              <Select
                placeholder="Select language"
                value="en-US"
                options={[
                  {value: "en-US", label: "English (US)"},
                  {value: "en-CA", label: "English (CA)"},
                  {value: "es-MX", label: "Spanish (MX)"},
                  {value: "fr-CA", label: "French (CA)"},
                ]}
                onChange={(value) => {
                  console.log("Language changed to:", value);
                }}
                borderColor="#E2E8F0"
                focusBorderColor="#3182CE"
              />
            </Box>

            <Box>
              <Text fontSize="14px" fontWeight="500" color="#181D27" mb="8px">
                Timezone Location *
              </Text>
              <Select
                placeholder="Select timezone"
                value="ET"
                options={[
                  {value: "ET", label: "Eastern (ET)"},
                  {value: "CT", label: "Central (CT)"},
                  {value: "MT", label: "Mountain (MT)"},
                  {value: "PT", label: "Pacific (PT)"},
                ]}
                onChange={(value) => {
                  console.log("Timezone changed to:", value);
                }}
                borderColor="#E2E8F0"
                focusBorderColor="#3182CE"
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Flex flexDir="column">
        <Text fontSize="18px" fontWeight="600" color="#181D27">
          Delete user account
        </Text>
        <Button
          mt={"10px"}
          p={0}
          h={"20px"}
          display={"flex"}
          alignItems={"center"}
          gap="8px"
          w={"104px"}
          border={"none"}
          bg={"none"}
          _hover={{bg: "none"}}>
          <img src="/img/trash.svg" width={"15px"} height={"15px"} alt="" />
          <Text fontSize={"14px"} color={"#B42318"}>
            Delete user
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default AccountTab;
