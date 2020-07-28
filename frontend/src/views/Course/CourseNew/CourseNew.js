import React, { useState } from "react";

import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";

import styles from "./CourseNew.module.scss";

const CourseNew = ({ history }) => {
  const coordinators = [
    { id: 1, value: "", text: "Selecione umx coordenadorx", selected: true, disabled: true },
    { id: 1, value: "Victor", text: "Victor", selected: false, disabled: false },
    { id: 2, value: "Ellen", text: "Ellen", selected: false, disabled: false },
    { id: 3, value: "Henrique", text: "Henrique", selected: false, disabled: false },
  ];

  const [coordinator, setCoordinator] = useState("");

  return (
    <div className={styles.courseNewContainer}>
      <Container>
        <div className={styles.courseNewTitle}>
          <h2>Nova Matéria</h2>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.formsSection}>
              <Input placeholder="Nome" type="text" required />
            </div>
            <div className={styles.formsSection}>
              <Input placeholder="Descrição" type="text" required />
            </div>
            <div className={styles.formsSection}>
              <Input placeholder="Data de Início" type="text" required />
            </div>
            <div className={styles.formsSection}>
              <Input placeholder="Data de Término" type="text" required />
            </div>
            <div className={styles.formsSection}>
              <div className={styles.dropdownContainer}>
                <Dropdown name="coordinator" options={coordinators} onSelect={setCoordinator} />
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <Button
                text="Voltar"
                onClick={() => {
                  history.goBack();
                }}
              />
              <Button kind="success" text="Enviar" onClick={() => {}} />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CourseNew;
