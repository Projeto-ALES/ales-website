import React from "react";

import routes from "routes/routes";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import Button from "components/Button/Button";

import styles from "./PasswordChanged.module.scss";

const PasswordChanged = ({ history }) => {
  return (
    <Page>
      <Container>
        <div className={styles.title}>
          <h3>Senha redefinida!</h3>
        </div>
        <div className={styles.description}>
          <p>Agora é só entrar de novo no site com a nova senha \o/</p>
        </div>
        <div className={styles.button}>
          <Button text="Entrar" kind="success" onClick={() => history.push(routes.LOGIN)} />
        </div>
      </Container>
    </Page>
  );
};

export default PasswordChanged;
