import React, { useState, useEffect } from "react";
import moment from "moment";

import { update, get } from "services/recruitment.service";

import { Form, Input, Button, DatePicker, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import PageTitle from "components/PageTitle/PageTitle";
import Loader from "components/Loader/Loader";

import styles from "./ProcessEdit.module.scss";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ProcessEdit = ({ history, match }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    const getProcess = (name) => {
      setIsLoading(true);
      get(name)
        .then((response) => {
          const { name, description, beginningDate, endDate } = response.data.process;
          form.setFieldsValue({
            name: name,
            description: description,
            dates: [moment(beginningDate), moment(endDate)]
          });
        })
        .catch(() => message.error("Ops! Parece que houve um erro pra pegar os dados do processo"))
        .finally(() => {
          setIsLoading(false);
        })
    };
    getProcess(match.params.name);
  }, []);

  const submitProcess = (data) => {
    setIsSubmitting(true);

    const { name, description, dates } = data;
    const beginningDate = dates[0]._d;
    const endDate = dates[1]._d;

    update(match.params.name, { name, description, beginningDate, endDate })
      .then(() => {
        history.goBack();
        message.success("Processo atualizado!");
      })
      .catch(() => {
        message.error("Ops! Parece que houve um erro pra atualizar o processo");
        setIsSubmitting(false);
      });
  }

  return (
    <Page>
      <PageTitle title="Novo PS" />
      <Container>
        <div className={styles.form}>
          {isLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
              <Form
                form={form}
                onFinish={submitProcess}
              >
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
            )}
        </div>
      </Container>
    </Page >
  )
};

export default ProcessEdit;