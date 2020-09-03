import React, { useState, useEffect } from "react";

import { list } from "services/professor.service";

import parseDropdownOptions from "helpers/dropdown";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import DateInput from "components/DateInput/DateInput";
import TextArea from "components/TextArea/TextArea";
import Dropdown from "components/Dropdown/Dropdown";
import Chip from "components/Chip/Chip";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./CourseNew.module.scss";

const CourseNew = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beginningDate, setBeginningDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [professors, setProfessors] = useState([]);
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [coordinators, setCoordinators] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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

    if (coordinators.find((coord) => coord.name === name)) {
      setCoordinators(coordinators.filter((coord) => coord.name !== name));
    }
  };

  const toggleCoordinator = (name) => {
    const coordinator = selectedProfessors.find((prof) => prof.name === name);

    if (!coordinators.find((coord) => coord.name === name)) {
      setCoordinators((state) => [...state, coordinator]);
    } else {
      setCoordinators(coordinators.filter((coord) => coord.name !== name));
    }
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
            <form className={styles.form}>
              <div className={styles.form__section}>
                <Input
                  placeholder="Nome"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className={styles.form__section}>
                <TextArea
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              <div className={styles.form__section}>
                <DateInput
                  onChange={(e) => setBeginningDate(e.target.value)}
                  value={beginningDate}
                  required
                />
              </div>
              <div className={styles.form__section}>
                <DateInput onChange={(e) => setEndDate(e.target.value)} value={endDate} required />
              </div>
              <div className={styles.form__section}>
                <div className={styles.professorsDescription}>
                  <p>
                    Selecione abaixo os professores da matéria e escolha pelo menos umx
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
                        onSelect={toggleCoordinator}
                        selected={!!coordinators.find((coord) => coord.name === prof.name)}
                      />
                    );
                  })}
                </div>
                <div className={styles.coordinatorsLabel}>
                  <p>{coordinators.length} coordenador(xs) selecionadx(s)</p>
                </div>
              </div>
              <div className={styles.buttons}>
                <Button
                  text="Voltar"
                  onClick={() => {
                    history.goBack();
                  }}
                />
                <Button kind="success" text="Enviar" onClick={() => {}} />
              </div>
            </form>
          )}
        </div>
      </Container>
    </Page>
  );
};

export default CourseNew;
