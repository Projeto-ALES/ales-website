import React from "react";

import Container from "components/Container/Container";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";
import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";

import Logo from "assets/logos/logo.svg";
import styles from "./Info.module.scss";

const Info = () => {
  return (
    <Container>
      <div className={styles.infoContainer}>
        <div className={styles.infoTitle}>
          <h2>Inscrições abertas para voluntários! Processo seletivo S2/2021</h2>
        </div>
        <div className={styles.infoDescription}>
          <p>
            Estamos com as inscrições abertas para voluntários visando o segundo semestre de 2021. Venha fazer parte da nossa história e ajudar esse
            projeto incrível a crescer ainda mais. <b>As inscrições vão do dia 12/07 até o dia 23/07</b>. Para saber mais sobre como os voluntários se dividem dentro do projeto e sobre as vagas, veja o edital, clicando no botão abaixo. 
            </p>

          <div className={styles.buttons}>
                <a
                    className={styles.button}
                    href="https://drive.google.com/file/d/1_5v8ca7wYS7ie82xT54u5YrQisPW1Ibk/view"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ButtonIcon text="Edital" kind="primary" icon="far fa-file-alt" />
                </a>
        </div>

          <p>
            Inscreva-se clicando no botão abaixo e siga as instruções do formulário.
          </p>

          <div className={styles.buttons}>
                <a
                    className={styles.button}
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfSjmbl80mGj9og9XXeKxVS7U_FyhD9gIHKBM6l8H2SMP0d9g/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ButtonIcon text="Inscreva-se" kind="secondary" icon="far fa-file-alt" />
                </a>
        </div>

        <p>Para mais informações sobre o processo seletivo, entre em contato com a
equipe através do e-mail: <i>projetoales.pessoas@gmail.com</i></p>
      
        </div>
      </div>
    </Container>
  );
};

export default Info;