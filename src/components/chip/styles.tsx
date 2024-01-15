import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'

export interface ChipProps {
    id: string;
    text: string;
    visible: boolean;
    shwModal: () => void;
    qtd: number ;
}

export const TextArea = styled.TouchableOpacity<ChipProps>`
    height:40px;
    flex-direction:row;
    padding: 5px 10px 5px 10px;
    justify-content: center;
    align-items: center;
    margin-right:10px;
    background-color:${({theme,qtd}) => qtd > 0  ? theme.COLORS.INFO_SELECTED : theme.COLORS.BACKGROUND};

    border-radius: 5px;
    border: 1.2px solid;
    border-color:${({theme,qtd}) =>qtd > 0 ? theme.COLORS.INFO : theme.COLORS.TEXT_SECONDARY};
`
export const Text = styled.Text<ChipProps>`
    color: ${({theme,qtd}) => qtd > 0 ? theme.COLORS.INFO : theme.COLORS.TEXT_SECONDARY};
    text-align: center;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`
export const Icon = styled(Ionicons)<ChipProps>`
    font-size:12px;
    color: ${({theme,qtd}) => qtd > 0 ? theme.COLORS.INFO : theme.COLORS.TEXT_SECONDARY};
`