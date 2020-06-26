import React from "react";

import Container from "components/Container/Container";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import styles from "./Profile.module.scss";

const Profile = ({ history }) => {
  return (
    <div className={styles.profileContainer}>
      <Container>
        <div className={styles.profileTitle}>
          <h2>Meu Perfil</h2>
        </div>
        <div className={styles.formsContainer}>
          <form className={styles.forms}>
            <div className={styles.formsSection}>
              <span>Dados Principais</span>
              <Input label="Nome" type="text" />
              <Input label="Email" type="text" />
              <Input label="Telefone" type="text" />
            </div>
            <div className={styles.formsSection}>
              <span>Dados Opcionais</span>
              <Input label="Data de Nascimento" type="text" />
              <Input label="Gênero" type="text" />
              <Input label="Curso/Área de Trabalho" type="text" />
            </div>
            <div className={styles.formsSection}>
              <span>Autenticação</span>
              <Input label="Senha Atual" type="password" />
              <Input label="Nova Senha" type="password" />
              <Input label="Confirmação da Nova Senha" type="password" />
            </div>
          </form>
          <div className={styles.buttonsContainer}>
            <Button text="Voltar" kind="primary" onClick={() => history.goBack()} />
            <Button text="Salvar" kind="success" onClick={() => alert("forms submission")} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
