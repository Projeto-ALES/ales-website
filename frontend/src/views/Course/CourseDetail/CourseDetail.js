import React, { useState, useEffect } from "react";

import { get, remove as removeCourse } from "services/course.service";
import { remove as removeLesson } from "services/lesson.service";

import { formatDateToReceive } from "helpers/masks";

import routes from "routes/routes";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Button from "components/Button/Button";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";
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
  const [isDeletingCourse, setisDeletingCourse] = useState(false);
  const [isDeletingLesson, setisDeletingLesson] = useState(false);
  const [deleteCourseModal, setDeleteCourseModal] = useState(false);
  const [deleteLessonModal, setDeleteLessonModal] = useState(false);
  const [lessonToBeDeleted, setLessonToBeDeleted] = useState(null);

  const getCourse = (course_id) => {
    setIsLoading(true);
    get(course_id)
      .then((response) => {
        const {
          name,
          description,
          beginningDate,
          endDate,
          professors,
          coordinator,
          lessons,
        } = response.data.course;
        setName(name);
        setDescription(description);
        setBeginningDate(formatDateToReceive(beginningDate));
        setEndDate(formatDateToReceive(endDate));
        setProfessors(professors);
        setCoordinator(coordinator);
        setLessons(lessons);
      })
      .catch((err) => {
        if (err.response && err.response.status !== 401) {
          toast.error("Ops! Aconteceu algum erro para retornar os dados");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCourse(id);
  }, []);

  const deleteCourse = (course_id) => {
    setisDeletingCourse(true);

    removeCourse(course_id)
      .then(() => {
        history.push(routes.COURSES);
        toast.success("Matéria removida!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro para deletar a matéria");
        setisDeletingCourse(false);
      });
  };

  const deleteLesson = (course_id, lesson) => {
    setisDeletingLesson(true);

    removeLesson(lesson._id)
      .then(() => {
        getCourse(course_id)
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro para deletar a aula");
      })
      .finally(() => {
        setisDeletingLesson(false);
        setDeleteLessonModal(false);
      })
  }

  return (
    <Page>
      {deleteCourseModal && (
        <div className={styles.modal}>
          <Modal
            title="Tem certeza que deseja deletar a matéria?"
            onClose={() => setDeleteCourseModal(false)}
          >
            <div className={styles.modal__buttons}>
              <Button text="Cancelar" onClick={() => setDeleteCourseModal(false)} />
              <Button
                text="Deletar"
                kind="danger"
                width={120}
                onClick={() => deleteCourse(id)}
                isLoading={isDeletingCourse}
                disabled={isDeletingCourse}
              />
            </div>
          </Modal>
        </div>
      )}
      {deleteLessonModal && (
        <div className={styles.modal}>
          <Modal
            title="Tem certeza que deseja deletar a aula?"
            onClose={() => setDeleteLessonModal(false)}
          >
            <div className={styles.modal__buttons}>
              <Button text="Cancelar" onClick={() => setDeleteLessonModal(false)} />
              <Button
                text="Deletar"
                kind="danger"
                width={120}
                onClick={() => deleteLesson(id, lessonToBeDeleted)}
                isLoading={isDeletingLesson}
                disabled={isDeletingLesson}
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
                    <div className={styles.lessons__add}>
                      <ButtonIcon text="Adicionar Aula" kind="success" icon="fas fa-plus" onClick={() => history.push(routes.LESSON_NEW.replace(":id", id))} />
                    </div>
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
                                <span>{lesson.date ? formatDateToReceive(lesson.date) : `Nenhuma data definida`}</span>
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
                            <div className={styles.lesson__actions}>
                              <div className={styles.buttons}>
                                <Button text="Editar" kind="primary" onClick={() => history.push(routes.LESSON_EDIT.replace(":id", id).replace(":lesson_id", lesson._id))} />
                                <Button text="Deletar" kind="danger" onClick={() => {
                                  setLessonToBeDeleted(lesson);
                                  setDeleteLessonModal(true);
                                  window.scrollTo({ top: 200, behavior: "smooth" })
                                }}
                                />
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
                  <Button text="Deletar" kind="danger" onClick={() => { setDeleteCourseModal(true); window.scrollTo({ top: 200, behavior: "smooth" }) }} />
                </div>
              </div>
            </Container>
          </>
        )}
    </Page>
  );
};

export default CourseDetail;
