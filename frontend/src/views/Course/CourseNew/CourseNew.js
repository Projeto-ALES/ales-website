import React, { useState, useEffect } from "react";

import routes from "routes/routes";
import { list } from "services/professor.service";
import { create } from "services/course.service";

import parseDropdownOptions from "helpers/dropdown";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import TextArea from "components/TextArea/TextArea";
import Dropdown from "components/Dropdown/Dropdown";
import Chip from "components/Chip/Chip";
import Loader from "components/Loader/Loader";
import DateInput from "components/DateInput/DateInput";

import { toast } from "react-toastify";

import styles from "./CourseNew.module.scss";

const CourseNew = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beginningDate, setBeginningDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [coordinator, setCoordinator] = useState([]);

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

    if (coordinator.name === name) {
      setCoordinator({});
    }
  };

  const selectCoordinator = (name) => {
    setCoordinator(selectedProfessors.find((prof) => prof.name === name));
  };

  const submitCourse = async (e, data) => {
    e.preventDefault();

    const { beginningDate, endDate } = data;
    if (endDate < beginningDate) {
      toast.error("Ops! A data de término tem que ser após a de início");
      return;
    }

    const { coordinator } = data;
    if (!coordinator.name) {
      toast.error("Ops! Selecione umx coordadorx");
      return;
    }

    setIsSubmitting(true);
    data.beginningDate = await beginningDate.toISOString();
    data.endDate = await endDate.toISOString();

    const { professors } = data;
    data.professors = await professors.map((prof) => prof._id);
    data.coordinator = coordinator._id;

    create(data)
      .then(() => {
        history.push(routes.COURSES);
        toast.success("Matéria adicionada!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro na hora de adicionar essa matéria");
        setIsSubmitting(false);
      });
  };

  return (
    <Page>
      <PageTitle title="Adicionar Matéria" icon="fas fa-plus" />
      <Container>
        <div className={styles.container}>
          {isLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={(e) =>
                submitCourse(e, {
                  name,
                  description,
                  beginningDate,
                  endDate,
                  professors: selectedProfessors,
                  coordinator,
                })
              }
            >
              <div className={styles.left}>
                <div className={styles.section}>
                  <Input
                    placeholder="Nome"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    placeholder="Data de Início"
                    selected={beginningDate}
                    onChange={(date) => setBeginningDate(date)}
                    required
                  />
                </div>
                <div className={styles.section}>
                  <DateInput
                    placeholder="Data de Término"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    required
                  />
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.section}>
                  <div className={styles.professorsDescription}>
                    <p>
                      Selecione abaixo os professores da matéria e escolha umx coordenadorx. Pra
                      selecionar umx coordenadorx, basta clicar/tocar sobre x professorx que elx
                      ficará assim:
                    </p>
                    <div className={styles.chip}>
                      <Chip text="Alessauro" selected />
                    </div>
                  </div>
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
                          selectable
                          onSelect={selectCoordinator}
                          selected={prof._id === coordinator._id}
                        />
                      );
                    })}
                  </div>
                  <div className={styles.coordinatorLabel}>
                    <p>
                      {coordinator.name
                        ? "Coordenadorx selecionado!"
                        : "Selecione umx coordenadorx"}
                    </p>
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
              </div>
            </form>
          )}
        </div>
      </Container>
    </Page>
  );
};

export default CourseNew;
