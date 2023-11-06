import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons"

export const Container = styled.View`
    flex-direction: row;
    padding: 5px 15px;
    justify-content: space-between;
    align-items: center;
    width:90%;

    border-radius: 10px;
    background: #D9D9D9;
`
export const ContainerText = styled.View`
    flex-direction:row;
    align-items: center;
    gap: 40px;
    flex: 1;
`
export const Icon = styled(Ionicons)`
    font-size: 30px;
    color: #404040; 
`
export const TextInput = styled.TextInput`
    font-size: 12px;
    color: #404040;
    font-family: 'Inter_400Regular';
    flex:1
`