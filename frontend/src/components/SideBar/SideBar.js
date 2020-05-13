import React from "react";
import useHover from "hooks/useHover";

import SideBarItem from "components/SideBarItem/SideBarItem";
import items from "./items";

import styles from "./SideBar.module.scss";

const SideBar = () => {
  const [hoverRef, isHovered] = useHover();

  return (
    <>
      <div className={`${isHovered ? styles.sideBarOverlay : null}`}></div>
      <nav className={styles.sideBarContainer} ref={hoverRef}>
        <ul className={styles.navListContainer}>
          {items.map((item) => {
            return (
              <SideBarItem
                id={item.id}
                text={item.text}
                icon={item.icon}
                to={item.to}
                isOpen={isHovered}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
