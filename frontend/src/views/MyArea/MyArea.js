import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Card from "components/Card/Card";

import { getItems } from "./items";
import styles from "./MyArea.module.scss";

import { context } from "store/store";

const MyArea = () => {
  const [state] = useContext(context);
  const { user } = state;

  return (
    <Page>
      <PageTitle title="Minha Área" icon="fas fa-house-user" />
      <Container>
        <div className={styles.cards}>
          {getItems(user.id).map((item) => {
            return (
              <Link to={item.route} className={styles.card}>
                <Card id={item.id} kind="outline-yellow">
                  <div className={styles.item}>
                    <span className={styles.item__icon}>
                      <i class={item.icon}></i>
                    </span>
                    <span className={styles.item__text}>{item.text}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </Page>
  );
};

export default MyArea;
