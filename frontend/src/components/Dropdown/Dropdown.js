import React from "react";

import styles from "./Dropdown.module.scss";

const Dropdown = ({ name, options, onSelect, value }) => {
  return (
    <select
      className={styles.select}
      name={name}
      onChange={(e) => onSelect(e.target.value)}
      value={value}
    >
      {options.map((op, index) => {
        return (
          <option
            className={styles.option}
            key={index}
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
