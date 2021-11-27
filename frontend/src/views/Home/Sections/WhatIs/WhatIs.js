import React from "react";

import Container from "components/Container/Container";

import Logo from "assets/logos/logo.svg";
import styles from "./WhatIs.module.scss";

const WhatIs = () => {
  return (
    <Container>
      <div className={styles.whatisContainer}>
        <div className={styles.whatisTitle}>
          <h2>O que é o ALES?</h2>
          <img src={Logo} alt="ales-logo" />
        </div>
        <div className={styles.whatisDescription}>
          <p>
          A curiosidade e a vontade de aprender são essenciais na vida dos jovens, mas muitas vezes estas são suprimidas pela falta de acesso às informações e sistema de ensino vigente em nosso país. Reconhecemos que a culpa disso não é das escolas e desta percepção nasceu o ALES, um projeto que tem como objetivo trazer conteúdos além da escola, complementando o desenvolvimento escolar e pessoal de estudantes do ensino médio, em especial da rede pública.
Nosso projeto não é um substituto da escola, e sim uma ferramenta para expandir horizontes e inspirar estudantes a irem além na busca por novos conhecimentos.

          </p>
          
        </div>
      </div>
    </Container>
  );
};

export default WhatIs;
