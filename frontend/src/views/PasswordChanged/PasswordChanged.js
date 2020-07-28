import React from "react";

import Container from "components/Container/Container";
import Button from "components/Button/Button";

import styles from "./PasswordChanged.module.scss";

const PasswordChanged = ({ history }) => {
  return (
    <div className={styles.passwordChangedContainer}>
      <Container>
        <div className={styles.passwordChangedTitle}>
          <h3>Senha redefinida!</h3>
        </div>
        <div className={styles.passwordChangedDescription}>
          <p>Agora é só entrar de novo no site com a nova senha \o/</p>
        </div>
        <div className={styles.buttonContainer}>
          <Button text="Entrar" kind="success" onClick={() => history.push("/login")} />
        </div>
      </Container>
    </div>
  );
};

export default PasswordChanged;
