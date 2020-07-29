import React from "react";

import styles from "./Button.module.scss";

const Button = ({ type, text, onClick, kind, isLoading, disabled, width }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[kind]}`}
      onClick={onClick}
      disabled={disabled}
      style={{ width }}
    >
      {isLoading ? <div className={styles.loader} /> : text}
    </button>
  );
};

export default Button;
