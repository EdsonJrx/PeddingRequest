import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'

export interface ChipProps {
    id?: number;
    text: string;
    visible: boolean;
    shwModal: () => void;
}

export const TextArea = styled.TouchableOpacity`
    height:40px;
    flex-direction:row;
    padding: 5px 10px 5px 10px;
    justify-content: center;
    align-items: center;
    margin-right:10px;

    border-radius: 5px;
    border: 1.2px solid #000;
`
export const Text = styled.Text`
    color: #000;
    text-align: center;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`
export const Icon = styled(Ionicons)<ChipProps>`
    font-size:12px;
    color:black;   
`