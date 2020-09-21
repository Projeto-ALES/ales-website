import React, { useRef, useEffect } from "react";

import styles from "./Modal.module.scss";

const Modal = ({ children, title, onClose }) => {
  const modal = useRef();

  const handleClick = (e) => {
    if (modal.current.contains(e.target)) {
      return;
    }
    onClose();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal} ref={modal}>
        <div className={styles.title}>
          {title && (
            <div className={styles.title__text}>
              <h3>{title}</h3>
            </div>
          )}
          <div className={styles.title__icon} onClick={onClose}>
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
