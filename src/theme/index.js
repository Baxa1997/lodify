import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      500: "#181D27",
    },
    blue: {
      500: "#1570EF",
    },
    red: {
      500: "#D92D20",
    },
    gray: {
      50: "#FAFAFA",
      100: "#F5F7FA",
      200: "#E9EAEB",
      300: "#D5D7DA",
      400: "#A4A7AE",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#717680",
      bg: {
        disabled: "#FAFAFA",
      },
      color: {
        disabled: "#717680",
      },
      "border-main": "#E9EAEB",
    },
  },
});

export default theme;
