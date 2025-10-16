import React from "react";
import styles from "./ConversationItem.module.scss";

const ConversationItem = ({conversation, isSelected, onClick, isEditing}) => {
  const {
    name,
    username,
    avatar,
    lastMessage,
    timestamp,
    unreadCount,
    isOnline,
    isGroup,
  } = conversation;

  return (
    <div
      className={`${styles.conversationItem} ${
        isSelected ? styles.selected : ""
      }`}
      onClick={onClick}>
      <div className={styles.avatarContainer}>
        <img src={"/img/Avatar.svg"} alt={name} className={styles.avatar} />
        {isOnline && <div className={styles.onlineIndicator} />}
        {unreadCount > 0 && (
          <div className={styles.unreadBadge}>{unreadCount}</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>

        <div className={styles.messageContainer}>
          <p className={styles.lastMessage}>{lastMessage}</p>
          {isGroup && (
            <div className={styles.groupIndicator}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10.8c-2.652 0-4.8-2.148-4.8-4.8S3.348 1.2 6 1.2s4.8 2.148 4.8 4.8-2.148 4.8-4.8 4.8z"
                  fill="#6B7280"
                />
                <path d="M4.8 4.8h2.4v2.4H4.8V4.8z" fill="#6B7280" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className={styles.editActions}>
          <button className={styles.editButton}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M8.75 1.75L12.25 5.25L3.5 14H0V10.5L8.75 1.75Z"
                fill="#6B7280"
              />
            </svg>
          </button>
          <button className={styles.deleteButton}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1.75 3.5H12.25M10.5 3.5V11.9C10.5 12.2418 10.3652 12.5694 10.1287 12.8059C9.89219 13.0424 9.56463 13.1772 9.22275 13.1772H4.77725C4.43537 13.1772 4.10781 13.0424 3.87132 12.8059C3.63482 12.5694 3.5 12.2418 3.5 11.9V3.5M5.25 3.5V2.1C5.25 1.75812 5.38482 1.43056 5.62132 1.19407C5.85781 0.957575 6.18537 0.822754 6.52725 0.822754H7.47275C7.81463 0.822754 8.14219 0.957575 8.37868 1.19407C8.61518 1.43056 8.75 1.75812 8.75 2.1V3.5"
                stroke="#EF4444"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
