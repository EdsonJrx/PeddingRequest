import { useAuth } from "../../contexts/AuthContexts";
import * as S from "./styles";


export default function Login() {

  const {authState} = useAuth();

  return (
    <S.Container>
      <S.Logo
        source={require("../../assets/Logo.png")}
        resizeMode="contain"
      ></S.Logo>
    </S.Container>
  );
}
