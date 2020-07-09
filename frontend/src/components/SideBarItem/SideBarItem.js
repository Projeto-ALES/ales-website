import React from "react";
import { Link } from "react-router-dom";

import styles from "./SideBarItem.module.scss";

const SideBarItem = ({ text, icon, to, isOpen, onClick }) => {
  return (
    <li className={styles.itemContainer} onClick={onClick}>
      <Link className={`${styles.itemLink}`} to={to}>
        <div>
          <span style={{ color: "white", fontSize: "1.5em" }}>
            <i class={icon}></i>
          </span>
        </div>
        <div className={`${styles.itemText} ${isOpen && styles.isOpenText}`}>
          <span>{text}</span>
        </div>
      </Link>
    </li>
  );
};

export default SideBarItem;
