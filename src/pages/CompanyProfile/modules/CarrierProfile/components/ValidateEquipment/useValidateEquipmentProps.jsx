import CustomBadge from "../../../../../../components/CustomBadge/CustomBadge";

export const useValidateEquipmentProps = () => {
  const headData = [
    {
      label: "VIN",
      key: "vin",
    },
    {
      label: "Status",
      key: "status",
      render: (data) => {
        return <CustomBadge
          withBgColor
          variant="success">{data}</CustomBadge>;
      },
    },
    {
      label: "Request Sent To",
      key: "request_sent_to",
    },
    {
      label: "Status Date/Time",
      key: "status_date",
    },
  ];

  const bodyData = [
    {
      vin: "123456789",
      status: "Approved",
      request_sent_to: "John Doe",
      status_date: "2023-06-01 10:30 AM",
    },
    {
      vin: "987654321",
      status: "Pending",
      request_sent_to: "Jane Smith",
      status_date: "2023-06-02 11:45 AM",
    },
    {
      vin: "555555555",
      status: "Rejected",
      request_sent_to: "Bob Johnson",
      status_date: "2023-06-03 12:15 PM",
    },
  ];

  return {
    headData,
    bodyData,
  };
};
