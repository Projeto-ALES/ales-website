import React, { useState } from "react";

import { send } from "services/mail.service";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Card from "components/Card/Card";
import Input from "components/Input/Input";
import TextArea from "components/TextArea/TextArea";
import Button from "components/Button/Button";
import { toast } from "react-toastify";

import styles from "./Contact.module.scss";
import items from "./items";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMessage = (e, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    send(data)
      .then(() => {
        toast.success("Mensagem enviada!");
      })
      .catch(() => {
        toast.success("Ops! Ocorreu algum erro para enviar a mensagem");
      })
      .finally(() => {
        setName("");
        setEmail("");
        setMessage("");
        setIsSubmitting(false);
      });
  };

  return (
    <Page>
      <PageTitle
        title="Como entrar em contato com a gente"
        icon="fas fa-paper-plane"
        height="250px"
      />
      <div className={styles.items}>
        {items.map((item, index) => {
          return (
            <a href={item.to} target="_blank" rel="noopener noreferrer">
              <div className={styles.card} key={index}>
                <Card kind="outline-yellow">
                  <div className={styles.item}>
                    <i class={item.icon}></i>
                    <span>{item.text}</span>
                  </div>
                </Card>
              </div>
            </a>
          );
        })}
      </div>
      <div className={styles.contact}>
        <h3>Mande uma mensagem!</h3>
        <form className={styles.form} onSubmit={(e) => submitMessage(e, { name, email, message })}>
          <div className={styles.inputs}>
            <Input
              placeholder="Nome"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextArea
              placeholder="Mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>
          <Button
            text="Enviar"
            type="submit"
            width="200px"
            kind="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </Page>
  );
};

export default Contact;
