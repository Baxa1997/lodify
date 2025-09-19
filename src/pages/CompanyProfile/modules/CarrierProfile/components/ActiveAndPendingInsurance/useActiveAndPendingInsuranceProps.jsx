export const useActiveAndPendingInsuranceProps = () => {


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
    },
    {
      label: "Coverage From",
      key: "underl_lim_amount",
    },
    {
      label: "Coverage To",
      key: "max_cov_amount",
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
  };
};