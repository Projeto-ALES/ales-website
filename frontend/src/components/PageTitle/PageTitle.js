import React from "react";

import styles from "./PageTitle.module.scss";

const PageTitle = ({ title, icon, height }) => {
  return (
    <div className={styles.title} style={{ height: height }}>
      <h2 className={styles.title__text}>{title}</h2>
      {icon && (
        <span className={styles.title__icon}>
          <i class={icon}></i>
        </span>
      )}
    </div>
  );
};

export default PageTitle;
