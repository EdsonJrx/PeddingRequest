import { useState } from "react";
import * as S from "./styles";

interface InputProps {
  placeholder: string;
  password?: boolean;
  onChangeText: (t:string) => void;
  value: string;
}

const InputLogin = ({ placeholder, password, onChangeText, value}: InputProps) => {
  const [shwPass, setShwPass] = useState(false);
  return (
    <S.Container>
      <S.Input
        placeholder={placeholder}
        secureTextEntry={password && !shwPass}
        onChangeText={onChangeText}
        value={value}
      />
      {password && (
        <S.IconArea onPress={() => setShwPass(!shwPass)}>
          <S.Icon name={shwPass ? "eye" : "eye-off"} />
        </S.IconArea>
      )}
    </S.Container>
  );
};

export default InputLogin;
