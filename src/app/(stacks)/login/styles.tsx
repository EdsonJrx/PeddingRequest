import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
	gap:15px;
    background: ${({ theme }) => theme.COLORS.BACKGROUND};
    padding:20px;
`
export const Logo = styled.Image`
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
`
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