import React from "react";

import Container from "components/Container/Container";

import styles from "./Quarantine.module.scss";

const Quarantine = () => {
  return (
    <div className={styles.quarantineContainer}>
      <Container>
        <div className={styles.quarantineTitle}>
          <h2>QuarentenALES</h2>
        </div>
        <div className={styles.quarantineDescription}>
          <p>
            Aqui temos um compilado de links e recursos que podem ser acessados de forma online e
            quem sabe diminuímos um pouco o tédio nesse período de quarentena :)
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Quarantine;
