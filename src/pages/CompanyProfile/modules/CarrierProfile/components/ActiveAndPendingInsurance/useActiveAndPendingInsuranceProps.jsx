import { useGetCompanyId } from "@hooks/useGetCompanyId";
import { useGetTable } from "@services/items.service";
import { useState } from "react";

export const useActiveAndPendingInsuranceProps = () => {

  const companies_id = useGetCompanyId();

  const [enabled, setEnabled] = useState(false);

  const { data } = useGetTable("pending_insurance", { enabled }, { data: JSON.stringify({ companies_id }) });

  const onAccordionChange = () => {
    setEnabled(true);
  };

  const headData = [
    {
      label: "Form",
      key: "ins_form_code",
    },
    {
      label: "Type",
      key: "mod_col_1",
    },
    {
      label: "Insurance Carrier",
      key: "name_company",
    },
    {
      label: "Policy/Surety",
      key: "policy_no",
    },
    {
      label: "Posted Date",
      key: "trans_date",
      tdProps: {
        width: "200px",
      },
    },
    {
      label: "Coverage From",
      key: "underl_lim_amount",
      render: (data) => Number(data) * 1000,
    },
    {
      label: "Coverage To",
      key: "max_cov_amount",
      render: (data) => Number(data) * 1000,
    },
    {
      label: "Effective Date",
      key: "effective_date",
    },
    {
      label: "Cancellation Date",
      key: "cancl_effective_date",
    },
  ];
  

  return {
    headData,
    onAccordionChange,
    bodyData: data?.response,
  };
};