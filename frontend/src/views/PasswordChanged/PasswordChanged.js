import React from "react";

import Container from "components/Container/Container";
import Button from "components/Button/Button";

import { useHistory } from "react-router-dom";

import styles from "./PasswordChanged.module.scss";

const PasswordChanged = () => {
  let history = useHistory();

  return (
    <div className={styles.passwordChangedContainer}>
      <Container>
        <div className={styles.passwordChangedTitle}>
          <h3>Senha redefinida!</h3>
        </div>
        <div className={styles.passwordChangedDescription}>
          <p>Agora é só entrar de novo no site com a nova senha \o/</p>
        </div>
        <Button text="Entrar" kind="success" onClick={() => history.push("/login")} />
      </Container>
    </div>
  );
};

export default PasswordChanged;
