import React from "react";

import Container from "components/Container/Container";

import styles from "./MyArea.module.scss";

const MyArea = () => {
  return (
    <div className={styles.myAreaContainer}>
      <Container>
        <div className={styles.myAreaTitle}>
          <h2>Minha Área</h2>
        </div>
      </Container>
    </div>
  );
};

export default MyArea;
