import { useState } from "react";
import { useGetSmsResult } from "../../../../services/companyInfo.service";

export const useSmsResultProps = () => {
  const [enabled, setEnabled] = useState(false);

  const { data } = useGetSmsResult({
    enabled, 
  });

  const onAccordionChange = () => {
    setEnabled(true);
  };

  const headData = [
    {
      label: "Inspection Date",
      key: "insp_date",
    },
    {
      label: "Report Number",
      key: "report_number",
    },
    {
      label: "Report State",
      key: "report_state",
    },
    {
      label: "Violation",
      key: "section_desc",
    },
    {
      label: "Vehicle Plate Number",
      key: "unit_license",
    },
    {
      label: "Vehicle Plate State",
      key: "unit_license_state",
    },
    {
      label: "Vehicle Type",
      key: "unit_type_desc",
    },
    {
      label: "Severity Weight",
      key: "severity_weight",
    },
    {
      label: "Time Weight",
      key: "time_weight",
    },
  ];

  return {
    headData,
    bodyData: data?.response,
    onAccordionChange,
  };
};
