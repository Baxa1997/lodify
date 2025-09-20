import React from "react";
import {Box, Flex, Text, Textarea} from "@chakra-ui/react";
import HFTextField from "../../../../components/HFTextField";
import HFRadio from "../../../../components/HFRadio";
import HFSwitch from "../../../../components/HFSwitch";
import HFSelect from "../../../../components/HFSelect";

function PickupFieldsComponent({control, field}) {
  return (
    <>
      <Flex p="20px" borderRadius="12px" gap="12px" bg={"#FAFAFA"}>
        <Box w={field?.type === "pickup" ? "100%" : "30%"}>
          <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
            Appointment # <span style={{color: "#414651"}}>*</span>
          </Text>
          <HFTextField
            backgroundColor="#fff"
            border="1px solid #D5D7DA"
            control={control}
            name="appointment"
          />
        </Box>
        <Box w={field?.type === "pickup" ? "100%" : "30%"}>
          <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
            BOL # <span style={{color: "#414651"}}>*</span>
          </Text>
          <HFTextField
            backgroundColor="#fff"
            border="1px solid #D5D7DA"
            control={control}
            name="bol"
          />
        </Box>
        {field?.type === "pickup" && (
          <>
            {" "}
            <Box w="100%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Commodity <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="commodity"
              />
            </Box>
            <Box w="100%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Load Value <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="load_value"
              />
            </Box>
          </>
        )}
      </Flex>

      <Flex mt="24px" justifyContent="space-between">
        <Box width={"65%"} borderRight="1px solid #D5D7DA" pr="20px">
          <Box w="100%">
            <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
              Shipper <span style={{color: "#414651"}}>*</span>
            </Text>
            <HFTextField
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name="shipper"
            />
          </Box>

          <Box mt="12px" gap="16px">
            <Flex id="tripRadio" gap="12px">
              <HFRadio control={control} value="US" name="city_select" />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                United States
              </Text>
            </Flex>
            <Flex id="tripRadio" gap="12px">
              <HFRadio control={control} value="CA" name="city_select" />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Canada
              </Text>
            </Flex>
            <Flex id="tripRadio" gap="12px">
              <HFRadio control={control} value="MX" name="city_select" />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Mexico
              </Text>
            </Flex>
          </Box>

          <Flex mt={"12px"} gap="16px">
            <Box width="70%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Address <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="address"
              />
            </Box>

            <Box width="30%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Address 2 <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="address_2"
              />
            </Box>
          </Flex>

          <Flex mt={"12px"} gap="16px">
            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                City <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="city"
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                State <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="state"
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                ZIP Code <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="zip_code"
              />
            </Box>
          </Flex>

          <Flex mt={"12px"} gap="16px">
            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Phone <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="phone"
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Appt Date <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="app_date"
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Appt Time <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name="app_time"
              />
            </Box>
          </Flex>

          <Flex mt={"12px"} gap="16px">
            <HFSwitch control={control} name="data_time_range" />
            <Text fontSize="14px" fontWeight="500" color="#414651">
              Data/Time Range
            </Text>
          </Flex>
        </Box>

        <Box width={"33%"}>
          <Box width="100%">
            <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
              Load Type <span style={{color: "#414651"}}>*</span>
            </Text>
            <HFSelect
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name="load_type"
              options={[
                {label: "Dry", value: "Dry"},
                {label: "Refrigerated", value: "Refrigerated"},
                {
                  label: "Temperature Controlled",
                  value: "Temperature Controlled",
                },
                {label: "Other", value: "Other"},
              ]}
            />
          </Box>

          <Box mt="16px">
            <Flex gap="12px" id="tripRadio">
              <HFRadio
                control={control}
                value="Drop & Hook"
                name="load_method"
              />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Drop & Hook
              </Text>
            </Flex>

            <Flex mt="12px" gap="12px" id="tripRadio">
              <HFRadio control={control} value="Live" name="load_method" />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Live
              </Text>
            </Flex>
          </Box>

          <Box width="100%" mt="16px">
            <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
              Equipment Type <span style={{color: "#414651"}}>*</span>
            </Text>
            <HFSelect
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name="equipment_type"
              options={[
                {label: "Dry Van 53", value: "Dry Van 53"},
                {label: "Dry Van 48", value: "Dry Van 48"},
              ]}
            />
          </Box>

          <Box mt="16px">
            <Flex gap="12px" id="tripRadio">
              <HFRadio
                control={control}
                value="Provided"
                name="equipment_availability"
              />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Provided
              </Text>
            </Flex>

            <Flex mt="12px" gap="12px" id="tripRadio">
              <HFRadio
                control={control}
                value="Required"
                name="equipment_availability"
              />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Required
              </Text>
            </Flex>
          </Box>

          <Box width="100%" mt="16px">
            <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
              Equipment <span style={{color: "#414651"}}>*</span>
            </Text>
            <HFSelect
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name="equipment"
              options={[
                {label: "Reefer", value: "Reefer"},
                {label: "Flatbed", value: "Flatbed"},
                {label: "Stepdeck", value: "Stepdeck"},
                {label: "Lowboy", value: "Lowboy"},
                {label: "Other", value: "Other"},
              ]}
            />
          </Box>

          <Box width="80%" mt="16px">
            <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
              Weight <span style={{color: "#414651"}}>*</span>
            </Text>
            <HFTextField
              type="number"
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name="weight"
            />
          </Box>
          <Box width="80%" mt="16px">
            <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
              Quantity <span style={{color: "#414651"}}>*</span>
            </Text>
            <HFTextField
              type="number"
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name="quantity"
            />
          </Box>

          <Flex mt={"12px"} gap="16px">
            <HFSwitch control={control} name="tarps_required" />
            <Text fontSize="14px" fontWeight="500" color="#414651">
              Tarps Required
            </Text>
          </Flex>

          <Box width="100%" mt="16px">
            <Text mb="6px" fontWeight="600" fontSize="18px" color="#181D27">
              Load Dimensions
            </Text>
            <Textarea
              placeholder="Special Instructions For Drivers"
              backgroundColor="#FAFAFA"
              resize="none"
              width="100%"
              height="150px"
              border="1px solid #D5D7DA"
              control={control}
              name="load_dimension"
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default PickupFieldsComponent;
