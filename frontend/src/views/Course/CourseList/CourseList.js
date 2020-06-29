import React from "react";

import Container from "components/Container/Container";
import Card from "components/Card/Card";

import styles from "./CourseList.module.scss";

const CourseList = () => {
  const courses = [
    { id: 1, name: "Programação", route: "/programacao" },
    { id: 2, name: "Inglês", route: "/ingles" },
    { id: 3, name: "Ciências", route: "/ciencias" },
    { id: 4, name: "Humanidades", route: "/humanidades" },
    { id: 5, name: "Matemática", route: "/matematica" },
  ];

  return (
    <div className={styles.courseListContainer}>
      <Container>
        <div className={styles.courseListTitle}>
          <h2>Matérias</h2>
        </div>
        <div className={styles.cardsContainer}>
          {courses.map((course) => {
            return (
              <a href={course.route} className={styles.cardContainer}>
                <Card id={course.id} kind="outline-yellow">
                  <div className={styles.cardContentContainer}>
                    <span>{course.name}</span>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default CourseList;
