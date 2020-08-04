import React from "react";

import styles from "./ButtonIcon.module.scss";

const ButtonIcon = ({ text, icon, onClick, kind, isLoading, width }) => {
  return (
    <div className={`${styles.button} ${styles[kind]}`} onClick={onClick} style={{ width }}>
      {isLoading ? (
        <div className={styles.loader} />
      ) : (
        <>
          <span className={styles.text}>{text}</span>
          <i class={icon} className={styles.icon}></i>
        </>
      )}
    </div>
  );
};

export default ButtonIcon;
