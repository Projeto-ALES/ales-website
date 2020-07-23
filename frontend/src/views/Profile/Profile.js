import React, { useState, useEffect } from "react";

import { getProfile } from "services/professor.service";

import Container from "components/Container/Container";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./Profile.module.scss";

const Profile = ({ history, match }) => {
  const id = "5f19e86e7477c903c882e06c";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { id: 1, value: "Gender", text: "Escolha um gênero", selected: true, disabled: true },
    { id: 2, value: "M", text: "M", selected: false, disabled: false },
    { id: 3, value: "F", text: "F", selected: false, disabled: false },
    { id: 4, value: "N", text: "Não me identifico", selected: false, disabled: false },
  ];

  useEffect(() => {
    const getProfessor = (id) => {
      setIsLoading(true);
      getProfile(id)
        .then((response) => {
          const { name, email, phone, birthday, gender, area } = response.data.professor;
          setName(name);
          setEmail(email);
          setPhone(phone);
          setBirthday(birthday);
          setGender(gender);
          setArea(area);
        })
        .catch((err) => {
          toast.error("Ops! Aconteceu algum erro para retornar os dados");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getProfessor(id);
  }, []);

  return (
    <div className={styles.profileContainer}>
      <Container>
        <div className={styles.profileTitle}>
          <h2>Meu Perfil</h2>
        </div>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <div className={styles.formsContainer}>
            <form className={styles.forms}>
              <div className={styles.formsSection}>
                <span>Dados Principais</span>
                <Input
                  placeholder="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Telefone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className={styles.formsSection}>
                <span>Dados Opcionais</span>
                <Input
                  placeholder="Data de Nascimento"
                  type="text"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                <div className={styles.dropdownContainer}>
                  <Dropdown name="gender" options={options} onSelect={setGender} value={gender} />
                </div>
                <Input
                  placeholder="Curso/Área de Trabalho"
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className={styles.formsSection}>
                <span>Autenticação</span>
                <Input
                  placeholder="Senha Atual"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Nova Senha"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirmação da Nova Senha"
                  type="password"
                  value={newPasswordConf}
                  onChange={(e) => setNewPasswordConf(e.target.value)}
                />
              </div>
            </form>
            <div className={styles.buttonsContainer}>
              <Button text="Voltar" type="button" kind="primary" onClick={() => history.goBack()} />
              <Button text="Salvar" kind="success" onClick={() => alert("forms submission")} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profile;
