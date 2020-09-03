import React from "react";

import styles from "./Dropdown.module.scss";

const Dropdown = ({ name, options, onSelect, value, label }) => {
  return (
    <select
      className={styles.select}
      name={name}
      onChange={(e) => onSelect(e.target.value)}
      value={value || label}
    >
      <option className={styles.option} value={label} selected={true} disabled={true}>
        {label}
      </option>
      {options.map((op) => {
        return (
          <option
            className={styles.option}
            key={op.id}
            value={op.value}
            selected={op.selected}
            disabled={op.disabled}
          >
            {op.text}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
