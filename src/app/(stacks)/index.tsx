import InputLogin from "../../components/InputLogin";
import Button from "../../components/button";
import { router } from "expo-router";
import * as S from "./styles";
import useLogin from "../../apis/list/Login";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, error, login, loading } = useLogin();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    login({ userName, password });
    if (error) {
      console.log(error);
    } else {
      console.log("Login:", data.access_token);
	  router.replace("/home")
    }
  };

  //router.replace("/home");
  return (
    <S.Container>
      <S.Logo
        source={require("../../assets/Logo.png")}
        resizeMode="contain"
      ></S.Logo>
      <InputLogin
        placeholder="Usuário"
        value={userName}
        onChangeText={t => {setUserName(t)}}
      />
      <InputLogin
        placeholder="Senha"
        password
        value={password}
        onChangeText={t => setPassword(t)}
      />
      <Button text="Entrar" handleLogin={handleLogin} loading={loading} />
    </S.Container>
  );
}
