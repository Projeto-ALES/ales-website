import React, { useState, useEffect } from "react";

import { get as getLesson, update } from "services/lesson.service";
import { get as getCourse } from "services/course.service";

import parseDropdownOptions from "helpers/dropdown";

import { toast } from "react-toastify";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Loader from "components/Loader/Loader";
import Input from "components/Input/Input";
import TextArea from "components/TextArea/TextArea";
import DateInput from "components/DateInput/DateInput";
import Dropdown from "components/Dropdown/Dropdown";
import Chip from "components/Chip/Chip";
import Button from "components/Button/Button";

import styles from "./LessonEdit.module.scss";

const LessonEdit = ({ history, match }) => {

  const course_id = match.params.id
  const { lesson_id } = match.params

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [allocatedProfessors, setAllocatedProfessors] = useState([]);
  const [professors, setProfessors] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLesson(lesson_id)
      .then((response) => {
        const { lesson } = response.data;
        setTitle(lesson.title)
        setDescription(lesson.description)
        setDate(lesson.date ? new Date(lesson.date) : null)
        setAllocatedProfessors(lesson.professors)
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro para carregar os dados da aula");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCourse(course_id)
      .then((response) => {
        const { course } = response.data;
        setProfessors(course.professors);
      })
      .catch((err) => {
        if (err.response && err.response.status !== 401) {
          toast.error("Ops! Aconteceu algum erro para retornar os dados");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addProfessor = (id, professors, allocatedProfessors) => {
    const professor = professors.find((prof) => prof._id === id);

    if (!allocatedProfessors.find((prof) => prof._id === id))
      setAllocatedProfessors((state) => [...state, professor]);
    return;
  };

  const removeProfessor = (name) => {
    const updatedProfessors = allocatedProfessors.filter((prof) => prof.name !== name);
    setAllocatedProfessors(updatedProfessors);
  };

  const submitLesson = async (e, data, course_id, lesson_id) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { date } = data;
    if (date) {
      data.date = await date.toISOString();
    }

    /* change names for id's */
    const { professors } = data;
    if (professors.length > 0) {
      data.professors = await professors.map((prof) => prof._id);
    }

    update(lesson_id, data)
      .then(() => {
        history.goBack();
        toast.success("Aula atualizada!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro na hora de atualizar essa aula");
        setIsSubmitting(false);
      })
  }

  return (
    <Page>
      <PageTitle title="Editar Aula" icon="fas fa-edit" />
      <Container>
        <div className={styles.container}>
          {isLoading ? <div className="loader">
            <Loader />
          </div> : (
              <form className={styles.form} onSubmit={(e) => submitLesson(e, { title, description, date, professors: allocatedProfessors, course: course_id }, course_id, lesson_id)}>
                <div className={styles.section}>
                  <Input
                    placeholder="Título"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
                <div className={styles.section}>
                  <TextArea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className={styles.section}>
                  <DateInput
                    placeholder="Data"
                    selected={date}
                    onChange={(date) => setDate(date)}
                  />
                </div>
                <div className={styles.section}>
                  <div className={styles.dropdown}>
                    <Dropdown
                      name="coordinator"
                      options={parseDropdownOptions("_id", "name", professors)}
                      onSelect={(prof) => addProfessor(prof, professors, allocatedProfessors)}
                      label="Professores"
                    />
                  </div>
                  <div className={styles.allocatedProfessors}>
                    {allocatedProfessors.map(prof => {
                      return (
                        <Chip
                          text={prof.name}
                          key={prof._id}
                          removable
                          onRemove={removeProfessor}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className={styles.buttons}>
                  <Button
                    text="Voltar"
                    type="button"
                    onClick={() => {
                      history.goBack();
                    }}
                  />
                  <Button
                    kind="success"
                    text="Enviar"
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            )}
        </div>
      </Container>
    </Page>
  )
}

export default LessonEdit;