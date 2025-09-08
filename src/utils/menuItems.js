export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "/img/dashboard.svg",
    path: "/admin/dashboard",
  },
  {
    id: "trips",
    label: "Trips",
    icon: "/img/route.svg",
    path: "#",
  },
  {
    id: "user",
    label: "User",
    icon: "/img/user.svg",
    path: "#",
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
        path: "#",
      },
      {
        id: "assets",
        label: "Assets",
        path: "#",
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
        path: "#",
      },
      {
        id: "representative",
        label: "Representative",
        path: "#",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: "/img/payments.svg",
    path: "#",
  },
  {
    id: "company_profile",
    label: "Company Profile",
    icon: "/img/profile.svg",
    path: "#",
  },
];
