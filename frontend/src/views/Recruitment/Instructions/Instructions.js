import React, { useState } from "react";

import steps from "./steps";

import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";

import { Steps, Button } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

import styles from "./Instructions.module.scss";
import routes from "routes/routes";

const { Step } = Steps;

const Instructions = ({ history }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep(step => step + 1);
  };

  const prev = () => {
    setCurrentStep(step => step - 1);
  };

  return (
    <Page>
      <PageTitle title="Instruções" />
      <Container>
        <div className={styles.container}>
          <div className={styles.steps}>
            <Steps current={currentStep} direction="vertical" className={styles.steps}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} icon={item.icon} />
              ))}
            </Steps>
          </div>
          <div className={styles.stepsContent}>{steps[currentStep].content}</div>
          <div className={styles.stepsAction}>
            {currentStep === 0 && (
              <Button style={{ margin: '0 8px' }} icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>
                Voltar
              </Button>
            )}
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} icon={<ArrowLeftOutlined />} onClick={() => prev()}>
                Voltar
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => next()}>
                Próximo
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => history.push(routes.RECRUITMENT)}>
                Concluído
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Page>
  );
}

export default Instructions;