import React, { useState, useEffect } from "react";

import { get, remove } from "services/course.service";

import { formatDateToReceive } from "helpers/masks";

import routes from "routes/routes";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Chip from "components/Chip/Chip";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import Accordion from "components/Accordion/Accordion";
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
  const [lessons, setLessons] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          } = response.data.course;
          const { lessons } = response.data;
          setName(name);
          setDescription(description);
          setBeginningDate(formatDateToReceive(beginningDate));
          setEndDate(formatDateToReceive(endDate));
          setProfessors(professors);
          setCoordinator(coordinator);
          // setLessons(lessons);
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

  const deleteCourse = (id) => {
    setIsDeleting(true);

    remove(id)
      .then(() => {
        history.push(routes.COURSES);
        toast.success("Matéria removida!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro para deletar a matéria");
        setIsDeleting(false);
      });
  };

  return (
    <Page>
      {modalIsOpen && (
        <div className={styles.modal}>
          <Modal
            title="Tem certeza que deseja deletar a matéria?"
            onClose={() => setModalIsOpen(false)}
          >
            <div className={styles.modal__buttons}>
              <Button text="Cancelar" onClick={() => setModalIsOpen(false)} />
              <Button
                text="Deletar"
                kind="danger"
                width={120}
                onClick={() => deleteCourse(id)}
                isLoading={isDeleting}
                disabled={isDeleting}
              />
            </div>
          </Modal>
        </div>
      )}
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
                <div className={styles.data__top}>
                  <div className={styles.period}>
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
                <div className={styles.data__bottom}>
                  <div className={styles.lessons}>
                    <h4>Aulas</h4>
                    {lessons && lessons.length > 0 ? lessons.map(lesson => {
                      return (
                        <Accordion text={lesson.title}>
                          <div className={styles.lesson}>
                            <div className={styles.lesson__description}>
                              <p>{lesson.description}</p>
                            </div>
                            <div className={styles.lesson__date}>
                              <div className={styles.date}>
                                <span>
                                  <i class="far fa-calendar-alt"></i>
                                </span>
                                <span>{formatDateToReceive(lesson.date)}</span>
                              </div>
                            </div>
                            <div className={styles.lesson__allocated}>
                              <div className={styles.chips}>
                                {lesson.professors && lesson.professors.map(prof => {
                                  return (
                                    <Chip
                                      text={prof.name}
                                      selected={true}
                                    />
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </Accordion>
                      )
                    }) : <span>Nenhuma aula cadastrada</span>}
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
                  <Button text="Deletar" kind="danger" onClick={() => setModalIsOpen(true)} />
                </div>
              </div>
            </Container>
          </>
        )}
    </Page>
  );
};

export default CourseDetail;
