import { useState } from "react";
import * as S from "./styles";
import useLogin from "../../apis/list/Login";

interface ButtonProps {
    text: string;
    handleLogin: () => void;
    loading: boolean
}

export default function Button({text, handleLogin, loading}: ButtonProps) {

  return (
    <S.Button
      onPress={() => {
        handleLogin();

      }}
    >
      <S.TextButton>{loading ? <S.Loading  />:text}</S.TextButton>
      
    </S.Button>
  );
}
