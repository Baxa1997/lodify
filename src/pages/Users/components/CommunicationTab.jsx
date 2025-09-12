import {
  Box,
  Flex,
  Text,
  Checkbox,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import React from "react";
import {PhoneInput} from "react-international-phone";
import "react-international-phone/style.css";
import SaveSection from "./SaveSection";
import Select from "../../../components/Select";
import "react-international-phone/style.css";

const CommunicationTab = ({userId, control, watch, setValue}) => {
  return (
    <Box mt={"24px"}>
      <SaveSection
        title="Communication"
        description=""
        onCancel={() => {}}
        onSave={() => {}}
        borderBottom="1px solid #E9EAEB"
        p={"0 0 20px 0"}
      />

      <Box>
        <Flex gap="64px" p={"20px 0 24px 0"} borderBottom="1px solid #E9EAEB">
          <Text w={"26%"} fontSize="14px" fontWeight="600" color="#181D27">
            Email Preferences
          </Text>

          <Flex flexDir="column" gap="16px">
            <CheckBoxItem
              title="Account management"
              description="Receive emails about trip offers, assignments, updates, or cancellations."
            />
            <CheckBoxItem
              title="Tendered trips"
              description="Receive emails about trip offers, assignments, updates, or cancellations."
            />
            <CheckBoxItem
              title="In-progress trips and disruptions"
              description="Receive notifications about in-transit issues."
            />
          </Flex>
        </Flex>

        <Flex gap="64px" p={"20px 0 24px 0"} borderBottom="1px solid #E9EAEB">
          <Text w={"26%"} fontSize="14px" fontWeight="600" color="#181D27">
            Phone Preferences
          </Text>

          <Flex flexDir="column" gap="16px" w={"48%"}>
            <Box>
              <Text fontSize="14px" fontWeight="500" color="#181D27" mb="8px">
                Phone number *
              </Text>
              <Box
                display="flex"
                border="1px solid #E2E8F0"
                borderRadius="6px"
                height="40px"
                _focusWithin={{
                  borderColor: "#E2E8F0",
                  boxShadow: "none",
                }}>
                <PhoneInput
                  defaultCountry="us"
                  value={watch?.phoneNumber || "+1 (937) 301-3613"}
                  onChange={(phone) => {
                    setValue?.("phoneNumber", phone);
                  }}
                  style={{
                    "--rip-border-radius": "0",
                    "--rip-border-color": "transparent",
                    "--rip-border-color-focus": "transparent",
                    "--rip-font-size": "14px",
                    "--rip-height": "40px",
                    "--rip-gap": "0px",
                    "--rip-outline": "none",
                    "--rip-box-shadow": "none",
                    width: "100%",
                  }}
                  inputStyle={{
                    fontSize: "14px",
                    height: "38px",
                    border: "none",
                    borderRadius: "0",
                    padding: "8px 12px",
                    outline: "none",
                    boxShadow: "none",
                    _focus: {
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                  countrySelectorStyleProps={{
                    style: {
                      background: "#fff",
                      outline: "none",
                      focus: "none",
                    },
                  }}
                  hideDropdown={false}
                  showDropdownSearch={true}
                  disableFormatting={false}
                  placeholder="(937) 301-3613"
                />
              </Box>
            </Box>

            <Box>
              <Text fontSize="14px" fontWeight="500" color="#181D27" mb="8px">
                Phone type
              </Text>
              <Select
                placeholder="Select phone type"
                value={watch?.phoneType || "Mobile"}
                options={[
                  {value: "Mobile", label: "Mobile"},
                  {value: "Home", label: "Home"},
                  {value: "Work", label: "Work"},
                  {value: "Other", label: "Other"},
                ]}
                onChange={(value) => {
                  setValue?.("phoneType", value);
                }}
                borderColor="#E2E8F0"
                focusBorderColor="#3182CE"
                name="phoneType"
              />
            </Box>

            <Flex w="100%" gap="8px" alignItems="flex-start">
              <Checkbox
                mt="4px"
                isChecked={watch?.isPrimaryContact || false}
                onChange={(e) => {
                  setValue?.("isPrimaryContact", e.target.checked);
                }}
                name="isPrimaryContact"
              />
              <Text fontSize="14px" fontWeight="500" color="#181D27">
                Primary contact number
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex gap="64px" p={"20px 0 24px 0"} borderBottom="1px solid #E9EAEB">
          <Text w={"26%"} fontSize="14px" fontWeight="600" color="#181D27">
            Available hours
          </Text>

          <Flex flexDir="column" gap="12px" w={"48%"}>
            <Flex gap="16px" flexWrap="wrap">
              <CheckBoxItem
                title="Morning"
                description=""
                checked={watch?.availableHours?.morning || true}
                onCheckboxChange={(e) => {
                  setValue?.("availableHours.morning", e.target.checked);
                }}
                name="availableHours.morning"
              />
              <CheckBoxItem
                title="Afternoon"
                description=""
                checked={watch?.availableHours?.afternoon || true}
                onCheckboxChange={(e) => {
                  setValue?.("availableHours.afternoon", e.target.checked);
                }}
                name="availableHours.afternoon"
              />
              <CheckBoxItem
                title="Evening"
                description=""
                checked={watch?.availableHours?.evening || false}
                onCheckboxChange={(e) => {
                  setValue?.("availableHours.evening", e.target.checked);
                }}
                name="availableHours.evening"
              />
              <CheckBoxItem
                title="Night"
                description=""
                checked={watch?.availableHours?.night || false}
                onCheckboxChange={(e) => {
                  setValue?.("availableHours.night", e.target.checked);
                }}
                name="availableHours.night"
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex paddingTop={"20px"} flexDir="column">
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

const CheckBoxItem = ({
  title,
  description,
  checked = false,
  onCheckboxChange = () => {},
  name,
}) => {
  return (
    <Flex w={"100%"} gap="8px" alignItems="flex-start">
      <Checkbox
        mt="4px"
        isChecked={checked}
        onChange={onCheckboxChange}
        name={name}
      />

      <Flex flexDir="column" gap="2px">
        <Text fontSize={"14px"} fontWeight="600" color="#181D27">
          {title}
        </Text>
        {description && (
          <Text fontSize={"14px"} color="#535862" fontWeight="400">
            {description}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default CommunicationTab;
