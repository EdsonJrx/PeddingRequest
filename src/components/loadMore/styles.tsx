import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    padding:10px;
`
export const Text = styled.Text`
    font-size: 20px;
    color: ${({theme}) => theme.COLORS.INFO};
`