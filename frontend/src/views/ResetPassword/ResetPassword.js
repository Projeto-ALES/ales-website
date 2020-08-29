import React, { useState } from "react";
import routes from "routes/routes";

import { resetPassword } from "services/auth.service";
import { toast } from "react-toastify";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import styles from "./ResetPassword.module.scss";

const ResetPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitResetPasswordRequest = (e, email) => {
    e.preventDefault();
    setIsLoading(true);

    resetPassword(email)
      .then(() => {
        history.push(routes.RESET_PASSWORD_SENT);

        toast.success("Requisição aceita");
      })
      .catch((err) => {
        err.response && err.response.status === 404
          ? toast.error("Email não encontrado")
          : toast.error("Ops! Aconteceu algum erro");
        setIsLoading(false);
      });
  };

  return (
    <Page>
      <Container>
        <div className={styles.container}>
          <Card kind="outline-blue">
            <form className={styles.form} onSubmit={(e) => submitResetPasswordRequest(e, email)}>
              <div className={styles.form__title}>
                <h3>Recuperar Senha</h3>
              </div>
              <div className={styles.form__description}>
                <p>
                  Esqueceu a senha? Digite o email cadastrado pra te ajudarmos a definir uma nova :)
                </p>
              </div>
              <div className={styles.form__input}>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.form__button}>
                <Button
                  text="Recuperar Senha"
                  kind="success"
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Page>
  );
};

export default ResetPassword;
