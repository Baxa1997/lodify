export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "/img/dashboard.svg",
    path: "#",
  },
  {
    id: "trips",
    label: "Trips",
    icon: "/img/route.svg",
    path: "trips",
  },
  {
    id: "carriers",
    label: "Carriers",
    icon: "/img/user.svg",
    path: "carriers",
  },
  {
    id: "user",
    label: "User",
    icon: "/img/user.svg",
    path: "/admin/users",
  },
  {
    id: "resources",
    label: "Managing Recourses",
    icon: "/img/resources.svg",
    path: "#",
    children: [
      {
        id: "drivers",
        label: "Drivers",
        path: "drivers",
      },
      {
        id: "assets",
        label: "Assets",
        path: "assets",
      },
    ],
  },
  {
    id: "contracts",
    label: "Contracts",
    icon: "/img/contacts.svg",
    path: "#",
  },
  {
    id: "clients",
    label: "Clients",
    icon: "/img/clients.svg",
    path: "#",
    children: [
      {
        id: "shippers",
        label: "Shippers",
        path: "shipper",
      },
      {
        id: "representative",
        label: "Representative",
        path: "representative",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: "/img/payments.svg",
    path: "#",
  },
];
