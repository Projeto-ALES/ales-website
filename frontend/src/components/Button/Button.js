import React from "react";

import styles from "./Button.module.scss";

const Button = ({ text, onClick, kind, isLoading, disabled }) => {
  return (
    <button className={`${styles.button} ${styles[kind]}`} onClick={onClick} disabled={disabled}>
      {isLoading ? <div className={styles.loader} /> : text}
    </button>
  );
};

export default Button;
