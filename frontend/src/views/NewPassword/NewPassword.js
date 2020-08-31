import React, { useState } from "react";
import routes from "routes/routes";

import { newPassword } from "services/auth.service";
import { toast } from "react-toastify";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import styles from "./NewPassword.module.scss";

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitNewPassword = (e, new_password, new_password_conf, token) => {
    e.preventDefault();

    if (new_password !== new_password_conf) {
      toast.error("A senha e sua confirmação devem ser iguais");
      return;
    }

    setIsLoading(true);

    newPassword(new_password, new_password_conf, token)
      .then(() => {
        history.push(routes.PASSWORD_CHANGED);
        toast.success("Senha alterada com sucesso");
      })
      .catch(() => {
        toast.error(
          "Ops! Parece que a requisição pra cadastrar uma nova senha expirou :( Tente gerar outra requisição"
        );
        setIsLoading(false);
      });
  };

  return (
    <Page>
      <Container>
        <div className={styles.card}>
          <Card kind="outline-blue">
            <form
              className={styles.form}
              onSubmit={(e) => submitNewPassword(e, password, passwordConf, match.params.token)}
            >
              <div className={styles.form__title}>
                <h3>Nova Senha</h3>
              </div>
              <div className={styles.form__description}>
                Defina uma nova senha para poder entrar no nosso site :)
              </div>
              <div className={styles.form__inputs}>
                <Input
                  placeholder="Nova Senha"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <Input
                  placeholder="Confirmação da Nova Senha"
                  type="password"
                  onChange={(e) => setPasswordConf(e.target.value)}
                  value={passwordConf}
                  required
                />
              </div>
              <div className={styles.form__button}>
                <Button
                  text="Redefinir Senha"
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

export default NewPassword;
