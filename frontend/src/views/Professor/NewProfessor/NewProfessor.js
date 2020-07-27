import React, { useState } from "react";

import routes from "routes/routes";

import { invite } from "services/professor.service";

import Container from "components/Container/Container";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { toast } from "react-toastify";

import styles from "./NewProfessor.module.scss";

const NewProfessor = ({ history }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitInvitation = (e, email) => {
    e.preventDefault();
    setIsLoading(true);

    invite(email)
      .then(() => {
        history.push(routes.PROFESSORS);
        toast.success("Convite enviado!");
      })
      .catch((err) => {
        err.response && err.response.status === 409
          ? toast.error("Ops! Essx professorx já está cadastradx")
          : toast.error("Ops! Aconteceu algum erro");
        setIsLoading(false);
      });
  };

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
          <form className={styles.formContainer} onSubmit={(e) => submitInvitation(e, email)}>
            <div className={styles.emailInput}>
              <Input
                placeholder="Email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.buttonsContainer}>
              <Button text="Voltar" type="button" onClick={() => history.goBack()} />
              <Button
                kind="success"
                text="Enviar"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default NewProfessor;
