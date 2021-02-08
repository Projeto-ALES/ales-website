import React, { useState, useEffect } from "react";

import { get } from "services/recruitment.service";

import { formatDateToReceive } from "helpers/masks";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";
import Loader from "components/Loader/Loader";

import { message, Tag, Statistic, Button, Select, Table, Tooltip } from "antd";
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import styles from "./ProcessDetail.module.scss";
import columns from "./columns";

const { Option } = Select;

const ProcessDetail = ({ history, match }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [beginningDate, setBeginningDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProcess = (name) => {
      setIsLoading(true);
      get(name)
        .then((response) => {
          const { process } = response.data;
          setName(process.name);
          setStatus(process.status);
          setBeginningDate(formatDateToReceive(process.beginningDate));
          setEndDate(formatDateToReceive(process.endDate));

          const { events } = response.data;
          setEvents(events);
        })
        .catch(() => {
          message.error("Ops! Aconteceu algum erro pra pegar os dados do Processo");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    getProcess(match.params.name);
  }, []);

  useEffect(() => {
    if (events) {
      setSelectedDate(Object.keys(events)[0]);
    }
  }, [events]);

  const mapProcessStatus = (status) => {
    switch (status) {
      case "active":
        return <Tag color="green">Ativo</Tag>
      case "done":
        return <Tag color="blue">Finalizado</Tag>
    }
  };

  return (
    <Page>
      <PageTitle title="Detalhes do PS" />
      <Container>
        {isLoading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
            <div className={styles.container}>
              <div className={styles.button}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>Voltar</Button>
              </div>
              <div className={styles.title}>
                <h1>{name}</h1>
                {mapProcessStatus(status)}
              </div>
              <div className={styles.dates}>
                <div className={styles.date}>
                  {beginningDate && <Statistic title="Início" value={beginningDate} />}
                </div>
                <div className={styles.date}>
                  {endDate && <Statistic title="Fim" value={endDate} />}
                </div>
              </div>
              <div className={styles.select}>
                <Select style={{ width: 200 }} defaultValue={selectedDate} onChange={(value) => setSelectedDate(value)}>
                  {Object.entries(events).map(([key,]
                  ) => {
                    return <Option value={key}>{key}</Option>
                  })}
                </Select>
                <div className={styles.select__info}>
                  <Tooltip
                    title="Listados apenas os dias que contém pelo menos 1 evento"
                    placement="bottom"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </div>
              </div>
              <div className={styles.table}>
                <Table
                  columns={columns}
                  dataSource={events[selectedDate]}
                  pagination={false}
                  scroll={{ x: 800 }}
                  bordered
                />
              </div>
            </div>
          )}
      </Container>
    </Page>
  )
}

export default ProcessDetail;