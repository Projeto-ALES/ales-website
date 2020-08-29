import React from "react";

import styles from "./Input.module.scss";

const Input = ({ placeholder, type, onChange, value, required }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
