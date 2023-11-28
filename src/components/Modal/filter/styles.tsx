import styled from 'styled-components/native'

export interface IfilterProps{
    activate:boolean
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
    flex-wrap:wrap;
    justify-content:center;
`
export const TextArea = styled.TouchableOpacity<IfilterProps>`
    height:40px;
    flex-direction:row;
    padding: 5px 10px 5px 10px;
    justify-content: center;
    align-items: center;
    margin-top:10px;
    margin-right:10px;

    border-radius: 5px;
    border: 1.2px solid;
    border-color: ${({theme, activate})=> activate ? theme.COLORS.INFO:theme.COLORS.TEXT_SECONDARY };
`
export const Text = styled.Text`
    color: #000;
    text-align: center;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`
export const Loading = styled.ActivityIndicator`
    size:45px;
    color: #000;
`

