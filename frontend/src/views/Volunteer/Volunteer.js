import React from "react";

import ButtonIcon from "components/ButtonIcon/ButtonIcon";
import Page from "components/Page/Page";
import PageTitle from "components/PageTitle/PageTitle";
import Container from "components/Container/Container";

import styles from "./Volunteer.module.scss";

const Volunteer = () => {
    return (

        <Page>
            <PageTitle
                title="Venha trabalhar conosco!"
                icon="fas fa-hands-helping"
                height="250px"
            />

            <div className={styles.container}>
                <Container>
                    <div className={styles.title}>
                        <h1 className="mt-5">Você ficou interessado no ALES e deseja voluntariar-se?</h1>
                    </div>

                    <div className={styles.description}>
                        <p>
                            Nossos processos seletivos ocorrem de forma semestral, normalmente nos meses de fevereiro/março e julho/agosto. No momento, não estamos com processo seletivo aberto. No entanto, você pode preencher o nosso formulário de interesse (disponível no final dessa página) e, quando o próximo processo seletivo abrir, entraremos em contato com você e enviaremos todas as informações necessárias, assim como o formulário de inscrição.
                        </p>

                        <p>
                            <strong><big>Por que se voluntariar no ALES?</big></strong>
                            <p></p>
                            <ul>
                                <li>Contribuir para uma sociedade melhor;</li>
                                <li>Aumentar a sua visão de mundo;</li>
                                <li>Desenvolver novas habilidades;</li>
                                <li>Trabalhar em equipe;</li>
                                <li>Melhorar a didática como professor;</li>
                                <li>Conhecer pessoas incríveis e engajadas com causas sociais.</li>
                            </ul>
                        </p>
                </div>

                    <div className={styles.description}>

                    <p><strong><big>Quais são as áreas onde posso atuar como voluntário?</big></strong></p>
                        <p>O projeto ALES é dividido em duas grandes áreas:</p>
                        <p>
                            <strong>ENSINO:</strong> área responsável pelas aulas semanais do projeto, que durante a pandemia está ocorrendo de maneira remota, através do uso do Google Meet. Se você tem vontade de lecionar e estar diretamente envolvido com as aulas, essa é a área para você.  Cada disciplina possui diversos professores, que se revezam ao longo do semestre. Atualmente, as matérias que fazem parte da grade do ALES são: Ciências, Desenho, Humanidades, Inglês, Matemática e Programação.
                        </p>

                        <p>
                            <strong>ADM:</strong> é a responsável pelos bastidores do projeto e é dividida em 5 áreas. Algumas das tarefas/atribuições de cada área são:
                            <ul>
                                <li><strong>Comunicação:</strong> divulgação do projeto, gestão das mídias sociais, engajamento dos alunos por meio de posts...</li>
                                <li><strong>Financeiro:</strong> gestão do fluxo de caixa, controle de doações, planejamento orçamental...</li>
                                <li><strong>Pessoas:</strong> gestão da entrada, saída e desempenho dos voluntários, realização de dinâmicas do time e gerais para engajar voluntários, envio e gestão de feedbacks...</li>
                                <li><strong>Sustentabilidade & Compliance:</strong> análise de riscos, gestão da qualidade dos processos, desenvolvimento da governança do projeto...</li>
                                <li><strong>Tech:</strong> gestão e edição do site, análise de dados, resolução de problemas de caráter tecnológico...</li>
                            </ul>
                        </p>

                        <p>
                            Você pode escolher uma das áreas ou, se quiser, pode se inscrever nas duas, sem nenhum problema!
                        </p>

                        <p>
                            Venha fazer parte do nosso time! Clique no link abaixo e preencha o formulário. Assim que o nosso processo seletivo abrir, entraremos em contato com você!
                        </p>

                        <div className={styles.buttons}>
                            <a
                                className={styles.button}
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdT49oylI0QnVyHosEVU9K1wJpT84QtrWT_0jGPINPp-5ZgHw/viewform?usp=sf_link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ButtonIcon text="Quero ser avisado(a) quando as inscrições estiverem abertas!" kind="yellow" icon="far fa-file-alt" />
                            </a>
                        </div>
                    </div>
                </Container>
            </div>

        </Page >
    );
};

export default Volunteer;