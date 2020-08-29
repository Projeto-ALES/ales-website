import React from "react";

import items from "./items";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      {items.map((item) => {
        return (
          <div className={styles.item} key={item.id}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <span className={styles.item__text}>
                <i class={item.icon}></i>
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
