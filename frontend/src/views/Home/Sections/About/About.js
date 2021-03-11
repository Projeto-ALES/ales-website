import React from "react";

import Container from "components/Container/Container";
import numbers from "./numbers";

import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <Container>
        <div className={styles.aboutTitle}>
          <h2>Sobre Nós</h2>
        </div>
        <div>
          <div className={styles.numbersContainer}>
            {numbers.map((item, index) => {
              return <span key={index}>{item.text}</span>;
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
