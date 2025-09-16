import { Box } from "@chakra-ui/react";
import MainHeading from "../../../../components/MainHeading";
import styles from "./style.module.scss";
import { useCarrierProfileProps } from "./useCarrierProfileProps";
import { MainSection } from "./components/MainSection";
import { CompanyInformation } from "./components/CompanyInformation";

export const CarrierProfile = () => {

  const { headData, bodyData, pieData, options } = useCarrierProfileProps();


  return <Box>
    <Box className={styles.header}>
      <MainHeading size="18px">Carrier Profile</MainHeading>
    </Box>
    <Box>
      <MainSection />
      <CompanyInformation />
    </Box>
  </Box>;
};
