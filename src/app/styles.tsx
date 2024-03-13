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
export const Loding = styled.ActivityIndicator`
    color: ${({ theme }) => theme.COLORS.TEXT_PRIMARY};
` 