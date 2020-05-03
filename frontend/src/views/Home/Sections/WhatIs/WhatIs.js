import React from "react";

import Container from "components/Container/Container";

import styles from "./WhatIs.module.scss";

const WhatIs = () => {
  return (
    <Container>
      <div className={styles.whatisContainer}>
        <div className={styles.whatisTitle}>
          <h2>O que é o ALES?</h2>
        </div>
        <div className={styles.whatisDescription}>
          <p>
            Acreditamos que a curiosidade e a vontade de aprender são essenciais na vida dos jovens,
            mas muitas vezes estes são suprimidos pela falta de acesso às informações corretas ou
            são desestimulados pelo sistema de ensino arcaico que ainda mantemos em nosso país.
          </p>
          <p>
            Reconhecemos que a culpa disso não é das escolas. Muitas vezes faltam, em especial nas
            públicas, as ferramentas e oportunidades para abordar temas extra-curriculares, por mais
            importantes que eles sejam.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default WhatIs;
