import React from "react";

import styles from "./SideBarItem.module.scss";

const SideBarItem = ({ text, icon, to, isOpen }) => {
  return (
    <li className={styles.itemContainer}>
      <a className={`${styles.itemLink}`} href={to}>
        <div>
          <span style={{ color: "white", fontSize: "1.5em" }}>
            <i class={icon}></i>
          </span>
        </div>
        <div className={`${styles.itemText} ${isOpen && styles.isOpenText}`}>
          <span>{text}</span>
        </div>
      </a>
    </li>
  );
};

export default SideBarItem;
