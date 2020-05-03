import React from "react";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerItem}>
        <a href="https://www.facebook.com/projetoales" target="_blank">
          <span className={styles.itemText}>
            <i class="fab fa-facebook-f"></i>
          </span>
        </a>
      </div>
      <div className={styles.footerItem}>
        <a href="https://www.instagram.com/projetoales/" target="_blank">
          <span className={styles.itemText}>
            <i class="fab fa-instagram"></i>
          </span>
        </a>
      </div>
      <div className={styles.footerItem}>
        <a href="https://www.youtube.com/channel/UCXL_iYkkNcNpWDE6inM_LTg" target="_blank">
          <span className={styles.itemText}>
            <i class="fab fa-youtube"></i>
          </span>
        </a>
      </div>
      <div className={styles.footerItem}>
        <a href="https://github.com/Projeto-ALES" target="_blank">
          <span className={styles.itemText}>
            <i class="fab fa-github-alt"></i>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
