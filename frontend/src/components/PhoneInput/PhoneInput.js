import React from "react";

import styles from "./PhoneInput.module.scss";

const PhoneInput = ({ placeholder, onChange, value, required }) => {
  return (
    <div className={styles.phoneInputContainer}>
      <span className={styles.phoneInputAddon}>+55</span>
      <input
        className={styles.phoneInput}
        type="text"
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default PhoneInput;
