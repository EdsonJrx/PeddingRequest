import { IRequests } from "../../apis/list/types";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import * as S from "./styles";
import { getInicials } from "../../services/getInicials";
import { memo } from "react";

const ListItem = memo(function (item:IRequests){
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
                        <S.CCName numberOfLines={2} ellipsizeMode="tail">{`${item.CODCCUSTO} ${item.CENTRO_DE_CUSTO}`}</S.CCName>
                    </S.UserNameArea>
                <S.Icon  name="ios-ellipsis-vertical"/>
            </S.HeaderArea>
            <S.FooterArea>
                <S.HistText numberOfLines={4} ellipsizeMode="tail">{item.HISTORICOCURTO}</S.HistText>
                <S.DeliveryDataArea>
                    <S.TmvArea>
                        <S.FooterTextTmv>{item.CODTMV}</S.FooterTextTmv>
                        <S.FooterTextMov>{item.NUMEROMOV}</S.FooterTextMov>
                    </S.TmvArea>
                    <S.IssueArea>
                        <S.FooterTextIssue>Emissão:</S.FooterTextIssue>
                        <S.FooterTextIssueDate>{item.DATACRIACAO}</S.FooterTextIssueDate>
                    </S.IssueArea>
                    <S.DeliveryArea>
                        <S.FooterTextDelivery>Entrega:</S.FooterTextDelivery>
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
})

export default ListItem