import React from "react";

import styles from "./TextArea.module.scss";

const TextArea = ({ placeholder, rows, onChange, value, required }) => {
  return (
    <div className={styles.textareaContainer}>
      <textarea
        rows={rows}
        className={styles.textarea}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextArea;
