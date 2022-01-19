import React from "react";
import Container from "components/Container/Container";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";
import Alessauro from "assets/logos/alessauro.svg";
import styles from "./SubscriptionVolunteers.module.scss";

const SubscriptionVolunteers = () => {
  return (
    <div className={styles.container} id="recrutamento">
      <Container>
        <div className={styles.title}>
          <img src={Alessauro} alt="alessauro" />
          <h3><b>Inscrições abertas para voluntáries! Venha fazer a diferença na educação com a gente!</b></h3>
        </div>
        <div className={styles.subtitle}>
          <h4>O Projeto ALES está com vagas abertas para qualquer pessoa que queira voluntariar-se. Somos majoritariamente</h4>
        </div>
        <div className={styles.description}>
          <p>
            O primeiro semestre letivo de 2022 está iniciando e o ALES já está se preparando para o retorno das aulas aos sábados. Neste semestre, seguiremos modelo online semelhante ao implementado no semestre passado, com o auxílio de ferramentas como Google Meet e Google Classroom. As aulas serão aos sábados, com as atividades iniciando às 9h30 e terminando às 17h30.
        
          </p>
          <p>
            Temos vagas para as seguinte matérias neste semestre: <b>Inglês</b>, <b>Humanidades</b>, <b>Programação</b>, <b>Ciências</b>, <b>Matemática</b> e <b>Desenho</b>. </p>

          <p>
            O nosso cronograma de aulas de sábado seguirá a seguinte agenda semanal:
          </p>
          <div className={styles.table}>
            <table>
              <tr>
                <td>Comunicação</td>
                <td>Financeiro</td>
                <td>Pessoas</td>
                <td>TECH</td>
              </tr>

              <tr>
                <td>Desenho</td>
                <td>Inglês</td>
                <td>Humanidades</td>
                <td>Matemática</td>
                <td>Programação</td>
              </tr>
             
            </table>
          </div>

          <p>Você pode escolher quantas matérias quiser (pode fazer uma só ou todas!!!)</p>
          <p>
            As inscrições vão de <b>02/08</b> até <b>13/08</b> e podem ser feitas pelo formulário a seguir:
            </p>

          <div className={styles.buttons}>
            <a
              className={styles.button}
              href="https://docs.google.com/forms/u/2/d/e/1FAIpQLSeQrmxQmucx6GUc8gvzQD8MNw1dsuidWDVXMs8gTZNpYtwQjA/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Inscrição" kind="secondary" icon="far fa-file-alt" />
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
export default SubscriptionVolunteers;
