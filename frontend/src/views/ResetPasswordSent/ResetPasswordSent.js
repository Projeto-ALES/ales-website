import React from "react";

import Container from "components/Container/Container";
import Button from "components/Button/Button";

import { useHistory } from "react-router-dom";

import styles from "./ResetPasswordSent.module.scss";

const ResetPasswordSent = () => {
  let history = useHistory();

  return (
    <div className={styles.resetPasswordSentContainer}>
      <Container>
        <div className={styles.resetPasswordSentTitle}>
          <h3>Redefinição de senha enviada!</h3>
        </div>
        <div className={styles.resetPasswordSentDescription}>
          <p>As instruções para a criação de uma nova senha foram enviadas pelo email digitado.</p>
          <p>
            Caso não tenha recebido o nosso email, verifique na caixa de spam e certifique-se que o
            email foi digitado corretamente na tela anterior
          </p>
        </div>
        <Button text="Voltar" kind="primary" onClick={() => history.goBack()} />
      </Container>
    </div>
  );
};

export default ResetPasswordSent;
