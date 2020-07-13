import React from "react";
import { Link } from "react-router-dom";

import Container from "components/Container/Container";
import Card from "components/Card/Card";

import items from "./items";
import styles from "./MyArea.module.scss";

const MyArea = () => {
  return (
    <div className={styles.myAreaContainer}>
      <Container>
        <div className={styles.myAreaTitle}>
          <h2>Minha Área</h2>
        </div>
        <div className={styles.cardsContainer}>
          {items.map((item) => {
            return (
              <Link to={item.route} className={styles.cardContainer}>
                <Card id={item.id} kind="outline-yellow">
                  <div className={styles.cardContentContainer}>
                    <span>
                      <i class={item.icon}></i>
                    </span>
                    <span>{item.text}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default MyArea;
