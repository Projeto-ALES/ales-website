import React from "react";

import styles from "./DateInput.module.scss";

const DateInput = ({ placeholder, onChange, value, required, min }) => {
  return (
    <div className={styles.container}>
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

export default DateInput;
