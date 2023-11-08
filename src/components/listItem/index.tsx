import { IRequests } from "../../apis/list/types";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import * as S from "./styles";

export function ListItem (item:IRequests){
    let [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
    });
    
    if (!fontsLoaded && !fontError) {
    return null;
    }
    
    return(
        <S.Container>
            <S.HeaderArea>
                <S.AvatarArea>
                    <S.AvatarText>EJ</S.AvatarText>
                </S.AvatarArea>
                <S.UserNameArea>
                    <S.UserName>edson.junior</S.UserName>
                    <S.CCName>2.0383 Residencial Millano</S.CCName>
                </S.UserNameArea>
                <S.Icon  name="ios-ellipsis-vertical"/>
            </S.HeaderArea>
            <S.HistArea>
                <S.HistText>Aquisição de insumos para a produção</S.HistText>
            </S.HistArea>
            <S.FooterArea>
                <S.FooterTextTmv>1.1.04</S.FooterTextTmv>
                <S.FooterTextMov>266688</S.FooterTextMov>
                <S.IssueArea>
                    <S.FooterTextIssue>Emissão:</S.FooterTextIssue>
                    <S.FooterTextIssueDate>15 Mai 2023</S.FooterTextIssueDate>
                </S.IssueArea>
                <S.DeliveryDataArea>
                    <S.DeliveryArea>
                        <S.FooterTextDelivery>Entrega</S.FooterTextDelivery>
                        <S.FooterTextDeliveryDate>21 Out 2023</S.FooterTextDeliveryDate>
                    </S.DeliveryArea>
                    <S.DueArea>
                        <S.FooterTextDue>Dias de Atrazo:</S.FooterTextDue>
                        <S.FooterTextDueDate>40</S.FooterTextDueDate>
                    </S.DueArea>
                </S.DeliveryDataArea>
            </S.FooterArea>
        </S.Container>
    )
}