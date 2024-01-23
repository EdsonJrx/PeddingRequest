import styled from "styled-components/native"

export const TextButton = styled.Text`
    color: ${({ theme }) => theme.COLORS.TEXT_PRIMARY};
    font-size: 24px;
`
export const Button = styled.TouchableOpacity`
    background: ${({ theme }) => theme.COLORS.INFO};
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    align-items: center;
    justify-content: center;
`
export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.COLORS.TEXT_PRIMARY,
  }))`
    size: 'large';
  `