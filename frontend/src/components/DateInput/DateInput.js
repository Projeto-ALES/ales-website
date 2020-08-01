import React from "react";

import styles from "./DateInput.module.scss";

const DateInput = ({ placeholder, onChange, value, required, min }) => {
  return (
    <div className={styles.dateInputContainer}>
      <input
        className={styles.dateInput}
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

export default DateInput;
