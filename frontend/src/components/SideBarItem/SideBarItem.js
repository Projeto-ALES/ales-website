import React from "react";

import styles from "./SideBarItem.module.scss";

const SideBarItem = ({ text, icon, isOpen }) => {
  return (
    <li className={styles.itemContainer}>
      <a className={`${styles.itemLink} ${isOpen && styles.isOpenLink}`} href="#">
        <span style={{ color: "white", fontSize: "1.5em" }}>
          <i class={icon}></i>
        </span>
        <span className={`${styles.itemText} ${isOpen && styles.isOpenText}`}>{text}</span>
      </a>
    </li>
  );
};

export default SideBarItem;
