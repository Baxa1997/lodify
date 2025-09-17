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
import { Safety } from "./components/Safety";

export const CarrierProfile = () => {

  const { generalInfo, companySnapshot, carrierDetails, insuranceHistory } = useCarrierProfileProps();

  return <Box>
    <Box className={styles.header}>
      <MainHeading size="18px">Carrier Profile</MainHeading>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      gap="24px"
    >
      <MainSection data={generalInfo} />
      <CompanyInformation data={companySnapshot} />
      <ValidateCarrier />
      <ValidateEquipment />
      <Authority data={carrierDetails} />
      <Insurance
        data={insuranceHistory}
        carrierDetails={carrierDetails}
      />
      <Safety data={companySnapshot} />
    </Box>
  </Box>;
};
