import React from "react";

import styles from "./Button.module.scss";

const Button = ({ text, onClick, kind }) => {
  return (
    <button className={`${styles.button} ${styles[kind]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
