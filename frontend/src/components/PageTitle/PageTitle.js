import React from "react";

import styles from "./PageTitle.module.scss";

const PageTitle = ({ title, icon }) => {
  return (
    <div className={styles.title}>
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
