import { format, parseISO, isValid } from "date-fns";

export function formatDate(dateString) {
  if (!dateString || dateString === "undefined" || dateString === "null") {
    return "";
  }

  const date = parseISO(dateString);
  if (!isValid(date)) {
    return "";
  }

  return format(date, "MMM dd, HH:mm zzz");
}
