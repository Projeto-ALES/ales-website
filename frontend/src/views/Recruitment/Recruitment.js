import React, { useState, useEffect } from "react";

import routes from "routes/routes";
import { list, update } from "services/recruitment.service";

import { Card, Tooltip, Button, Tag, Switch, Modal, message } from "antd";
import {
  InfoCircleOutlined,
  EditOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import PageTitle from "components/PageTitle/PageTitle";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./Recruitment.module.scss";

const Recruitment = ({ history }) => {
  const { Meta } = Card;
  const { confirm } = Modal;

  const [processes, setProcesses] = useState([]);
  const [activeProcesses, setActiveProcesses] = useState([]);
  const [listAll, setListAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getProcesses = () => {
    setIsLoading(true);
    list()
      .then((response) => {
        const { processes } = response.data;
        setProcesses(processes);
        setActiveProcesses(processes.filter(proc => proc.status !== "done") || []);
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro para listar os processos");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProcesses();
  }, []);

  const mapStatus = (status) => {
    switch (status) {
      case "active":
        return <Tag color="green">Ativo</Tag>
      case "done":
        return <Tag color="blue">Finalizado</Tag>
    }
  };

  const actions = [
    <Tooltip placement="left" title="Detalhe">
      <InfoCircleOutlined onClick={() => alert("info")} />
    </Tooltip>
  ];

  const activeActions = (name) => [...actions,
  <Tooltip placement="bottom" title="Editar">
    <EditOutlined
      key="edit"
      onClick={() => history.push(routes.PROCESS_EDIT.replace(":name", name))} />
  </Tooltip>,
  <Tooltip placement="right" title="Finalizar">
    <CheckCircleOutlined key="edit" onClick={() => showDoneConfirm(name)} />
  </Tooltip>
  ];

  const closeProcess = (name) => {
    update(name, { status: "done" })
      .then(() => {
        message.success("Processo encerrado!");
        getProcesses();
      })
      .catch(() => {
        message.error("Ops! Aconteceu algum erro pra encerrar o processo");
      });
  };

  const showDoneConfirm = async (name) => {
    confirm({
      title: "Tem certeza que encerrar o processo?",
      icon: <ExclamationCircleOutlined />,
      okText: "Encerrar",
      okType: "danger",
      cancelText: "Cancelar",
      confirmLoading: true,
      onOk() {
        return closeProcess(name);
      },
      onCancel() { },
    });
  };

  return (
    <Page>
      <PageTitle title="Recrutamento" />
      <Container>
        <div className={styles.recruitment}>
          { }
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
              onClick={() => history.push(routes.PROCESS_NEW)}
            >
              Novo PS
          </Button>
          </div>
          <div>
            <Switch
              checkedChildren="Ativos"
              unCheckedChildren="Todos"
              defaultChecked={!listAll}
              onClick={() => setListAll(state => !state)}
            />
          </div>
          <div className={styles.processes}>
            {isLoading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (listAll ? processes : activeProcesses).map((proc) => {
              return (
                <div className={styles.card}>
                  <Card
                    style={{ width: 300, textAlign: "center" }}
                    actions={
                      proc.status === "active" ?
                        activeActions(proc.name) :
                        actions
                    }
                  >
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                      <Meta title={proc.name} />
                      {mapStatus(proc.status)}
                    </div>
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