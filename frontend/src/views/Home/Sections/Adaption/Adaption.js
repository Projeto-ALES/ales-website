import React from "react";

import Container from "components/Container/Container";

import styles from "./Adaption.module.scss";

const Adaption = () => {
  return (
    <div className={styles.adaptionContainer}>
      <Container>
        <div className={styles.adaptionTitle}>
          <span>
            <i class="fas fa-exclamation-triangle"></i>
          </span>
          <h2>Adaptação à Pandemia</h2>
        </div>
        <div className={styles.adaptionDescription}>
          <p>
            Devido ao cenário da pandemia e quarentena no Brasil, nossas atividades (tanto internas
            quanto externas) estão sendo realizadas remotamente e seguirá assim até pelo menos o
            final de 2020.
          </p>
          <p>
            Nossas aulas e atividades voltadas para os alunos continuarão sendo realizadas (de forma
            remota agora). Sabemos das limitações que tal formato possui, mas estamos nos planejando
            e preparando da melhor forma possível para que consigamos atingir o nosso propósito.
            Infelizmente não conseguiremos oferecer todas as matérias planejadas no começo do ano :(
            mas as que forem oferecidas estarão preparadas pra oferecer a melhor experiência
            possível para os alunos.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Adaption;
