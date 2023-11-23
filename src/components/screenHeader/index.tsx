import { useState } from "react";
import { Avatar } from "../avatar";
import * as S from "./styles";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";

export function ScreenHeader({searchText, onChangeText }:{searchText:string, onChangeText:((text: string) => void) | undefined}) {
  
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <S.Container>
      <S.Icon name="menu" />
      <S.TextInput placeholder="Buscar Requisições" value={searchText} onChangeText={onChangeText}/>
      <Avatar />
    </S.Container>
  );
}
