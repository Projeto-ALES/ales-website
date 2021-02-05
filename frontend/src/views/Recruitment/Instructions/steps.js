import React from "react";

import {
  MailOutlined,
  PlusCircleOutlined,
  AppstoreAddOutlined,
  SmileOutlined,
} from '@ant-design/icons';

const steps = [
  {
    title: "Convite por Email",
    content: <p>Em alguns instantes, um convite deve ser enviado por email para o <b>projetoales@gmail.com</b> (ou no email cadastrado nas configurações do site). Verifique se o email foi recebido. Caso não tenha recebido após alguns minutos, tente cadastrar o Processo de Recrutamento novamente clicando em <i>Voltar</i>.</p>,
    icon: <MailOutlined />,
  },
  {
    title: "Adicionar Calendário",
    content: <p>Verificado o recebimento do email, agora clique no link <b>Adicionar esta agenda</b> (no corpo do email) e confirme a adição da agenda.</p>,
    icon: <PlusCircleOutlined />,
  },
  {
    title: "Adicionar Entrevistas",
    content: <p>Pronto! Agora é só adicionar as entrevistas como eventos no próprio <b>Google Calendar</b> (e nesse calendário) que o site toma conta do resto <SmileOutlined /> </p>,
    icon: <AppstoreAddOutlined />,
  },
];

export default steps;