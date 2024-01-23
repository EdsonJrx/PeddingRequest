import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
	gap:15px;
    background: ${({ theme }) => theme.COLORS.BACKGROUND};
    padding-top:15px;
`
export const Text = styled.Text`
    color: ${({ theme }) => theme.COLORS.INFO};
    font-size: 24px;
`