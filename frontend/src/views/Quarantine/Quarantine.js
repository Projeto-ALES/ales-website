import React from "react";

import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Tag from "components/Tag/Tag";

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
        <div className={styles.sectionsContainer}>
          <div className={styles.sectionContainer}>
            <span className={styles.sectionTitle}>Matemática</span>
            <div className={styles.cardsContainer}>
              <div className={styles.cardContainer}>
                <Card>
                  <div className={styles.cardContentContainer}>
                    <h4>Relação vs Função</h4>
                    <div style={{ display: "flex" }}>
                      <Tag text="Matemática" kind="danger" />
                      <Tag text="Vídeo" kind="alert" />
                    </div>
                    <p style={{ textAlign: "center" }}>
                      Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser
                      vista como uma função...não entendeu nada? Clica ou toca nesse card pra
                      descobrir
                    </p>
                  </div>
                </Card>
              </div>
              <div className={styles.cardContainer}>
                <Card>
                  <div className={styles.cardContentContainer}>
                    <h4>Relação vs Função</h4>
                    <div style={{ display: "flex" }}>
                      <Tag text="Matemática" kind="danger" />
                      <Tag text="Vídeo" kind="alert" />
                    </div>
                    <p style={{ textAlign: "center" }}>
                      Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser
                      vista como uma função...não entendeu nada? Clica ou toca nesse card pra
                      descobrir
                    </p>
                  </div>
                </Card>
              </div>
              <div className={styles.cardContainer}>
                <Card>
                  <div className={styles.cardContentContainer}>
                    <h4>Relação vs Função</h4>
                    <div style={{ display: "flex" }}>
                      <Tag text="Matemática" kind="danger" />
                      <Tag text="Vídeo" kind="alert" />
                    </div>
                    <p style={{ textAlign: "center" }}>
                      Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser
                      vista como uma função...não entendeu nada? Clica ou toca nesse card pra
                      descobrir
                    </p>
                  </div>
                </Card>
              </div>
              <div className={styles.cardContainer}>
                <Card>
                  <div className={styles.cardContentContainer}>
                    <h4>Relação vs Função</h4>
                    <div style={{ display: "flex" }}>
                      <Tag text="Matemática" kind="danger" />
                      <Tag text="Vídeo" kind="alert" />
                    </div>
                    <p style={{ textAlign: "center" }}>
                      Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser
                      vista como uma função...não entendeu nada? Clica ou toca nesse card pra
                      descobrir
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className={styles.sectionContainer}>
            <span className={styles.sectionTitle}>Covid-19</span>
            <div className={styles.cardsContainer}>
              <div className={styles.cardContainer}>
                <Card kind="outline">
                  <div className={styles.cardContentContainer}>
                    <h4>Como se prevenir</h4>
                    <div style={{ display: "flex" }}>
                      <Tag text="Covid-19" kind="success" />
                      <Tag text="Artigo" kind="primary" />
                    </div>
                    <p style={{ textAlign: "center" }}>
                      Dicas de um especialista para se prevenir contra o coronavírus
                    </p>
                  </div>
                </Card>
              </div>
              <div className={styles.cardContainer}>
                <Card kind="outline">
                  <div className={styles.cardContentContainer}>
                    <h4>Como se prevenir</h4>
                    <div style={{ display: "flex" }}>
                      <Tag text="Covid-19" kind="success" />
                      <Tag text="Artigo" kind="primary" />
                    </div>
                    <p style={{ textAlign: "center" }}>
                      Dicas de um especialista para se prevenir contra o coronavírus
                    </p>
                  </div>
                </Card>
              </div>
              <div className={styles.cardContainer}>
                <Card kind="outline">
                  <div className={styles.cardContentContainer}>
                    <h4>Como se prevenir</h4>
                    <div style={{ display: "flex" }}>
                      <Tag text="Covid-19" kind="success" />
                      <Tag text="Artigo" kind="primary" />
                    </div>
                    <p style={{ textAlign: "center" }}>
                      Dicas de um especialista para se prevenir contra o coronavírus
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Quarantine;
