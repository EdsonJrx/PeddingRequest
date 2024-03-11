import InputLogin from "../../components/InputLogin";
import Button from "../../components/button";
import { useAuth } from "../../contexts/AuthContexts";
import * as S from "./styles";

import { useEffect, useState } from "react";

export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {onLogin, onRegister, authState} = useAuth();

  const handleLogin = async () => {
    const result = await onLogin!(userName, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  // We automatically call the login after  a successful registration
  const register = async () => {
    const result = await onRegister!(userName, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      handleLogin();
    }
  }

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
      <Button text="Entrar" handleLogin={handleLogin} loading={false} />
    </S.Container>
  );
}
