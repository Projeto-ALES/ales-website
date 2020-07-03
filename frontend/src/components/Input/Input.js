import React from "react";

import styles from "./Input.module.scss";

const Input = ({ label, type, onChange, value }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type={type}
        value={value || ""}
        onChange={onChange}
        required
      />
      <span className={styles.highlight}></span>
      <span className={styles.bar}></span>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Input;
