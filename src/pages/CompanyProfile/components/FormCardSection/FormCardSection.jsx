import clsx from "clsx";
import styles from "./style.module.scss";

export const FormCardSection = ({ children, variant = "default" }) => {
  
  return <div className={clsx(styles.formCard, styles[variant])}>{children}</div>;
};
