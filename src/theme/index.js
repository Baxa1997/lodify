import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    blue: {
      500: "#1570EF",
    },
    gray: {
      bg: {
        disabled: "#FAFAFA",
      },
      color: {
        disabled: "#717680",
      },
    },
  },
});

export default theme;
