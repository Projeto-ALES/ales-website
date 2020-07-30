import React from "react";

import Card from "components/Card/Card";
import Input from "components/Input/Input";
import TextArea from "components/TextArea/TextArea";
import Button from "components/Button/Button";

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
      <div className={styles.formContainer}>
        <h3>Mande uma mensagem!</h3>
        <form className={styles.contactForm}>
          <div className={styles.formContent}>
            <Input placeholder="Nome" required />
            <Input placeholder="Email" required />
            <TextArea placeholder="Mensagem" rows={4} required />
          </div>
          <Button text="Enviar" width="200px" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
