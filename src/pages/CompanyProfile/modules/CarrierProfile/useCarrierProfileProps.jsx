import { useSelector } from "react-redux";
import { useGetCarrierDetails, useGetCompanySingle, useGetInsuranceHistory } from "../../services/companyInfo.service";
import { useEffect, useState } from "react";

export const useCarrierProfileProps = () => {
  const { company_id, guid } = useSelector(state => state.auth.user_data);

  const [companySnapshot, setCompanySnapshot] = useState({});
  const [carrierDetails, setCarrierDetails] = useState({});
  const [insuranceHistory, setInsuranceHistory] = useState([]);

  const { data: companyInfoData, isSuccess: companyIsSuccess } = useGetCompanySingle({}, company_id || guid);
  const { data: carrierDetailData, isSuccess: carrierDetailIsSuccess } = useGetCarrierDetails({}, company_id || guid);
  const { data: insuranceHistoryData, isSuccess: insuranceHistoryIsSuccess } = useGetInsuranceHistory({}, company_id || guid);

  const generalInfo = {
    ...companySnapshot,
    ...carrierDetails,
  };

  useEffect(() => {
    if(companyIsSuccess) {
      const companyDataResponse = companyInfoData?.response;
      setCompanySnapshot(companyDataResponse);
    }

    if(carrierDetailIsSuccess) {
      const carrierDataResponse = carrierDetailData?.response?.[0];
      setCarrierDetails(carrierDataResponse);
    }

    if(insuranceHistoryIsSuccess) {
      const insuranceHistoryDataResponse = insuranceHistoryData?.response;
      setInsuranceHistory(insuranceHistoryDataResponse);
    }

  }, [companyInfoData, carrierDetailData, insuranceHistoryData]);

  return {
    generalInfo,
    companySnapshot,
    carrierDetails,
    insuranceHistory,
  };
};
