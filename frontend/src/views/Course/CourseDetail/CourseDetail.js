import React from "react";

import Container from "components/Container/Container";

import styles from "./CourseDetail.module.scss";

const CourseDetail = () => {
  const course = {
    id: 1,
    name: "Programação",
    description: "Matéria muito legal! Venha aprender a desenvolver jogos e sites com a gente o/",
    start: "01/09/2020",
    end: "30/11/2020",
    coordinator: "Victor Palmerini",
    teachers: [{}],
    classes: [{}],
    resources: [{}],
    students: [{}],
  };

  return (
    <div className={styles.courseDetailContainer}>
      <Container>
        <div className={styles.courseDetailTitle}>
          <h2>{course.name}</h2>
        </div>
        <div className={styles.courseDetailDescription}>
          <p>{course.description}</p>
        </div>
        <div className={styles.courseDetailData}>
          <div className={styles.dataPeriod}>
            <div className={styles.dataSection}>
              <h4>Início</h4>
              <span>{course.start}</span>
            </div>
            <div className={styles.dataSection}>
              <h4>Fim</h4>
              <span>{course.end}</span>
            </div>
          </div>
          <div className={styles.dataCoordinator}>
            <h4>Coordenadorx</h4>
            <span>{course.coordinator}</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetail;
