import { format, parseISO, isValid } from "date-fns";

export function formatDate(dateString) {
  const date = parseISO(dateString);
  if (!isValid(date)) {
    return "";
  }

  return format(date, "MMM dd, HH:mm zzz");
}
