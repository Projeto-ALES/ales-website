import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import routes from "routes/routes";

import { list } from "services/course.service";

import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./CourseList.module.scss";

const CourseList = ({ history }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCourses = () => {
      setIsLoading(true);
      list()
        .then((response) => {
          const { subjects } = response.data;
          setCourses(subjects);
        })
        .catch((err) => {
          if (err.response && err.response.status !== 401) {
            toast.error("Ops! Aconteceu algum erro para listar as matérias");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getCourses();
  }, []);

  return (
    <div className={styles.courseListContainer}>
      <Container>
        <div className={styles.courseListTitle}>
          <h2>Matérias</h2>
        </div>
        <div className={styles.cardsContainer}>
          {isLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            courses.map((course) => {
              return (
                <Link to={`/courses/${course._id}`} className={styles.cardContainer}>
                  <Card id={course._id} kind="outline-yellow">
                    <div className={styles.cardContentContainer}>
                      <span>{course.name}</span>
                    </div>
                  </Card>
                </Link>
              );
            })
          )}
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
