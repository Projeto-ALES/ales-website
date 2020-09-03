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
import { toast } from "react-toastify";

import styles from "./CourseNew.module.scss";

const CourseNew = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beginningDate, setBeginningDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [professors, setProfessors] = useState([]);
  const [coordinator, setCoordinator] = useState("");

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

  return (
    <Page>
      <PageTitle title="Adicionar Matéria" icon="fas fa-plus" />
      <Container>
        <div className={styles.container}>
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
              <div className={styles.dropdown}>
                <Dropdown
                  name="coordinator"
                  options={parseDropdownOptions("_id", "name", professors)}
                  onSelect={setCoordinator}
                  value={coordinator}
                  label="Selecione Professores"
                />
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
        </div>
      </Container>
    </Page>
  );
};

export default CourseNew;
