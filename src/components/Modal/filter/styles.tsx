import styled from 'styled-components/native'

export interface IfilterProps{
    active:boolean
}
export const Container = styled.View`
    flex: 1;
    background-color:${({theme})=>theme.COLORS.BACKGROUND};
    padding: 20px;
`

export const containerHeadline = styled.Text`
    align-self:center;
    font-size: 24px;
    font-weight: 600;
`
export const contentContainer = styled.View`
    flex: 1;
    flex-direction:row;
`
export const TextArea = styled.TouchableOpacity<IfilterProps>`
    height:40px;
    flex-direction:row;
    padding: 5px 10px 5px 10px;
    justify-content: center;
    align-items: center;
    margin-right:10px;

    border-radius: 5px;
    border: 1.2px solid;
    border-color: ${({theme,active})=> active ? theme.COLORS.INFO:theme.COLORS.TEXT_SECONDARY };
`
export const Text = styled.Text`
    color: #000;
    text-align: center;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`

