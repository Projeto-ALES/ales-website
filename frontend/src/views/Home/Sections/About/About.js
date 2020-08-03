import React from "react";

import Container from "components/Container/Container";
import numbers from "./numbers";

import Unicamp from "assets/img/unicamp-logo.png";
import Proec from "assets/img/proec-logo.png";

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
          <div className={styles.partnersContainer}>
            <img src={Unicamp} alt="Unicamp Logo" />
            <img src={Proec} alt="Proec Logo" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
