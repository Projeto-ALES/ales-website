import React from "react";
import { Link } from "react-router-dom";

import routes from "routes/routes";

import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Button from "components/Button/Button";

import styles from "./CourseList.module.scss";

const CourseList = ({ history }) => {
  const courses = [
    { id: 1, name: "Programação" },
    { id: 2, name: "Inglês" },
    { id: 3, name: "Ciências" },
    { id: 4, name: "Humanidades" },
    { id: 5, name: "Matemática" },
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
              <Link to={`/courses/${course.id}`} className={styles.cardContainer}>
                <Card id={course.id} kind="outline-yellow">
                  <div className={styles.cardContentContainer}>
                    <span>{course.name}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        <div className={styles.buttonsContainer}>
          <Button text="Voltar" onClick={() => history.goBack()} />
          <Button kind="success" text="Adicionar" onClick={() => history.push(routes.COURSE_NEW)} />
        </div>
      </Container>
    </div>
  );
};

export default CourseList;
