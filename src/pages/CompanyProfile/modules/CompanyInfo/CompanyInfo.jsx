import styles from "./style.module.scss";
import MainHeading from "../../../../components/MainHeading";
import { useCompanyInfoProps } from "./useCompanyInfoProps";
import { Box, Button } from "@chakra-ui/react";
import { FormSectionTitle } from "../../components/FormSectionTitle";
import { FormCardSection } from "../../components/FormCardSection";
import HFTextField from "../../../../components/HFTextField";
import { PhoneInput } from "react-international-phone";
import Select from "../../../../components/Select";
import { CompanyActionBox } from "../../components/CompanyActionBox";

export const CompanyInfo = () => {
  const { 
    control,
    watch,
    setValue,
    handleSubmit,
    onSubmit, 
  } = useCompanyInfoProps();

  return <div>
    <div className={styles.header}>
      <MainHeading size="18px">Company Info</MainHeading>
      <CompanyActionBox onSaveClick={handleSubmit(onSubmit)} />
    </div>
    <div className={styles.formSection}>
      <FormSectionTitle>Authority details</FormSectionTitle>
      <FormCardSection
        variant="card"
        maxWidth="720px">
        <Box
          display="grid"
          gap="24px"
          gridTemplateColumns={"1fr 1fr"}
        >
          <HFTextField
            control={control}
            name="company_name"
            label="Company name"
            placeholder="Company name"
            required
          />
          <HFTextField
            control={control}
            name="identifier"
            label="Carrier Identifier"
            placeholder="Carrier Identifier"
            disabled
            required
          />
          <HFTextField
            control={control}
            name="us_dot_number"
            placeholder="1- to 9-digit number"
            leftAddon="USDOT"
          />
          <HFTextField
            control={control}
            name="mc_number"
            placeholder="3- to 8-digit number"
            leftAddon="MC"
          />
        </Box>
      </FormCardSection>
    </div>
    <div className={styles.formSection}>
      <FormSectionTitle>Email and Phone number</FormSectionTitle>
      <FormCardSection
        variant="card"
        maxWidth="720px">
        <Box
          display="grid"
          gap="24px"
          gridTemplateColumns={"1fr 1fr"}
          alignItems="flex-end"
        >
          <HFTextField
            control={control}
            name="email"
            label="Email"
            placeholder="Email"
            required
          />
          <Box>
            <Box
              as="label"
              color="#414651"
              fontWeight={500}
              mb="6px"
              display="block"
              htmlFor={"phone"}
            >
              Phone number
              <Box
                as="span"
                color="blue.500"
              >*</Box>
            </Box>
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
                value={watch("phone")}
                onChange={(phone) => {
                  setValue("phone", phone);
                }}
                id="phone"
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
          <HFTextField
            control={control}
            name="login"
            label="Login"
            placeholder="Login"
            required
          />
          <HFTextField
            control={control}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            required
          />
        </Box>
      </FormCardSection>
    </div>
    <div className={styles.formSection}>
      <FormSectionTitle>Address</FormSectionTitle>
      <FormCardSection
        variant="card"
        maxWidth="720px">
        <Box
          display="flex"
          gap="24px"
        >
          <HFTextField
            control={control}
            name="physical_address"
            label="Address Line 1"
            placeholder="606 Hillrose Ave Unit B"
            type="text"
            required
          />
          <HFTextField
            control={control}
            name="address_2"
            label="Address Line 2"
            placeholder="Address Line 2 (Optional)"
          />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={"repeat(4, 150px)"}
          gap="24px"
          mt="24px"
        >
          <HFTextField
            control={control}
            name="city"
            borderColor={"#E2E8F0"}
            label="City"
            placeholder="Dayton"
            required
          />
          <Select
            placeholder="Select state"
            value={watch("state")}
            options={[
              { value: "Ohio", label: "Ohio" },
              { value: "california", label: "California" },
              { value: "Texas", label: "Texas" },
              { value: "New York", label: "New York" },
            ]}
            onChange={(value) => {
              setValue("state", value);
            }}
            borderColor={"#E2E8F0"}
            focusBorderColor={"#3182CE"}
            isRequired
            label="State"
          />
          <HFTextField
            control={control}
            name="zip_code"
            borderColor={"#E2E8F0"}
            label={"Zip code"}
            placeholder="12345"
            required
          />
          <HFTextField
            control={control}
            name="country"
            borderColor={"#E2E8F0"}
            label={"Country"}
            placeholder="United States"
          />
          
          {/* <Select
            placeholder="Country"
            value={""}
            options={[
              { value: "Ohio", label: "Ohio" },
              { value: "California", label: "California" },
              { value: "Texas", label: "Texas" },
              { value: "New York", label: "New York" },
            ]}
            onChange={(value) => {
              console.log("State changed to:", value);
            }}
            borderColor={"#E2E8F0"}
            focusBorderColor={"#3182CE"}
            label="Country"
            isDisabled
          /> */}
        </Box>
      </FormCardSection>
    </div>
  </div>;
};