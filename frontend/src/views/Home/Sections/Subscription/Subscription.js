import React from "react";

import Container from "components/Container/Container";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";

import Alessauro from "assets/logos/alessauro.svg";
import Confetti from "assets/icons/confetti.png";
import styles from "./Subscription.module.scss";

import courses from "./courses";

const Adaption = () => {
  return (
    <div className={styles.adaptionContainer} id="inscricao2020">
      <Container>
        <div className={styles.adaptionTitle}>
          <img src={Alessauro} alt="alessauro" />
          <h2>Inscrições pro 2º Semestre</h2>
        </div>
        <div className={styles.adaptionSubtitle}>
          <h3>É isso mesmo! Vamos ter atividades no 2º Semestre</h3>
          <img src={Confetti} alt="confetti" />
        </div>
        <div className={styles.adaptionDescription}>
          <p>
            <b>*Importante!* As inscrições vão de 18 a 25 de agosto</b>. Pra acessar o formulário de
            inscrição, basta clicar no botão abaixo que você será redirecionado \o/ E pra se manter
            informado sobre as nossas atividades e atualizações, entre no nosso grupo de informações
            no WhatsApp, onde também iremos postar outros avisos importantes. É o melhor jeito de se
            manter informado!
          </p>
          <div className={styles.buttonsContainer}>
            <a
              href="https://bit.ly/inscricao-ales-2020-2s"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Formulário de Inscrição" kind="purple" icon="far fa-file-alt" />
            </a>
            <a
              href="https://chat.whatsapp.com/GxdAuQ1hzop70cJ9xQSgGQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Entrar no grupo" kind="success" icon="fa fa-whatsapp" />
            </a>
          </div>
        </div>
        <div className={styles.classesDescription}>
          <span>Lembrando que nossas aulas/atividades:</span>
          <ul className={styles.advantagesList}>
            <li>são 100% gratuitas (do início ao fim)</li>
            <li>serão online neste semestre</li>
            <li>ocorrem aos sábados</li>
            <li>não há limite de matérias pra participar (bora fazer todas \o/)</li>
          </ul>
        </div>
        <div className={styles.courses}>
          <table className={styles.table}>
            <tr>
              <th>Horário</th>
              <th>Matéria</th>
            </tr>
            {courses.map((course) => {
              return (
                <tr key={course.id}>
                  <td>{course.time}</td>
                  <td>{course.name}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </Container>
    </div>
  );
};

export default Adaption;
