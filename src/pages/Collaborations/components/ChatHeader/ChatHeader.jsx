import React from "react";
import styles from "./ChatHeader.module.scss";

const ChatHeader = ({conversation}) => {
  const {name, username, avatar, isOnline, isGroup} = conversation;

  return (
    <div className={styles.chatHeader}>
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <img src={avatar} alt={name} className={styles.avatar} />
          {isOnline && <div className={styles.onlineIndicator} />}
        </div>

        <div className={styles.userDetails}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.statusContainer}>
            <span className={styles.status}>
              {isOnline ? "Online" : "Offline"}
            </span>
            {isGroup && (
              <span className={styles.groupBadge}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10.8c-2.652 0-4.8-2.148-4.8-4.8S3.348 1.2 6 1.2s4.8 2.148 4.8 4.8-2.148 4.8-4.8 4.8z"
                    fill="#6B7280"
                  />
                  <path d="M4.8 4.8h2.4v2.4H4.8V4.8z" fill="#6B7280" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton} title="Call">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 3.5C2 2.67157 2.67157 2 3.5 2H5.5C6.32843 2 7 2.67157 7 3.5V4.5C7 5.32843 6.32843 6 5.5 6H4.5C4.22386 6 4 6.22386 4 6.5C4 6.77614 4.22386 7 4.5 7H5.5C6.32843 7 7 7.67157 7 8.5V9.5C7 10.3284 6.32843 11 5.5 11H3.5C2.67157 11 2 10.3284 2 9.5V3.5Z"
              fill="#6B7280"
            />
            <path
              d="M13 3.5C13 2.67157 13.6716 2 14.5 2H16.5C17.3284 2 18 2.67157 18 3.5V4.5C18 5.32843 17.3284 6 16.5 6H15.5C15.2239 6 15 6.22386 15 6.5C15 6.77614 15.2239 7 15.5 7H16.5C17.3284 7 18 7.67157 18 8.5V9.5C18 10.3284 17.3284 11 16.5 11H14.5C13.6716 11 13 10.3284 13 9.5V3.5Z"
              fill="#6B7280"
            />
          </svg>
        </button>

        <button className={styles.actionButton} title="Archive">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 4C2 3.44772 2.44772 3 3 3H17C17.5523 3 18 3.44772 18 4V6C18 6.55228 17.5523 7 17 7H3C2.44772 7 2 6.55228 2 6V4Z"
              fill="#6B7280"
            />
            <path
              d="M4 7V15C4 16.1046 4.89543 17 6 17H14C15.1046 17 16 16.1046 16 15V7"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className={`${styles.actionButton} ${styles.primaryButton}`}
          title="View profile">
          View profile
        </button>

        <button className={styles.actionButton} title="More options">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 6C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5C9 5.55228 9.44772 6 10 6Z"
              fill="#6B7280"
            />
            <path
              d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z"
              fill="#6B7280"
            />
            <path
              d="M10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16Z"
              fill="#6B7280"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
