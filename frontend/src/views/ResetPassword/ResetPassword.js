import React from "react";

import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  return (
    <div className={styles.resetPasswordContainer}>
      <Container>
        <div className={styles.cardContainer}>
          <Card kind="outline-blue">
            <div className={styles.cardContentContainer}>
              <div className={styles.resetPasswordTitle}>
                <h3>Recuperar Senha</h3>
              </div>
              <div className={styles.resetPasswordDescription}>
                <p>
                  Esqueceu a senha? Digite o email cadastrado pra te ajudarmos a definir uma nova :)
                </p>
              </div>
              <div className={styles.inputContainer}>
                <Input placeholder="Email" type="text" required />
              </div>
              <Button
                text="Recuperar Senha"
                kind="success"
                onClick={() => alert("reset password")}
              />
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
