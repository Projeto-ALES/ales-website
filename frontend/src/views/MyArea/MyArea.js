import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Container from "components/Container/Container";
import Card from "components/Card/Card";

import { getItems } from "./items";
import styles from "./MyArea.module.scss";

import { context } from "store/store";

const MyArea = () => {
  const [state] = useContext(context);
  const { user } = state;

  return (
    <div className={styles.myAreaContainer}>
      <Container>
        <div className={styles.myAreaTitle}>
          <h2>Minha Área</h2>
        </div>
        <div className={styles.cardsContainer}>
          {getItems(user.id).map((item) => {
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
