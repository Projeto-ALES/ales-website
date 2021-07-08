import React from "react";
import { Link } from "react-router-dom";

import Container from "components/Container/Container";
import Card from "components/Card/Card";

import courses from "./courses";
import activities from "./activities";

import styles from "./WhatDo.module.scss";

const WhatDo = () => {
  return (
    <Container>
      <div className={styles.whatdoContainer}>
        <div className={styles.whatdoTitle}>
          <h2>Que disciplinas oferecemos?</h2>
        </div>
        <div className={styles.whatdoDescription}>
          <div className={styles.activitiesContainer}>
            <div className={styles.cardsContainer}>
              {courses.map((course, index) => {
                return (
                  <div className={styles.cardContainer} key={index}>
                    <Card kind="yellow" id={course.id} width="200px">
                      <div className={styles.cardContentContainer}>
                        <span>
                          <i class={course.icon}></i>
                        </span>
                        <span>{course.text}</span>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.activitiesContainer}>
            
            <div className={styles.cardsContainer}>
              {activities.map((activity, index) => {
                return (
                  <div className={styles.cardContainer} key={index}>
                    <Card kind="blue-dark" id={activity.id} width="200px">
                      <div className={styles.cardContentContainer}>
                        <span>
                          <i class={activity.icon}></i>
                        </span>
                        <span>{activity.text}</span>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhatDo;
