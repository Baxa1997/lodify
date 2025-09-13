import styles from "./style.module.scss";
import MainHeading from "../../../../components/MainHeading";
import { useCompanyInfoProps } from "./useCompanyInfoProps";
import { Box, Button, Text } from "@chakra-ui/react";
import { FormSectionTitle } from "../../components/FormSectionTitle";
import { FormCardSection } from "../../components/FormCardSection";
import HFTextField from "../../../../components/HFTextField";

export const CompanyInfo = () => {
  const { control } = useCompanyInfoProps();

  return <div>
    <div className={styles.header}>
      <MainHeading size="18px">Company Info</MainHeading>
      <div className={styles.actions}>
        <Button variant="outline">Cancel</Button>
        <Button
          colorScheme="blue"
          variant="solid">Save</Button>
      </div>
    </div>
    <div className={styles.formSection}>
      <FormSectionTitle>Authority details</FormSectionTitle>
      <FormCardSection variant="card">
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
            name="carrier_identifier"
            label="Carrier Identifier"
            placeholder="Carrier Identifier"
            disabled
            required
          />
        </Box>
      </FormCardSection>
    </div>
  </div>;
};