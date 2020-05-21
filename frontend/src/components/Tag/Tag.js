import React from "react";

import styles from "./Tag.module.scss";

const Tag = ({ text, kind }) => {
  return (
    <div className={`${styles.tagContainer} ${styles[kind]}`}>
      <span className={styles.tagText}>{text}</span>
    </div>
  );
};

export default Tag;
