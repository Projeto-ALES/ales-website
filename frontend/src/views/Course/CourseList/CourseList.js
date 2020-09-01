import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import routes from "routes/routes";

import { list } from "services/course.service";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
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
    <Page>
      <PageTitle title="Matérias" icon="fa fa-flask" />
      <Container>
        <div className={styles.cards}>
          {isLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            courses.map((course) => {
              return (
                <Link to={`/courses/${course._id}`} className={styles.card} key={course._id}>
                  <Card id={course._id} kind="outline-yellow">
                    <div className={styles.card__content}>
                      <span>{course.name}</span>
                    </div>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
        <div className={styles.buttons}>
          <Button text="Voltar" onClick={() => history.goBack()} />
          <Button kind="success" text="Adicionar" onClick={() => history.push(routes.COURSE_NEW)} />
        </div>
      </Container>
    </Page>
  );
};

export default CourseList;
