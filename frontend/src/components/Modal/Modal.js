import React from "react";

import styles from "./Modal.module.scss";

const Modal = ({ children, title }) => {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <div className={styles.title}>
          {title && (
            <div className={styles.title__text}>
              <h3>{title}</h3>
            </div>
          )}
          <div className={styles.title__icon}>
            <span>
              <i class="fas fa-times"></i>
            </span>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
