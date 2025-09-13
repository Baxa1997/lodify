import clsx from "clsx";
import styles from "./style.module.scss";
import { Box } from "@chakra-ui/react";

export const FormCardSection = ({ children, variant = "default", ...props }) => {
  
  return <Box
    className={clsx(styles.formCard, styles[variant])}
    {...props}>{children}</Box>;
};
