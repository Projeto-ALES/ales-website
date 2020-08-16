import React from "react";

import styles from "./Card.module.scss";

const Card = ({ children, kind }) => {
  return <div className={`${styles.card} ${styles[kind]}`}>{children}</div>;
};

export default Card;
