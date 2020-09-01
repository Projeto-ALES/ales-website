import React from "react";

import styles from "./DateInput.module.scss";

const DateInput = ({ onChange, value, required }) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="date"
        value={value || ""}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default DateInput;
