import React from "react";

import Container from "components/Container/Container";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";

import Alessauro from "assets/logos/alessauro.svg";
import Confetti from "assets/icons/confetti.png";
import styles from "./Subscription.module.scss";

const Adaption = () => {
  return (
    <div className={styles.adaptionContainer} id="inscricao2020">
      <Container>
        <div className={styles.adaptionTitle}>
          <img src={Alessauro} />
          <h2>Inscrições pro 2º Semestre</h2>
        </div>
        <div className={styles.adaptionSubtitle}>
          <h3>É isso mesmo! Vamos ter atividades no 2º Semestre</h3>
          <img src={Confetti} />
        </div>
        <div className={styles.adaptionDescription}>
          <p>
            *Importante!* As inscrições vão de 18 a 25 de agosto. O link do formulário será
            divulgado aqui e no nosso grupo de informações no WhatsApp, onde também iremos postar
            outros avisos importantes. É o melhor jeito de se manter informado!
          </p>
          <div className={styles.buttonContainer}>
            <a href="https://chat.whatsapp.com/GxdAuQ1hzop70cJ9xQSgGQ" target="_blank">
              <ButtonIcon text="Entrar no grupo" kind="success" icon="fa fa-whatsapp" />
            </a>
          </div>
          <p>
            Apesar do momento que todos nós estamos passando, queremos que o nosso propósito de
            espalhar conhecimento e curiosidade continue a qualquer custo. Por isso, não estamos
            medindo esforços pra que a gente possa oferecer atividades para nossos alunos nos
            proximos meses.
          </p>
          <p>
            Ficou interessado? Então fica ligado que nossas inscrições começam já, já. Se você está
            ansioso ou pelo menos curioso, abre o link acima e entra no nosso grupo de informações
            do ALES, onde divulgaremos informações sobre as inscrições e sobre nosso projeto como um
            todo. Ah, e prometemos que vamos manter o grupo calmo :)
          </p>
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
      </Container>
    </div>
  );
};

export default Adaption;
