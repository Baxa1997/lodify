import { Box } from "@chakra-ui/react";
import MainHeading from "../../../../components/MainHeading";
import styles from "./style.module.scss";
import { useCarrierProfileProps } from "./useCarrierProfileProps";
import { MainSection } from "./components/MainSection";
import { CompanyInformation } from "./components/CompanyInformation";
import { ValidateCarrier } from "./components/ValidateCarrier";
import { ValidateEquipment } from "./components/ValidateEquipment";
import { Authority } from "./components/Authority";
import { Insurance } from "./components/Insurance";

export const CarrierProfile = () => {

  const { headData, bodyData, pieData, options } = useCarrierProfileProps();


  return <Box>
    <Box className={styles.header}>
      <MainHeading size="18px">Carrier Profile</MainHeading>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      gap="24px"
    >
      <MainSection />
      <CompanyInformation />
      <ValidateCarrier />
      <ValidateEquipment />
      <Authority />
      <Insurance />
    </Box>
  </Box>;
};
