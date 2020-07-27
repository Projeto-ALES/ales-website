import React, { useState, useEffect, useContext } from "react";

import routes from "routes/routes";

import { getProfile, update } from "services/professor.service";
import { context } from "store/store";
import { types } from "store/types";

import Container from "components/Container/Container";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import styles from "./Profile.module.scss";

const Profile = ({ history, match }) => {
  const [state, dispatch] = useContext(context);
  const { id } = match.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const submitUpdate = (e, id, data) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email } = data;
    update(id, data)
      .then(() => {
        dispatch({ type: types.UPDATE, user: { name, email } });
        history.push(routes.MY_AREA);
        toast.success("Dados atualizados!");
      })
      .catch((err) => {
        toast.error("Ops! Aconteceu algum erro na hora de atualizar seus dados");
        setIsSubmitting(false);
      });
  };

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
                <Input
                  placeholder="Telefone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
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
                <div className={styles.buttonsContainer}>
                  <Button
                    text="Voltar"
                    type="button"
                    kind="primary"
                    onClick={() => history.goBack()}
                  />
                  <Button
                    text="Salvar"
                    type="submit"
                    kind="success"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  />
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
