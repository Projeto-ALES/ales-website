import React from "react";

import styles from "./Chip.module.scss";

const Chip = ({ text, removable, onRemove, selectable, onSelect, selected }) => {
  return (
    <div
      className={`${styles.chip} ${selectable && styles.selectable} ${selected && styles.selected}`}
      onClick={selectable ? () => onSelect(text) : null}
    >
      <span className={styles.text}>{text}</span>
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(text);
          }}
        >
          <span className={styles.icon}>
            <i class="fas fa-times"></i>
          </span>
        </button>
      )}
    </div>
  );
};

export default Chip;
