import React from "react";

import Card from "components/Card/Card";

import styles from "./Contact.module.scss";
import items from "./items";

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h2>Como entrar em contato com a gente</h2>
      </div>
      <div className={styles.contactItems}>
        {items.map((item) => {
          return (
            <div className={styles.cardContainer}>
              <Card kind="outline-yellow">
                <div className={styles.contactItem}>
                  <i class={item.icon}></i>
                  <span>{item.text}</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;
