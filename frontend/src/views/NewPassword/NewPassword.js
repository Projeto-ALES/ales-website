import React from "react";

import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import { useHistory } from "react-router-dom";

import styles from "./NewPassword.module.scss";

const NewPassword = () => {
  let history = useHistory();

  return (
    <div className={styles.newPasswordContainer}>
      <Container>
        <div className={styles.cardContainer}>
          <Card kind="outline-blue">
            <div className={styles.cardContentContainer}>
              <div className={styles.cardTitle}>
                <h3>Nova Senha</h3>
              </div>
              <div className={styles.cardDescription}>
                Defina uma nova senha para poder entrar no nosso site :)
              </div>
              <div className={styles.inputsContainer}>
                <Input label="Nova Senha" type="password" />
                <Input label="Nova Senha" type="password" />
              </div>
              <Button
                text="Redefinir Senha"
                kind="success"
                onClick={() => history.push("/password-changed")}
              />
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default NewPassword;
