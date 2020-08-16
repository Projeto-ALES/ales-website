import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import routes from "routes/routes";

import { toast } from "react-toastify";

import { login } from "services/auth.service";
import { context } from "store/store";
import { types } from "store/types";

import Page from "components/Page/Page";
import Container from "components/Container/Container";
import Card from "components/Card/Card";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

import Alessauro from "assets/logos/alessauro.svg";

import styles from "./Login.module.scss";

const Login = ({ history, location }) => {
  const dispatch = useContext(context)[1];

  useEffect(() => {
    if (location && location.state) {
      if (location.state.logout) {
        dispatch({ type: types.LOGOUT });

        if (location.state.error) {
          toast.info("Sua sessão expirou. Faça login novamente");
        }
      }
    }
    // eslint-disable-next-line
  }, [location]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async (e, email, password) => {
    e.preventDefault();
    setIsLoading(true);

    login(email, password)
      .then((response) => {
        const { user } = response.data;
        dispatch({ type: types.LOGIN, user });
        history.push(routes.MY_AREA);
      })
      .catch((err) => {
        err.response && err.response.status === 401
          ? toast.error("Credenciais Inválidas")
          : toast.error("Ops! Aconteceu algum erro");
        setIsLoading(false);
      });
  };

  return (
    <Page>
      <Container>
        <div className={styles.card}>
          <Card kind="outline-blue">
            <form className={styles.form} onSubmit={(e) => submitLogin(e, email, password)}>
              <img src={Alessauro} alt="alessauro" />
              <div className={styles.form__input}>
                <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Link to="/reset-password">Esqueci a senha</Link>
              </div>
              <div className={styles.form__button}>
                <Button
                  text="Entrar"
                  kind="primary"
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Page>
  );
};

export default Login;
