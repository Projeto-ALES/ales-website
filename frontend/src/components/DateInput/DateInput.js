import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateInput.module.scss";

import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

const DateInput = ({ placeholder, selected, onChange, required }) => {
  return (
    <div className={styles.datepicker}>
      <DatePicker
        placeholderText={placeholder}
        selected={selected}
        onChange={onChange}
        required={required}
        locale="pt"
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        yearDropdownItemNumber={15}
        scrollableYearDropdown
      />
    </div>
  );
};

export default DateInput;
