import React from "react";

import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import Alessauro from "assets/logos/alessauro.svg";

import styles from "./Login.module.scss";

const Login = ({ history }) => {
  return (
    <div className={styles.loginContainer}>
      <Container>
        <div className={styles.cardContainer}>
          <Card kind="outline-blue">
            <div className={styles.cardContentContainer}>
              <img src={Alessauro} alt="alessauro" />
              <div className={styles.inputsContainer}>
                <Input label="Email" type="text" />
                <Input label="Senha" type="password" />
                <a href="/reset-password">Esqueci a senha</a>
              </div>
              <div className={styles.buttonContainer}>
                <Button text="Entrar" kind="primary" onClick={() => history.push("/my-area")} />
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Login;
