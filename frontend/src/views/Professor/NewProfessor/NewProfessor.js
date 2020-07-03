import React from "react";

import Container from "components/Container/Container";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import styles from "./NewProfessor.module.scss";

const NewProfessor = ({ history }) => {
  return (
    <div className={styles.newProfessorContainer}>
      <Container>
        <div className={styles.newProfessorTitle}>
          <h2>Adicionar Professor</h2>
        </div>
        <div className={styles.newProfessorDescription}>
          <p>
            Um email será enviado para o email dx professorx com o link de cadastro e instruções
            para tal
          </p>
        </div>
        <div>
          <form className={styles.formContainer}>
            <div className={styles.emailInput}>
              <Input label="Email" type="text" />
            </div>
            <div className={styles.buttonsContainer}>
              <Button text="Voltar" onClick={() => history.goBack()} />
              <Button kind="success" text="Enviar" onClick={() => history.push("/professors")} />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default NewProfessor;
