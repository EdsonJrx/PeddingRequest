import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'; 

export const Container = styled.TouchableOpacity`
    flex:1;
    padding:  5px 15px 5px 15px;
    flex-direction: column;
    align-items: center;

`
export const AvatarArea = styled.View`
    width: 50px;
    height: 50px;
    padding: 10px;
    justify-content: center;
    align-items: center;

    border-radius: 25px;
    background: #00D1FF;
`
export const AvatarText = styled.Text`
    color: #FFF;
    text-align: center;
    font-family: 'Inter_400Regular';
    font-size: 18px;
    font-weight: bold;
`
export const HeaderArea = styled.View`
    flex-direction:row;
    align-items: center;
    gap: 10px;
`
export const UserNameArea = styled.View`
    flex:1;
    flex-direction: column;
    align-items: flex-start;
`
export const UserName = styled.Text`
    color: #1E1E1E;
    font-family: 'Inter_400Regular';
    font-size: 14px;
    font-weight: bold;
`   
export const CCName = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
    font-weight: 700;
`
export const Icon = styled(Ionicons)`
    color: #1E1E1E;
    font-size: 16px;
    align-self:flex-start;
`
export const HistArea = styled.View`
    flex:1;
`
export const HistText = styled.Text`
    color: #1E1E1E;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`
export const FooterArea = styled.View`
    flex:1;
    flex-direction: row;
    gap:10px;
    align-items:flex-end;
`
export const TmvArea = styled.View`
    flex:1;
    flex-direction: row;
    gap:10px;
    align-items:flex-end;
`
export const FooterTextTmv = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
    font-weight: 700;
`
export const FooterTextMov = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
    font-weight: 700;
`
export const IssueArea = styled.View`
    flex:1;
    flex-direction:row;
    gap:5px;
`
export const FooterTextIssue = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`
export const FooterTextIssueDate = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
    font-weight: 700;
`
export const DeliveryDataArea = styled.View`
    flex-direction:column;
    align-items:flex-end;
    gap:10px;
`
export const DeliveryArea = styled.View`
    flex:1;
    flex-direction:column;
    align-items:flex-end;
`
export const FooterTextDelivery = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`
export const FooterTextDeliveryDate = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
    font-weight: 700;
`
export const DueArea = styled.View`
    flex:1;
    flex-direction:row;
    gap:5px;
`
export const FooterTextDue = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
`
export const FooterTextDueDate = styled.Text`
    color: #404040;
    font-family: 'Inter_400Regular';
    font-size: 12px;
    font-weight: 700;
`

export const Separator = styled.View`
    width:100%;
    height:1px;
    background-color:#DDDDDD;
`