import React from "react";

import Container from "components/Container/Container";
import Button from "components/Button/Button";
import MaterialTable from "material-table";

import styles from "./ProfessorList.module.scss";

const ProfessorList = ({ history }) => {
  const data = [
    { name: "Victor", email: "victorpalmerini@gmail.com" },
    { name: "Henrique", email: "henrique@gmail.com" },
    { name: "Ellen", email: "ellen@gmail.com" },
    { name: "Victor", email: "victorpalmerini@gmail.com" },
    { name: "Henrique", email: "henrique@gmail.com" },
    { name: "Ellen", email: "ellen@gmail.com" },
    { name: "Victor", email: "victorpalmerini@gmail.com" },
    { name: "Henrique", email: "henrique@gmail.com" },
    { name: "Ellen", email: "ellen@gmail.com" },
  ];

  return (
    <div className={styles.professorListContainer}>
      <Container>
        <div className={styles.professorListTitle}>
          <h2>Professores</h2>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.tableContainer}>
            <MaterialTable
              style={{ padding: `0 3%`, color: "#263238" }}
              columns={[
                { title: "Nome", field: "name" },
                { title: "Email", field: "email" },
              ]}
              data={data}
              title="Professores"
              actions={[
                {
                  icon: "account_circle",
                  tooltip: "Edit User",
                  onClick: (event, rowData) => alert("You want to edit " + rowData.name),
                },
              ]}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button text="Voltar" onClick={() => history.goBack()} />
            <Button kind="success" text="Adicionar" onClick={() => {}} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfessorList;
