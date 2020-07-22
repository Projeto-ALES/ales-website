import React, { useState } from "react";

import Container from "components/Container/Container";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";

import styles from "./ProfessorEnroll.module.scss";

const ProfessorEnroll = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState("");

  const options = [
    { id: 1, value: "Gender", text: "Gênero", selected: true, disabled: true },
    { id: 2, value: "M", text: "M", selected: false, disabled: false },
    { id: 3, value: "F", text: "F", selected: false, disabled: false },
    { id: 4, value: "N", text: "Não me identifico", selected: false, disabled: false },
  ];

  return (
    <div className={styles.professorEnrollContainer}>
      <Container>
        <div className={styles.professorEnrollTitle}>
          <h2>Cadastro de Novx Professorx</h2>
        </div>
        <div className={styles.formsContainer}>
          <form className={styles.forms}>
            <div className={styles.formsSection}>
              <span>Dados Principais</span>
              <Input
                placeholder="Nome"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <Input
                placeholder="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <Input
                placeholder="Telefone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </div>
            <div className={styles.formsSection}>
              <span>Dados Opcionais</span>
              <Input
                placeholder="Data de Nascimento"
                type="text"
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
              />
              <div className={styles.dropdownContainer}>
                <Dropdown name="gender" options={options} onSelect={setGender} />
              </div>
              <Input
                placeholder="Curso/Área de Trabalho"
                type="text"
                onChange={(e) => setArea(e.target.value)}
                value={area}
              />
            </div>
            <div className={styles.formsSection}>
              <span>Autenticação</span>
              <Input
                placeholder="Senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <Input
                placeholder="Confirmação da Senha"
                type="password"
                onChange={(e) => setPasswordConf(e.target.value)}
                value={passwordConf}
                required
              />
            </div>
          </form>
          <div className={styles.buttonsContainer}>
            <Button text="Enviar" kind="success" onClick={() => alert("forms submission")} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfessorEnroll;
