export const tableElements = [
  {
    id: 1,
    name: "Trip ID",
    key: "tripId",
    sortable: true,
  },
  {
    id: 2,
    name: "Origin",
    key: "origin",
    sortable: true,
  },
  {
    id: 3,
    name: "Stop",
    key: "stop",
    sortable: true,
  },
  {
    id: 4,
    name: "Tracktor ID",
    key: "tracktorId",
    sortable: true,
  },
  {
    id: 5,
    name: "Destination",
    key: "destination",
    sortable: true,
  },
  {
    id: 6,
    name: "Equipment",
    key: "equipment",
    sortable: true,
  },
  {
    id: 7,
    name: "Load Type",
    key: "loadType",
    sortable: true,
  },
  {
    id: 8,
    name: "Rate",
    key: "rate",
    sortable: true,
  },
  {
    id: 9,
    name: "Driver",
    key: "driver",
    sortable: true,
  },
  {
    id: 10,
    name: "Loads",
    key: "loads",
    sortable: true,
  },
];

export default tableElements;

export function getShortFileName(url, maxBaseLength = 5) {
  let fullName;
  try {
    const u = new URL(url);
    fullName = u.pathname.split("/").pop();
  } catch {
    fullName = url.split("/").pop();
  }

  const lastDot = fullName.lastIndexOf(".");
  let base = lastDot !== -1 ? fullName.substring(0, lastDot) : fullName;
  const ext = lastDot !== -1 ? fullName.substring(lastDot) : "";

  if (base.length > maxBaseLength) {
    base = base.substring(0, maxBaseLength) + "...";
  }

  return base + ext;
}
