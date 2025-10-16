import React from "react";
import styles from "./DateSeparator.module.scss";

const DateSeparator = ({date}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className={styles.dateSeparator}>
      <div className={styles.line} />
      <span className={styles.dateText}>{formatDate(date)}</span>
      <div className={styles.line} />
    </div>
  );
};

export default DateSeparator;
