import React, { useState, useEffect } from "react";

import { list } from "services/professor.service";
import { create } from "services/lesson.service";

import parseDropdownOptions from "helpers/dropdown";

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

import { toast } from "react-toastify";

import styles from "./LessonNew.module.scss";

const LessonNew = ({ history, match }) => {

  const course_id = match.params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [selectedProfessors, setSelectedProfessors] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getProfessors = () => {
      setIsLoading(true);
      list()
        .then((response) => {
          const { professors } = response.data;
          setProfessors(professors);
        })
        .catch((err) => {
          if (err.response && err.response.status !== 401) {
            toast.error("Ops! Aconteceu algum erro para listar os professores");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getProfessors();
  }, []);

  const addProfessor = (id, professors, selectedProfessors) => {
    const professor = professors.find((prof) => prof._id === id);

    if (!selectedProfessors.find((prof) => prof._id === id))
      setSelectedProfessors((state) => [...state, professor]);
    return;
  };

  const removeProfessor = (name) => {
    const updatedProfessors = selectedProfessors.filter((prof) => prof.name !== name);
    setSelectedProfessors(updatedProfessors);
  };

  const submitLesson = async (e, data, course_id) => {
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

    create(course_id, data)
      .then(() => {
        history.goBack();
        toast.success("Aula adicionada!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro na hora de adicionar essa aula");
        setIsSubmitting(false);
      });
  }

  return (
    <Page>
      <PageTitle title="Adicionar Aula" icon="fas fa-plus" />
      <Container>
        <div className={styles.container}>
          {isLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
              <form className={styles.form} onSubmit={(e) => submitLesson(e, { title, description, date, professors: selectedProfessors, course: course_id }, course_id)}>
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
                  <p>
                    Selecione abaixo os professores alocados pra aula (se não tiver ainda, pode deixar sem nenhum)
                    </p>
                  <div className={styles.dropdown}>
                    <Dropdown
                      name="coordinator"
                      options={parseDropdownOptions("_id", "name", professors)}
                      onSelect={(prof) => addProfessor(prof, professors, selectedProfessors)}
                      label="Professores"
                    />
                  </div>
                  <div className={styles.selectedProfessors}>
                    {selectedProfessors.map((prof) => {
                      return (
                        <Chip
                          text={prof.name}
                          key={prof._id}
                          removable
                          onRemove={removeProfessor}
                        />
                      );
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

export default LessonNew;