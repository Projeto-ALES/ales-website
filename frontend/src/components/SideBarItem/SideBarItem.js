import React from "react";
import { Link } from "react-router-dom";

import styles from "./SideBarItem.module.scss";

const SideBarItem = ({ text, icon, to, isOpen, onClick }) => {
  return (
    <li className={styles.container} onClick={onClick}>
      <Link className={`${styles.item}`} to={to}>
        <div>
          <span style={{ color: "#F9A620", fontSize: "1.5em" }}>
            <i class={icon}></i>
          </span>
        </div>
        <div className={`${styles.item__text} ${isOpen && styles.item__isOpen}`}>
          <span>{text}</span>
        </div>
      </Link>
    </li>
  );
};

export default SideBarItem;
