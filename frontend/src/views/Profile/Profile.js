import React, { useState, useEffect, useContext } from "react";

import routes from "routes/routes";

import { get, update } from "services/professor.service";
import { updatePassword } from "services/auth.service";
import { context } from "store/store";
import { types } from "store/types";

import {
  phoneMask,
  formatPhone,
  dateMask,
  formatDateToSend,
  formatDateToReceive,
} from "helpers/masks";

import PageTitle from 'components/PageTitle/PageTitle';
import Container from "components/Container/Container";
import Input from "components/Input/Input";
import PhoneInput from "components/PhoneInput/PhoneInput";
import DateInput from "components/DateInput/DateInput";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./Profile.module.scss";

const Profile = ({ history, match }) => {
  const dispatch = useContext(context)[1];
  const { id } = match.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const options = [
    { id: 1, value: "Gender", text: "Escolha um gênero", selected: true, disabled: true },
    { id: 2, value: "M", text: "M", selected: false, disabled: false },
    { id: 3, value: "F", text: "F", selected: false, disabled: false },
    { id: 4, value: "N", text: "Não me identifico", selected: false, disabled: false },
  ];

  useEffect(() => {
    const getProfessor = (id) => {
      setIsLoading(true);
      get(id)
        .then((response) => {
          const { name, email, phone, birthday, gender, area } = response.data.professor;
          setName(name);
          setEmail(email);
          setPhone(phoneMask(phone));
          setBirthday(formatDateToReceive(birthday));
          setGender(gender);
          setArea(area);
        })
        .catch((err) => {
          if (err.response && err.response.status !== 401) {
            toast.error("Ops! Aconteceu algum erro para retornar os dados");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getProfessor(id);
  }, [id]);

  const submitUpdate = (e, id, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { phone, birthday } = data;
    data.phone = formatPhone(phone);
    data.birthday = formatDateToSend(birthday);

    update(id, data)
      .then(() => {
        dispatch({ type: types.UPDATE, user: { _id: id, name, email } });
        history.push(routes.MY_AREA);
        toast.success("Dados atualizados!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro na hora de atualizar seus dados");
        setIsSubmitting(false);
      });
  };

  const submitPasswordUpdate = (e, id, data) => {
    e.preventDefault();
    setIsUpdatingPassword(true);

    const { password, newPassword, newPasswordConf } = data;
    if (newPassword !== newPasswordConf) {
      setIsUpdatingPassword(false);
      toast.error("A nova senha e sua confirmação estão diferentes");
      return;
    }

    updatePassword(id, password, newPassword, newPasswordConf)
      .then(() => {
        toast.success("Senha atualizada!");
      })
      .catch(() => {
        toast.error("Ops! Aconteceu algum erro. Tem certeza que digitou a senha correta?");
      })
      .finally(() => {
        setIsUpdatingPassword(false);
        setPassword("");
        setNewPassword("");
        setNewPasswordConf("");
      });
  };

  return (
    <div className={styles.profileContainer}>
      <PageTitle title="Perfil" icon="fas fa-user-circle" />
      <Container>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <div className={styles.formsContainer}>
            <form
              className={styles.forms}
              onSubmit={(e) =>
                submitUpdate(e, id, {
                  name,
                  email,
                  phone,
                  birthday,
                  gender,
                  area,
                })
              }
            >
              <div className={styles.formsSection}>
                <span>Dados Principais</span>
                <Input
                  placeholder="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <PhoneInput
                  placeholder="Telefone (99) 9XXXX-XXXX"
                  onChange={(e) => setPhone(phoneMask(e.target.value))}
                  value={phone}
                  required
                  min={11}
                />
              </div>
              <div className={styles.formsSection}>
                <span>Dados Opcionais</span>
                <DateInput
                  placeholder="Data de Nascimento dd/mm/aaaa"
                  onChange={(e) => setBirthday(dateMask(e.target.value))}
                  value={birthday}
                  required
                  min={8}
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
                <div className={styles.buttonsContainer}>
                  <Button
                    text="Voltar"
                    type="button"
                    kind="tertiary"
                    onClick={() => history.goBack()}
                  />
                  <Button
                    text="Salvar"
                    type="submit"
                    kind="success"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    width="140px"
                  />
                </div>
              </div>
            </form>
            <form
              className={styles.forms}
              onSubmit={(e) =>
                submitPasswordUpdate(e, id, { password, newPassword, newPasswordConf })
              }
            >
              <div className={styles.authFormsContent}>
                <div className={styles.formsSection}>
                  <span>Autenticação</span>
                  <Input
                    placeholder="Senha Atual"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Nova Senha"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Confirmação da Nova Senha"
                    type="password"
                    value={newPasswordConf}
                    onChange={(e) => setNewPasswordConf(e.target.value)}
                    required
                  />
                  <div className={styles.buttonContainer}>
                    <Button
                      text="Atualizar senha"
                      type="submit"
                      kind="primary"
                      isLoading={isUpdatingPassword}
                      disabled={isUpdatingPassword}
                      width="180px"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profile;
