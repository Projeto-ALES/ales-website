import React, { useState } from "react";

import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";

import styles from "./CourseEdit.module.scss";

const CourseEdit = ({ history, match }) => {
  const coordinators = [
    { id: 1, value: "Victor", text: "Victor", selected: true, disabled: true },
    { id: 2, value: "Ellen", text: "Ellen", selected: false, disabled: false },
    { id: 3, value: "Henrique", text: "Henrique", selected: false, disabled: false },
  ];

  const [coordinator, setCoordinator] = useState("");

  return (
    <div className={styles.courseEditContainer}>
      <Container>
        <div className={styles.courseEditTitle}>
          <h2>Programação</h2>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.formsSection}>
              <Input
                label="Nome"
                type="text"
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
              />
            </div>
            <div className={styles.formsSection}>
              <Input label="Descrição" value="Matéria muito legal" type="text" />
            </div>
            <div className={styles.formsSection}>
              <Input label="Data de Início" value="31/07/2020" type="text" />
            </div>
            <div className={styles.formsSection}>
              <Input label="Data de Término" value="31/11/2020" type="text" />
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
              <Button kind="success" text="Salvar" onClick={() => {}} />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CourseEdit;
