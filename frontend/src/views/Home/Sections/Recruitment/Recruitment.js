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
          <h2>Novas vagas para alunos !!</h2>
        </div>
        <div className={styles.subtitle}>
          <h3>O Projeto ALES está com vagas abertas para alunos do 8º ano ao 3º ano do ensino médio.</h3>
        </div>
        <div className={styles.description}>
          <p>
            O ano de 2021 já começou e o ALES já está se preparando para o retorno das aulas aos sábados. Neste semestre, seguiremos modelo online semelhante ao implementado no semestre passado, com o auxílio de ferramentas como Google Meet e Google Classroom. As aulas serão aos sábados, com as atividades iniciando às 9h30 e terminando às 17h30.
          </p>
          <p>
            Temos vagas para as seguinte matérias neste semestre: <b>Inglês</b>, <b>Humanidades</b>, <b>Programação</b>, <b>Ciências</b>, <b>Matemática</b> e <b>Desenho</b>.
          </p>
          <p>
            O nosso cronograma de aulas de sábado seguirá a seguinte agenda semanal:
  <ul>9h30 - 10h30: Inglês</ul>
  <ul>10h35 - 11h50: Humanidades</ul>
  <ul>11h50 - 13h00: Período de Almoço</ul>
  <ul>13h00 - 14h00: Programação</ul>
  <ul>14h05 - 15h20: Ciências</ul>
  <ul>15h25 - 16h25: Matemática</ul>
  <ul>16h30 - 17h30: Desenho</ul>
  Você pode escolher quantas matérias quiser (pode fazer uma só ou todas!!!)
          </p>
  <p>
  As inscrições vão de <b>10/02</b> até <b>19/02</b> e podem ser feitas pelo formulário a seguir:
            </p>
          <div className={styles.buttons}>
            <a
              className={styles.button}
              href="https://docs.google.com/forms/d/e/1FAIpQLSeba10ZJF0aJj3382-g2eUZINBuDPTDCaO8BFTRih-eWOnvBQ/viewform?usp=pp_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Inscrição" kind="blue" icon="far fa-file-alt" />
            </a>
          </div>
        <div className={styles.info}>
          <p>Todo o processo ocorrerá de forma remota, assim como as atividades realizadas ao longo do semestre. <br></br>
              </p>
        </div>
      </Container >
    </div >
  )
}

export default Recruitment;
