import { ActivityIndicator } from 'react-native';
import * as S from './styles'

const FooterList = ( { Load }:{Load : Boolean} ) => {
    if(!Load) return null;
    return(
        <S.Container>
            <ActivityIndicator size = {25} />
        </S.Container>
    )
}

export default FooterList