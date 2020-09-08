import React, { useState, useEffect } from "react";

import { get } from "services/course.service";
import { list } from "services/professor.service";

import parseDropdownOptions from "helpers/dropdown";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import TextArea from "components/TextArea/TextArea";
import DateInput from "components/DateInput/DateInput";
import Chip from "components/Chip/Chip";
import Dropdown from "components/Dropdown/Dropdown";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./CourseEdit.module.scss";

const CourseEdit = ({ history, match }) => {
  const { id } = match.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beginningDate, setBeginningDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [coordinator, setCoordinator] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          setBeginningDate(new Date(beginningDate));
          setEndDate(new Date(endDate));
          setSelectedProfessors(professors);
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

  const selectCoordinator = async (name) => {
    const coordinator = await selectedProfessors.find((prof) => prof.name === name);
    setCoordinator(coordinator);
  };

  const submitCourse = async (e, data) => {
    e.preventDefault();
    const { coordinator } = data;

    if (!coordinator.name) {
      toast.error("Ops! Umx coordenadorx deve ser selecionadx");
      return;
    }

    setIsSubmitting(true);
    const { beginningDate, endDate } = data;
    data.beginningDate = await beginningDate.toISOString();
    data.endDate = await endDate.toISOString();

    const { professors } = data;
    data.professors = await professors.map((prof) => prof._id);
    data.coordinator = coordinator._id;
  };

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
            <div className={styles.container}>
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
                        Selecione abaixo os professores da matéria e também escolha umx
                        coordenadorx. Pra selecionar umx coordenadorx, basta clicar/tocar sobre x
                        professorx que elx ficará assim:
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
                  </div>
                  <div className={styles.buttons}>
                    <Button
                      text="Voltar"
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
            </div>
          </Container>
        </>
      )}
    </Page>
  );
};

export default CourseEdit;
