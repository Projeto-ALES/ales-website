import React from "react";

import routes from "routes/routes";
import history from "routes/history";
import Logo from "assets/logos/logo.svg";

import Container from "components/Container/Container";
import Button from "components/Button/Button";

import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Container>
        <div className={styles.landingContainer}>
          <img src={Logo} alt="ales-logo" width="200px" border-style="solid" border-color="#f9a620" border-width="4px" />
          <h1>Projeto Além da Escola</h1>
          <h3>Aulas extracurriculares aos finais de semana e de graça! \o/</h3>
       
          <div className={styles.buttonsContainer}>
            {/* <Button
              text="Contato"
              kind="secondary"
              width="160px"
              onClick={() => history.push(routes.CONTACT)}
            /> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
