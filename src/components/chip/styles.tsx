import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'

export type ChipProps = {
    text:string;
    visible:boolean;
}
export const Container = styled.View`
    flex-direction:row;
    justify-content: center;
    align-items: center;
    padding-left: 10px ;
`

export const TextArea = styled.View`
    flex-direction:row;
    padding: 5px 10px 5px 10px;
    justify-content: center;
    align-items: center;

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
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
    
`