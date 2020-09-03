import React from "react";

import styles from "./Chip.module.scss";

const Chip = ({ text, onRemove }) => {
  return (
    <div className={styles.chip}>
      <span className={styles.text}>{text}</span>
      <button onClick={() => onRemove(text)}>
        <span className={styles.icon}>
          <i class="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default Chip;
