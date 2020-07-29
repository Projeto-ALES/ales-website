import React, { useState, useEffect } from "react";

import routes from "routes/routes";

import { list } from "services/professor.service";

import Container from "components/Container/Container";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import MaterialTable from "material-table";
import { toast } from "react-toastify";

import styles from "./ProfessorList.module.scss";

const ProfessorList = ({ history }) => {
  const [professors, setProfessors] = useState([]);
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
          if (err.response.data.status !== 401) {
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
    <div className={styles.professorListContainer}>
      <Container>
        <div className={styles.professorListTitle}>
          <h2>Professores</h2>
        </div>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <div className={styles.contentContainer}>
            <div className={styles.tableContainer}>
              <MaterialTable
                style={{ padding: `0 3%`, color: "#263238" }}
                columns={[
                  { title: "Nome", field: "name" },
                  { title: "Email", field: "email" },
                ]}
                data={professors}
                title="Professores"
                actions={[
                  {
                    icon: "account_circle",
                    tooltip: "Detalhes dx Professorx",
                    onClick: (event, rowData) => {
                      const { name } = rowData;
                      const { _id } = professors.find((prof) => prof.name === name);
                      history.push(routes.PROFESSOR_DETAIL.replace(":id", _id));
                    },
                  },
                ]}
                options={{
                  pageSize: 10,
                }}
                localization={{
                  pagination: {
                    labelRowsSelect: "Itens",
                    labelDisplayedRows: "{from}-{to} de {count}",
                  },
                  header: {
                    actions: "Ações",
                  },
                  toolbar: {
                    searchPlaceholder: "Buscar",
                  },
                  body: {
                    emptyDataSourceMessage: "Nenhumx professorx cadastradx",
                    filterRow: {
                      filterTooltip: "Filtrar",
                    },
                  },
                }}
              />
            </div>
            <div className={styles.buttonsContainer}>
              <Button text="Voltar" onClick={() => history.goBack()} />
              <Button
                kind="success"
                text="Adicionar"
                onClick={() => history.push(routes.PROFESSOR_INVITE)}
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProfessorList;
