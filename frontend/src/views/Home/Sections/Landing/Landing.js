import React from "react";

import Container from "components/Container/Container";
import Button from "components/Button/Button";

import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Container>
        <div className={styles.landingContainer}>
          <h1>Projeto Além da Escola</h1>
          <h3>Aulas extracurriculares aos finais de semana e de graça! \o/</h3>
          <div className={styles.buttonsContainer}>
            <Button
              text="Nossas Matérias"
              kind="secondary"
              onClick={() => alert("click nossas matérias")}
            />
            <Button text="Contato" kind="secondary" onClick={() => alert("click contato")} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
