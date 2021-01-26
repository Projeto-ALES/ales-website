import React, { useState, useEffect } from "react";

import { create } from "services/recruitment.service";

import { Form, Input, Button, DatePicker, message } from 'antd';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const submitProcess = (data) => {
    setIsSubmitting(true);

    const { name, description, dates } = data;
    const beginningDate = dates[0]._d;
    const endDate = dates[1]._d;

    create({ name, description, beginningDate, endDate })
      .then(() => {
        history.goBack();
        message.success("Processo adicionado!");
      })
      .catch(() => {
        message.error("Ops! Parece que houve um erro pra criar o processo");
        setIsSubmitting(false);
      });
  };

  return (
    <Page>
      <PageTitle title="Novo PS" />
      <Container>
        <div className={styles.form}>
          <Form form={form} onFinish={submitProcess}>
            <div className={styles.item}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Faltou o nome do processo!" }]}
              >
                <Input placeholder="Nome" />
              </Form.Item>
            </div>
            <div className={styles.item}>
              <Form.Item
                name="description"
              >
                <TextArea
                  rows={4}
                  placeholder="Descrição"
                />
              </Form.Item>
            </div>
            <div className={styles.item}>
              <Form.Item
                name="dates"
                rules={[{ required: true, message: "Faltou escolher as datas!" }]}
              >
                <RangePicker
                  placeholder={["Início", "Término"]}
                />
              </Form.Item>
            </div>
            <div className={styles.buttons}>
              <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>
                Voltar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
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