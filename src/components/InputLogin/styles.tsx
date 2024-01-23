import styled from "styled-components/native";
import Ionicons from '@expo/vector-icons/Ionicons'
export const Container = styled.View`
    flex-direction: row;
    padding: 10px;
    gap: 5px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.COLORS.INFO};
    align-items: center;
`
export const Input = styled.TextInput`
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.INFO};
    width: 90%;
`
export const IconArea = styled.TouchableOpacity`

`
export const Icon = styled(Ionicons)`
    font-size: 20px;
    color: ${({ theme }) => theme.COLORS.INFO};
`