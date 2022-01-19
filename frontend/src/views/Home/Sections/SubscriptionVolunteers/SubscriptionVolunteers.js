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
          <h3><b>Inscrições abertas para voluntáries! Venha fazer a diferença na educação com a gente!</b></h3>
        </div>
        <div className={styles.subtitle}>
          <h4>O Projeto ALES está com vagas abertas para qualquer pessoa que queira voluntariar-se.</h4>
        </div>
        <div className={styles.description}>
          <p>
            O primeiro semestre letivo de 2022 está iniciando e o ALES já está se preparando para o retorno das aulas. Neste semestre, seguiremos modelo online semelhante ao implementado no semestre passado, com o auxílio de ferramentas como Google Meet e Google Classroom.
        
          </p>
          
          <p>
            Possuímos vagas para as seguintes áreas: 
          </p>
          <div className={styles.table}>
            <table>
            <p style="text-align:center"><b>Administrativo</b></p>
              <tr>
                <td>Comunicação</td>
                <td class = "branco"></td>
                <td>Financeiro</td>
                <td class = "branco"></td>
                <td>Pessoas</td>
                <td class = "branco"></td>
                <td>TECH</td>
              </tr>
 </table>
</div>

  <p><b>Ensino</b></p>
     <div className={styles.table}>
    <table>
              <tr>
                <td>Desenho</td>
                <td class = "branco"></td>
                <td>Inglês</td>
                <td class = "branco"></td>
                <td>Humanidades</td>
                <td class = "branco"></td>
                <td>Matemática</td>
                <td class = "branco"></td>
                <td>Programação</td>
              </tr>
             
            </table>
          </div>

<p>
            Você pode conferir nosso edital no link abaixo:
            </p>

<div className={styles.buttons}>
            <a
              className={styles.button}
              href="https://drive.google.com/file/d/1TAZaFTOWkym_cJJax4Jf2mfcLUrC0WJs/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Edital" kind="secondary" icon="far fa-file-alt" />
            </a>
          </div>          

<p>
            As inscrições vão até <b>28/01</b> e podem ser feitas pelo formulário a seguir:
            </p>

          <div className={styles.buttons}>
            <a
              className={styles.button}
              href="https://docs.google.com/forms/d/e/1FAIpQLSfCtFWbTMnEreqQ61mImHAmSoLH5euHQfrlWWCOtsYELt89Tw/viewform"
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
