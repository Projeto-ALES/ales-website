import React, { useState } from "react";

import Container from "components/Container/Container";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";

import styles from "./Profile.module.scss";

const Profile = ({ history }) => {
  const [gender, setGender] = useState("");

  const options = [
    { id: 1, value: "Gender", text: "Escolha um gênero", selected: true, disabled: true },
    { id: 2, value: "M", text: "M", selected: false, disabled: false },
    { id: 3, value: "F", text: "F", selected: false, disabled: false },
    { id: 4, value: "N", text: "Não me identifico", selected: false, disabled: false },
  ];

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
              <Input placeholder="Nome" type="text" required />
              <Input placeholder="Email" type="text" required />
              <Input placeholder="Telefone" type="text" required />
            </div>
            <div className={styles.formsSection}>
              <span>Dados Opcionais</span>
              <Input placeholder="Data de Nascimento" type="text" />
              <div className={styles.dropdownContainer}>
                <Dropdown name="gender" options={options} onSelect={setGender} />
              </div>
              <Input placeholder="Curso/Área de Trabalho" type="text" />
            </div>
            <div className={styles.formsSection}>
              <span>Autenticação</span>
              <Input placeholder="Senha Atual" type="password" required />
              <Input placeholder="Nova Senha" type="password" required />
              <Input placeholder="Confirmação da Nova Senha" type="password" required />
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
