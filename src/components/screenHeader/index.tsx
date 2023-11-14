import { Avatar } from '../avatar'
import * as S from './styles'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';


export function ScreenHeader () {
    let [fontsLoaded, fontError] = useFonts({
        Inter_400Regular ,
    });
  
    
    if (!fontsLoaded && !fontError) {
    return null;
    }
    return (
        <S.Container>
            <S.Icon name="menu" />
            <S.TextInput  placeholder='Buscar Requisições'/>
            <Avatar />
        </S.Container>
    )
}