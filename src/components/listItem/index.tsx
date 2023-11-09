import { IRequests } from "../../apis/list/types";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import * as S from "./styles";
import { getInicials } from "../../services/getInicials";

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
                    <S.AvatarText>{getInicials(item.USUARIOCRIACAO)}</S.AvatarText>
                </S.AvatarArea>
                <S.UserNameArea>
                    <S.UserName>{item.USUARIOCRIACAO}</S.UserName>
                    <S.CCName>{`${item.CODCCUSTO} ${item.CENTRO_DE_CUSTO}`}</S.CCName>
                </S.UserNameArea>
                <S.Icon  name="ios-ellipsis-vertical"/>
            </S.HeaderArea>
            <S.FooterArea>
                <S.HistArea>
                    <S.HistText numberOfLines={2} ellipsizeMode="tail">{item.HISTORICOCURTO}</S.HistText>
                    <S.TmvArea>
                        <S.FooterTextTmv>{item.CODTMV}</S.FooterTextTmv>
                        <S.FooterTextMov>{item.NUMEROMOV}</S.FooterTextMov>
                        <S.IssueArea>
                            <S.FooterTextIssue>Emissão:</S.FooterTextIssue>
                            <S.FooterTextIssueDate>{item.DATACRIACAO}</S.FooterTextIssueDate>
                        </S.IssueArea>
                    </S.TmvArea>
                </S.HistArea>
                <S.DeliveryDataArea>
                    <S.DeliveryArea>
                        <S.FooterTextDelivery>Entrega</S.FooterTextDelivery>
                        <S.FooterTextDeliveryDate>{item.DATAENTREGA}</S.FooterTextDeliveryDate>
                    </S.DeliveryArea>
                    <S.DueArea>
                        <S.FooterTextDue>Dias de Atrazo:</S.FooterTextDue>
                        <S.FooterTextDueDate>{item.ATRASO}</S.FooterTextDueDate>
                    </S.DueArea>
                </S.DeliveryDataArea>
            </S.FooterArea>
        </S.Container>
    )
}