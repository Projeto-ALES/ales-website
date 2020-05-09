import React from "react";

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
          <h2>Que atividades oferecemos?</h2>
        </div>
        <div className={styles.whatdoDescription}>
          <div className={styles.activitiesContainer}>
            <p>Oferecemos um vasto leque de aulas:</p>
            <div className={styles.cardContainer}>
              {courses.map((course) => {
                return (
                  <Card kind="yellow" id={course.id}>
                    <span>
                      <i class={course.icon}></i>
                    </span>
                    <span>{course.text}</span>
                  </Card>
                );
              })}
            </div>
            <a href="#">e muito mais!</a>
          </div>
          <div className={styles.activitiesContainer}>
            <p>E outras atividades:</p>
            <div className={styles.cardContainer}>
              {activities.map((activity) => {
                return (
                  <Card kind="blue-dark" id={activity.id}>
                    <span>
                      <i class={activity.icon}></i>
                    </span>
                    <span>{activity.text}</span>
                  </Card>
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
