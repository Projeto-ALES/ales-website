import React from "react";

import Container from "components/Container/Container";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";

import Alessauro from "assets/logos/alessauro.svg";
import styles from "./Recruitment.module.scss";

const Recruitment = () => {
  return (
    <div className={styles.container} id="recrutamento">
      <Container>
        <div className={styles.title}>
          <img src={Alessauro} alt="alessauro" />
          <h2>Recrutamento de voluntários!</h2>
        </div>
        <div className={styles.subtitle}>
          <h3>O ALES está precisando de novos voluntários e está com inscrições abertas \o/</h3>
        </div>
        <div className={styles.description}>
          <p>
            Estamos em busca de <b>pessoas inconformadas</b> com a situação atual do ensino público. O ALES tem como propósito mudar isso
            através de um ensino alternativo, mostrando que aprender pode ser divertido e abrindo novas perspectivas para os alunos.
            E claro que diante do cenário atual de pandemia, é nossa missão também ajudar os alunos complementando atividades da escola e os apoiando emocionalmente.
          </p>
          <p>
            Temos vagas para professores: <b>Inglês</b>, <b>Humanidades</b>, <b>Programação</b>, <b>Ciências</b>, <b>Matemática</b> e <b>Desenho</b>.<br></br>
              E pra área administrativa: <b>Comunicação</b>, <b>Pessoas</b>, <b>Tech</b>, <b>Financeiro</b> e <b>Sustentabilidade & Compliance</b></p>
          <p>
            As inscrições vão de <b>25/01</b> até <b>29/01</b> e podem ser feitas no formulário a seguir:
            </p>
          <div className={styles.buttons}>
            <a
              className={styles.button}
              href="https://drive.google.com/file/d/1SlgU2G-cZgHtftyRr5IxjgbenEXKlKVR/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Edital" kind="primary" icon="fas fa-info-circle" />
            </a>
            <a
              className={styles.button}
              href="https://docs.google.com/forms/d/e/1FAIpQLSc2C2-mkRGdAAeVYTfSxgochVZdAfcEu0VJekqWmyqWyRAwAA/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Inscrição" kind="purple" icon="far fa-file-alt" />
            </a>
          </div>
        </div>
        <div className={styles.info}>
          <p>Todo o processo ocorrerá de forma remota, assim como as atividades realizadas ao longo do semestre. <br></br>
              Para mais informações, acesse o edital aqui em cima ☝️</p>
        </div>
      </Container >
    </div >
  )
}

export default Recruitment;