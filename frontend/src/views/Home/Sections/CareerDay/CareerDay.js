import React from "react";

import Container from "components/Container/Container";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";

import Alessauro from "assets/logos/alessauro.svg";
import styles from "./CareerDay.module.scss";

import schedule from "./schedule";

const CarrerDay = () => {
  return (
    <div className={styles.container} id="dia-profissoes">
      <Container>
        <div className={styles.title}>
          <img src={Alessauro} alt="alessauro" />
          <h2>Dia das Profissões!</h2>
        </div>
        <div className={styles.subtitle}>
          <h3>Quer saber mais sobre algum curso/profissão? Ou sobre a Unicamp talvez? Então só vem!!</h3>
        </div>
        <div className={styles.description}>
          <p>
            Nós do ALES estamos organizando o <b>Dia das Profissões</b> \o/ Nele, você aluno(a) poderá conhecer mais sobre
            diversos cursos e carreiras, além de tirar dúvidas com pessoas que estudam e/ou já trabalham nessas áreas! Demais né?
            O evento será no dia <b>21/11</b> a partir das <b>10h</b>. Mais informações aqui embaixo 👇
            Além disso, nós fizemos um formulário pra você ou alguma pessoa que você conheça já possa enviar alguma dúvida.
            E aí depois no próprio dia ou até depois vamos te responder, beleza?</p>
          <div className={styles.buttonContainer}>
            <a href="https://forms.gle/D9LkLMm8F2rzCZsG8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon text="Mande sua dúvida!" kind="primary" icon="far fa-question-circle" />
            </a>
          </div>
        </div>
        <div className={styles.schedule}>
          <h3>Cronograma do dia</h3>
          <div>
            <table className={styles.table}>
              <tr>
                <th>Horário</th>
                <th>Cursos</th>
              </tr>
              {schedule.map((s) => {
                return (
                  <tr key={s.id}>
                    <td>{s.time}</td>
                    {s.link ? (
                      <td>
                        <a href={s.link} target="_blank">{s.name}</a>
                      </td>
                    ) : (<td>{s.name}</td>)}
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <div className={styles.info}>
          <p>Todas as conversas serão remotas (via Google Meet). Pra entrar na sala do curso é só clicar no nome dele na tabela aqui em cima ☝️</p>
        </div>
      </Container >
    </div >
  )
}

export default CarrerDay;