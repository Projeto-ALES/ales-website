import React, { useState, useEffect } from "react";

import { list } from "services/recruitment.service";

import { Card, Tooltip, Button } from "antd";
import {
  InfoCircleOutlined,
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import PageTitle from "components/PageTitle/PageTitle";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./Recruitment.module.scss";

const Recruitment = ({ history }) => {
  const { Meta } = Card;
  const [processes, setProcesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProcesses = () => {
    setIsLoading(true);
    list()
      .then((response) => {
        const { processes } = response.data;
        setProcesses(processes);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro para listar os processos");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getProcesses();
  }, []);

  return (
    <Page>
      <PageTitle title="Recrutamento" />
      <Container>
        <div className={styles.recruitment}>
          <div className={styles.buttons}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            >
              Voltar
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => alert("add")}
            >
              Novo PS
          </Button>
          </div>
          <div className={styles.processes}>
            {isLoading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : processes.map((proc) => {
              return (
                <div className={styles.card}>
                  <Card
                    style={{ width: 300, textAlign: "center" }}
                    actions={[
                      <Tooltip placement="left" title="Detalhe">
                        <InfoCircleOutlined onClick={() => alert("info")} />
                      </Tooltip>,
                      <Tooltip placement="bottom" title="Editar">
                        <EditOutlined key="edit" onClick={() => alert("edit")} />
                      </Tooltip>,
                      <Tooltip placement="bottom" title="Finalizar">
                        <CheckCircleOutlined key="edit" onClick={() => alert("edit")} />
                      </Tooltip>,
                      <Tooltip placement="right" title="Arquivar">
                        <DeleteOutlined onClick={() => alert("remove")} />
                      </Tooltip>,
                    ]}
                  >
                    <Meta title={proc.name} />
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default Recruitment;