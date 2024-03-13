import * as S from "./styles";


export default function Inicio() {

  return (
    <S.Container>
      <S.Logo
        source={require("../assets/Logo.png")}
        resizeMode="contain"
      ></S.Logo>
      <S.Loding size={"large"}  />
    </S.Container>
  );
}
