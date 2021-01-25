import React, { useState, useEffect } from "react";

import { Form, Input, Button, DatePicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import PageTitle from "components/PageTitle/PageTitle";

import styles from "./ProcessNew.module.scss";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ProcessNew = ({ history }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [beginningDate, setBeginningDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Page>
      <PageTitle title="Novo PS" />
      <Container>
        <div className={styles.form}>
          <Form form={form}>
            <div className={styles.item}>
              <Form.Item
                name="Nome"
                rules={[{ required: true, message: "Faltou o nome do processo!" }]}
              >
                <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
            </div>
            <div className={styles.item}>
              <Form.Item
                name="Descrição"
              >
                <TextArea
                  rows={4}
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className={styles.item}>
              <Form.Item
                name="Datas"
                rules={[{ required: true, message: "Faltou escolher as datas!" }]}
              >
                <RangePicker
                  placeholder={["Início", "Término"]}
                  value={[beginningDate, endDate]}
                  onChange={(moment, string) => (setBeginningDate(string[0]), setEndDate(string[1]))}
                />
              </Form.Item>
            </div>
            <div className={styles.buttons}>
              <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>
                Voltar
              </Button>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </Page >
  )
};

export default ProcessNew;