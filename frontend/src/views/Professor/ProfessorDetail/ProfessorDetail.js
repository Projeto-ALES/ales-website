import React, { useState, useEffect } from "react";

import { get } from "services/professor.service";

import { phoneMask, formatDateToReceive } from "helpers/masks";

import PageTitle from 'components/PageTitle/PageTitle';
import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./ProfessorDetail.module.scss";

const ProfessorDetail = ({ history, match }) => {
  const { id } = match.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProfessor = (id) => {
      setIsLoading(true);
      get(id)
        .then((response) => {
          const { name, email, phone, birthday, gender, area } = response.data.professor;
          setName(name);
          setEmail(email);
          setPhone(phoneMask(phone));
          setBirthday(formatDateToReceive(birthday));
          setGender(gender);
          setArea(area);
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
    getProfessor(id);
  }, [id]);

  return (
    <div className={styles.professorDetailContainer}>
      <PageTitle title="Professorx" icon="fas fa-chalkboard-teacher" />
      <Container>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <div className={styles.dataContainer}>
            <div className={styles.data}>
              <div className={styles.dataSection}>
                <span className={styles.sectionLabel}>Nome</span>
                <span>{name}</span>
              </div>
              <div className={styles.dataSection}>
                <span className={styles.sectionLabel}>Email</span>
                <span>{email}</span>
              </div>
              <div className={styles.dataSection}>
                <span className={styles.sectionLabel}>Telefone</span>
                <span>{phone}</span>
              </div>
            </div>
            <div className={styles.data}>
              <div className={styles.dataSection}>
                <span className={styles.sectionLabel}>Aniversário</span>
                <span>{birthday || "-"}</span>
              </div>
              <div className={styles.dataSection}>
                <span className={styles.sectionLabel}>Gênero</span>
                <span>{gender || "-"}</span>
              </div>
              <div className={styles.dataSection}>
                <span className={styles.sectionLabel}>Área de Atuação</span>
                <span>{area || "-"}</span>
              </div>
            </div>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Button text="Voltar" type="button" kind="primary" onClick={() => history.goBack()} />
        </div>
      </Container>
    </div>
  );
};

export default ProfessorDetail;
