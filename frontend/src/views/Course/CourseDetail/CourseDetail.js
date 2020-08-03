import React from "react";

import routes from "routes/routes";

import Container from "components/Container/Container";
import Button from "components/Button/Button";
import MaterialTable from "material-table";

import styles from "./CourseDetail.module.scss";

const CourseDetail = ({ history, match }) => {
  const course = {
    id: 1,
    name: "Programação",
    description: "Matéria muito legal! Venha aprender a desenvolver jogos e sites com a gente o/",
    start: "01/09/2020",
    end: "30/11/2020",
    coordinator: "Victor Palmerini",
    teachers: [
      { name: "Victor", email: "victor@gmail.com" },
      { name: "Henrique", email: "henrique@gmail.com" },
      { name: "Ellen", email: "ellen@gmail.com" },
      { name: "Victor", email: "victor@gmail.com" },
      { name: "Henrique", email: "henrique@gmail.com" },
      { name: "Ellen", email: "ellen@gmail.com" },
      { name: "Victor", email: "victor@gmail.com" },
      { name: "Henrique", email: "henrique@gmail.com" },
      { name: "Ellen", email: "ellen@gmail.com" },
    ],
    classes: [
      {
        id: 1,
        name: "Aula 01",
        description:
          "Matéria muito legal! Venha aprender a desenvolver jogos e sites com a gente o/",
      },
      { id: 2, name: "Aula 02", description: "Aula Introdutória" },
      { id: 3, name: "Aula 03", description: "Aula Introdutória" },
      { id: 4, name: "Aula 04", description: "Aula Introdutória" },
    ],
    resources: [
      {
        id: 1,
        title: "Relação vs função",
        course: "Matemática",
        type: "Vídeo",
        description:
          "Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser vista como uma função...não entendeu nada? Clica ou toca nesse card pra descobrir",
      },
      {
        id: 2,
        title: "Relação vs função",
        course: "Matemática",
        type: "Vídeo",
        description:
          "Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser vista como uma função...não entendeu nada? Clica ou toca nesse card pra descobrir",
      },
      {
        id: 3,
        title: "Relação vs função",
        course: "Matemática",
        type: "Vídeo",
        description:
          "Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser vista como uma função...não entendeu nada? Clica ou toca nesse card pra descobrir",
      },
      {
        id: 4,
        title: "Relação vs função",
        course: "Matemática",
        type: "Vídeo",
        description:
          "Vídeo que mostra como a relação do Homer Simpson com a sua filha pode ser vista como uma função...não entendeu nada? Clica ou toca nesse card pra descobrir",
      },
    ],
    students: [
      { id: 1, name: "João", email: "joao@gmail.com", phone: "999999999" },
      { id: 2, name: "João", email: "joao@gmail.com", phone: "999999999" },
      { id: 3, name: "João", email: "joao@gmail.com", phone: "999999999" },
      { id: 4, name: "João", email: "joao@gmail.com", phone: "999999999" },
    ],
  };

  return (
    <div className={styles.courseDetailContainer}>
      <Container>
        <div className={styles.courseDetailTitle}>
          <h2>{course.name}</h2>
        </div>
        <div className={styles.courseDetailDescription}>
          <p>{course.description}</p>
        </div>
        <div className={styles.courseDetailData}>
          <div className={styles.dataPeriod}>
            <div className={styles.dataSection}>
              <h4>Início</h4>
              <span>{course.start}</span>
            </div>
            <div className={styles.dataSection}>
              <h4>Fim</h4>
              <span>{course.end}</span>
            </div>
          </div>
          <div className={styles.dataCoordinator}>
            <h4>Coordenadorx</h4>
            <span>{course.coordinator}</span>
          </div>
        </div>
        <div className={styles.tablesContainer}>
          <div className={styles.actionButtonsContainer}>
            <Button text="Voltar" onClick={() => history.goBack()} />
            <Button
              kind="primary"
              text="Editar"
              onClick={() => history.push(routes.COURSE_EDIT.replace(":id", match.params.id))}
            />
          </div>
          <div className={styles.tableContainer}>
            <MaterialTable
              style={{ padding: `0 3%`, color: "#263238" }}
              columns={[
                { title: "Nome", field: "name" },
                { title: "Email", field: "email" },
              ]}
              data={course.teachers}
              title="Professores"
              actions={[
                {
                  icon: "account_circle",
                  tooltip: "Visualizar Professor",
                  onClick: (event, rowData) => alert("You want to visualize " + rowData.name),
                },
                {
                  icon: "delete_outline",
                  tooltip: "Remover Professor da Matéria",
                  onClick: (event, rowData) => alert("You want to remove " + rowData.name),
                },
              ]}
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
                  exportTitle: "Exportar",
                  exportName: "Exportar como .csv",
                },
                body: {
                  emptyDataSourceMessage: "Nenhum dado para mostrar",
                  filterRow: {
                    filterTooltip: "Filtrar",
                  },
                },
              }}
              options={{
                exportButton: true,
              }}
            />
            <div className={styles.buttonContainer}>
              <Button kind="success" text="Adicionar" />
            </div>
          </div>
          <div className={styles.tableContainer}>
            <MaterialTable
              style={{ padding: `0 3%`, color: "#263238" }}
              columns={[
                { title: "Nome", field: "name" },
                { title: "Descrição", field: "description" },
              ]}
              data={course.classes}
              title="Aulas"
              actions={[
                {
                  icon: "edit",
                  tooltip: "Editar Aula",
                  onClick: (event, rowData) => alert("You want to edit " + rowData.name),
                },
                {
                  icon: "delete_outline",
                  tooltip: "Excluir Aula",
                  onClick: (event, rowData) => alert("You want to remove " + rowData.name),
                },
              ]}
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
                  emptyDataSourceMessage: "Nenhum dado para mostrar",
                  filterRow: {
                    filterTooltip: "Filtrar",
                  },
                },
              }}
            />
            <div className={styles.buttonContainer}>
              <Button kind="success" text="Adicionar" />
            </div>
          </div>
          <div className={styles.tableContainer}>
            <MaterialTable
              style={{ padding: `0 3%`, color: "#263238" }}
              columns={[
                { title: "Título", field: "title" },
                { title: "Tipo", field: "type" },
              ]}
              data={course.resources}
              title="Recursos"
              actions={[
                {
                  icon: "edit",
                  tooltip: "Editar Recurso",
                  onClick: (event, rowData) => alert("You want to edit " + rowData.title),
                },
                {
                  icon: "delete_outline",
                  tooltip: "Excluir Recurso",
                  onClick: (event, rowData) => alert("You want to remove " + rowData.title),
                },
              ]}
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
                  emptyDataSourceMessage: "Nenhum dado para mostrar",
                  filterRow: {
                    filterTooltip: "Filtrar",
                  },
                },
              }}
            />
            <div className={styles.buttonContainer}>
              <Button kind="success" text="Adicionar" />
            </div>
          </div>
          <div className={styles.tableContainer}>
            <MaterialTable
              style={{ padding: `0 3%`, color: "#263238" }}
              columns={[
                { title: "Nome", field: "name" },
                { title: "Email", field: "email" },
                { title: "Telefone", field: "phone" },
              ]}
              data={course.students}
              title="Alunos"
              actions={[
                {
                  icon: "account_circle",
                  tooltip: "Visualizar Alunos",
                  onClick: (event, rowData) => alert("You want to visualize " + rowData.name),
                },
              ]}
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
                  exportTitle: "Exportar",
                  exportName: "Exportar como .csv",
                },
                body: {
                  emptyDataSourceMessage: "Nenhum dado para mostrar",
                  filterRow: {
                    filterTooltip: "Filtrar",
                  },
                },
              }}
              options={{
                exportButton: true,
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetail;
