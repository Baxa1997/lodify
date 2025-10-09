export const useAuthorityProps = () => {

  const headData = [
    {
      label: "Authority Type",
      key: "authority_type",
    },
    {
      label: "Orgina Avtion",
      key: "orgina_avtion",
    },
    {
      label: "Action Date",
      key: "action_date",
    },
    {
      label: "Disposition Action",
      key: "disposition_action",
    },
    {
      label: "Disposition Date",
      key: "disposition_date",
    },
  ];

  const bodyData = [
    {
      authority_type: "Authority Type",
      orgina_avtion: "Orgina Avtion",
      action_date: "Action Date",
      disposition_action: "Disposition Action",
      disposition_date: "Disposition Date",
    },
    {
      authority_type: "Authority Type",
      orgina_avtion: "Orgina Avtion",
      action_date: "Action Date",
      disposition_action: "Disposition Action",
      disposition_date: "Disposition Date",
    },
  ];

  const headData1 = [
    {
      label: "type",
      key: "type",
    },
    {
      label: "OOS",
      key: "oos",
    },
    {
      label: "Inspections",
      key: "inspections",
    },
    {
      label: "OOS %",
      key: "oos_percent",
    },
    {
      label: "National Average %",
      key: "national_average",
    },
  ];

  const bodyData1 = [
    {
      type: "Authority Type",
      oos: "Orgina Avtion",
      inspections: "Action Date",
      oos_percent: "Disposition Action",
      national_average: "Disposition Date",
    },
    {
      type: "Authority Type",
      oos: "Orgina Avtion",
      inspections: "Action Date",
      oos_percent: "Disposition Action",
      national_average: "Disposition Date",
    },
  ];

  return {
    headData,
    bodyData,
    headData1,
    bodyData1, 
  };
};