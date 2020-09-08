import React, { useState, useEffect } from "react";

import { get } from "services/course.service";

import { formatDateToReceive } from "helpers/masks";

import routes from "routes/routes";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Chip from "components/Chip/Chip";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./CourseDetail.module.scss";

const CourseDetail = ({ history, match }) => {
  const { id } = match.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beginningDate, setBeginningDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [coordinator, setCoordinator] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCourse = (id) => {
      setIsLoading(true);
      get(id)
        .then((response) => {
          const {
            name,
            description,
            beginningDate,
            endDate,
            professors,
            coordinator,
          } = response.data.subject;
          setName(name);
          setDescription(description);
          setBeginningDate(formatDateToReceive(beginningDate));
          setEndDate(formatDateToReceive(endDate));
          setProfessors(professors);
          setCoordinator(coordinator);
        })
        .catch((err) => {
          if (err.response && err.response.status !== 401) {
            toast.error("Ops! Aconteceu algum erro para retornar os dados");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getCourse(id);
  }, []);

  return (
    <Page>
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <PageTitle title={name} />
          <Container>
            <div className={styles.description}>
              <p>{description}</p>
            </div>
            <div className={styles.data}>
              <div className={styles.data__period}>
                <div>
                  <h4>Data de Início</h4>
                  <span>{beginningDate}</span>
                </div>
                <div>
                  <h4>Data de Término</h4>
                  <span>{endDate}</span>
                </div>
              </div>
              <div className={styles.professors}>
                <h4>Professores</h4>
                <div className={styles.professors__chips}>
                  {professors.map((prof) => {
                    return (
                      <Chip
                        key={prof._id}
                        text={prof.name}
                        selected={prof._id === coordinator._id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <Button text="Voltar" onClick={() => history.goBack()} />
              <div className={styles.actions}>
                <Button
                  text="Editar"
                  kind="primary"
                  onClick={() => history.push(routes.COURSE_EDIT.replace(":id", id))}
                />
                <Button text="Remover" kind="danger" />
              </div>
            </div>
          </Container>
        </>
      )}
    </Page>
  );
};

export default CourseDetail;
