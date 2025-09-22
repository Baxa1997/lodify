import React from "react";
import {Box, Flex, Text, Textarea} from "@chakra-ui/react";
import HFTextField from "../../../../components/HFTextField";
import HFRadio from "../../../../components/HFRadio";
import HFSwitch from "../../../../components/HFSwitch";
import HFSelect from "../../../../components/HFSelect";
import HFMultiSelect from "@components/HFMultiSelect";
import HFPhoneInput from "@components/HFPhoneInput";
import HFMeasureInput from "@components/HFMeasureInput";
import HFDatePicker from "@components/HFDatePicker";

function PickupFieldsComponent({control, field, index}) {
  return (
    <>
      <Flex p="20px" borderRadius="12px" gap="12px" bg={"#FAFAFA"}>
        <Box w={field?.type?.[0] === "Pickup" ? "100%" : "30%"}>
          <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
            Appointment # <span style={{color: "#414651"}}>*</span>
          </Text>
          <HFTextField
            placeholder={"N/A"}
            backgroundColor="#fff"
            border="1px solid #D5D7DA"
            control={control}
            name={`driver_order_items.${index}.appointment`}
          />
        </Box>
        <Box w={field?.type?.[0] === "Pickup" ? "100%" : "30%"}>
          <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
            BOL # <span style={{color: "#414651"}}>*</span>
          </Text>
          <HFTextField
            placeholder={"Enter Number"}
            backgroundColor="#fff"
            border="1px solid #D5D7DA"
            control={control}
            name={`driver_order_items.${index}.bol`}
          />
        </Box>
        {field?.type?.[0] === "Pickup" && (
          <>
            {" "}
            <Box w="100%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Commodity <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                placeholder={"Enter Commodity Name"}
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.commodity`}
              />
            </Box>
            <Box w="100%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Load Value <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                placeholder={"$ 0.00"}
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.load_value`}
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
              placeholder={"Enter Shipper Name"}
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name={`driver_order_items.${index}.shipper`}
            />
          </Box>

          <Box mt="12px" gap="16px">
            <Flex id="tripRadio" gap="12px">
              <HFRadio
                control={control}
                value="US"
                name={`driver_order_items.${index}.city_select`}
              />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                United States
              </Text>
            </Flex>
            <Flex id="tripRadio" gap="12px">
              <HFRadio
                control={control}
                value="CA"
                name={`driver_order_items.${index}.city_select`}
              />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Canada
              </Text>
            </Flex>
            <Flex id="tripRadio" gap="12px">
              <HFRadio
                control={control}
                value="MX"
                name={`driver_order_items.${index}.city_select`}
              />
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
                placeholder={"Enter Address"}
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.address`}
              />
            </Box>

            <Box width="30%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Address 2 <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                placeholder={"Enter Address 2"}
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.address_2`}
              />
            </Box>
          </Flex>

          <Flex mt={"12px"} gap="16px">
            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                City <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                placeholder={"Enter City"}
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.city`}
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                State <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                placeholder={"Enter State"}
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.state`}
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                ZIP Code <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                placeholder={"ZIP Code"}
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.zip_code`}
              />
            </Box>
          </Flex>

          <Flex mt={"12px"} gap="16px">
            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Phone <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFPhoneInput
                placeholder={"Phone Number"}
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.phone`}
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Appt Date <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFDatePicker
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.app_date`}
              />
            </Box>

            <Box width="33%">
              <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
                Appt Time <span style={{color: "#414651"}}>*</span>
              </Text>
              <HFTextField
                placeholder={"19:00"}
                width="100%"
                backgroundColor="#fff"
                border="1px solid #D5D7DA"
                control={control}
                name={`driver_order_items.${index}.app_time`}
              />
            </Box>
          </Flex>

          <Flex mt={"12px"} gap="16px">
            <HFSwitch
              control={control}
              name={`driver_order_items.${index}.data_time_range`}
            />
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
            <HFMultiSelect
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name={`driver_order_items.${index}.load_type`}
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
                name={`driver_order_items.${index}.load_method`}
              />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Drop & Hook
              </Text>
            </Flex>

            <Flex mt="12px" gap="12px" id="tripRadio">
              <HFRadio
                control={control}
                value="Live"
                name={`driver_order_items.${index}.load_method`}
              />
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
              name={`driver_order_items.${index}.equipment_type`}
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
                name={`driver_order_items.${index}.equipment_availability`}
              />
              <Text fontSize="16px" fontWeight="500" color="#414651">
                Provided
              </Text>
            </Flex>

            <Flex mt="12px" gap="12px" id="tripRadio">
              <HFRadio
                control={control}
                value="Required"
                name={`driver_order_items.${index}.equipment_availability`}
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
            <HFMultiSelect
              width="100%"
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name={`driver_order_items.${index}.equipment`}
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
              placeholder={"Measure"}
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name={`driver_order_items.${index}.weight`}
            />
          </Box>
          <Box width="80%" mt="16px">
            <Text mb="6px" fontWeight="500" fontSize="14px" color="#181D27">
              Quantity <span style={{color: "#414651"}}>*</span>
            </Text>
            <HFTextField
              type="number"
              width="100%"
              placeholder={"Measure"}
              backgroundColor="#fff"
              border="1px solid #D5D7DA"
              control={control}
              name={`driver_order_items.${index}.quantity`}
            />
          </Box>

          <Flex mt={"12px"} gap="16px">
            <HFSwitch
              control={control}
              name={`driver_order_items.${index}.tarps_required`}
            />
            <Text fontSize="14px" fontWeight="500" color="#414651">
              Tarps Required
            </Text>
          </Flex>

          <Box width="100%" mt="16px">
            <Text mb="6px" fontWeight="600" fontSize="18px" color="#181D27">
              Load Dimensions
            </Text>
            <HFTextField
              placeholder="Special Instructions For Drivers"
              backgroundColor="#FAFAFA"
              width="100%"
              height="150px"
              border="1px solid #D5D7DA"
              control={control}
              name={`driver_order_items.${index}.load_dimension`}
              as="textarea"
              resize="none"
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default PickupFieldsComponent;
