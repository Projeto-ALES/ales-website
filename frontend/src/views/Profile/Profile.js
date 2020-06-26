import React from "react";

import Container from "components/Container/Container";

import styles from "./Profile.module.scss";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <Container>
        <div className={styles.profileTitle}>
          <h2>Meu Perfil</h2>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
