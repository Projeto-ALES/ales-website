import React from "react";

import styles from "./Tag.module.scss";

const Tag = ({ text, kind }) => {
  return (
    <div className={`${styles.container} ${styles[kind]}`}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Tag;
