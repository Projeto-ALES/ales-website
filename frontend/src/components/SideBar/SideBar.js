import React from "react";
import useHover from "hooks/useHover";

import SideBarItem from "components/SideBarItem/SideBarItem";

import styles from "./SideBar.module.scss";

const SideBar = () => {
  const sideBarItems = [
    { id: 1, text: "Home", icon: "fas fa-home" },
    { id: 2, text: "Localização", icon: "fas fa-map-marked-alt" },
    { id: 3, text: "Matérias", icon: "far fa-calendar-check" },
    { id: 4, text: "Contato", icon: "fas fa-paper-plane" },
  ];

  const [hoverRef, isHovered] = useHover();

  return (
    <nav className={styles.sideBarContainer} ref={hoverRef}>
      <ul className={styles.navListContainer}>
        {sideBarItems.map((item) => {
          return <SideBarItem id={item.id} text={item.text} icon={item.icon} isOpen={isHovered} />;
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
