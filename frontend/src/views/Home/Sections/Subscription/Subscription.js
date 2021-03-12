import React from "react";

import Container from "components/Container/Container";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";

import Alessauro from "assets/logos/alessauro.svg";
import styles from "./Subscription.module.scss";

const Subscription = () => {
  return (
    <div className={styles.container} id="recrutamento">
      <Container>
        <div className={styles.title}>
          <img src={Alessauro} alt="alessauro" />
          <h2>Vagas remanescentes para alunos!</h2>
        </div>
        <div className={styles.subtitle}>
          <h3>O Projeto ALES está com vagas remanescentes abertas para alunos do 8º ano ao 3º ano do ensino médio.</h3>
        </div>
        <div className={styles.description}>
          <p>
          O semestre do ALES já começou com as aulas aos sábados! Neste semestre, estamos seguindo modelo online semelhante ao implementado no semestre passado, com o auxílio de ferramentas como Google Meet e Google Classroom. As aulas são aos sábados, com as atividades iniciando às 9h30 e terminando às 17h30.
          </p>
          <p>
            Temos vagas para as seguinte matérias neste semestre: <b>Inglês</b>, <b>Humanidades</b>, <b>Programação</b>, <b>Ciências</b> e <b>Matemática</b>. </p>
            <p>
            As nossas inscrições vão até dia <b>15/03</b>!
          </p>
          <p>
            O nosso cronograma de aulas de sábado seguirá a seguinte agenda semanal:
          </p>

          <div className={styles.table}>
            <table>
              <tr>
                <td>9h30 - 10h30</td>
                <td></td>
                <td>Inglês</td>
              </tr>
              <tr>
                <td>10h35 - 11h50</td>
                <td></td>
                <td>Humanidades</td>
              </tr>
              <tr>
                <td>11h50 - 13h00</td>
                <td></td>
                <td>Período de almoço</td>
              </tr>
              <tr>
                <td>13h00 - 14h00</td>
                <td></td>
                <td>Programação</td>
              </tr>
              <tr>
                <td>14h05 - 15h20</td>
                <td></td>
                <td>Ciências</td>
              </tr>
              <tr>
                <td>15h25 - 16h25</td>
                <td></td>
                <td>Matemática</td>
              </tr>
              <tr>
                <td>16h30 - 17h30</td>
                <td></td>
                <td>Desenho</td>
              </tr>
            </table>
          </div>

          <p>Você pode escolher quantas matérias quiser (pode fazer uma só ou todas!!!)</p>

          <div className={styles.buttons}>
            <a
              className={styles.button}
              href="https://docs.google.com/forms/d/e/1FAIpQLSe2pK73SUosXhSiSPpfhC5sZYcVFFz1CNr1CSTwfGAjrs4vXA/viewform?usp=pp_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Inscrição" kind="purple" icon="far fa-file-alt" />
            </a>
          </div>
        </div>
        <div className={styles.info}>
          <p>Todo o processo ocorrerá de forma remota, assim como as atividades realizadas ao longo do semestre. <br></br>
          </p>
        </div>
      </Container >
    </div >
  )
}

export default Subscription;
