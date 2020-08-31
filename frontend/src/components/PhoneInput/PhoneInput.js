import React from "react";

import styles from "./PhoneInput.module.scss";

const PhoneInput = ({ placeholder, onChange, value, required, min }) => {
  return (
    <div className={styles.container}>
      <span className={styles.addon}>+55</span>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        required={required}
        minLength={min}
      />
    </div>
  );
};

export default PhoneInput;
