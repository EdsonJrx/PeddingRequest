
import * as S from './styles'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

export function Chip ({id, qtd, text, visible, shwModal}:S.ChipProps) {
    
    let [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
    });
    
    if (!fontsLoaded && !fontError) {
    return null;
    }
    return (
        <S.TextArea qtd={qtd[id] }onPress={()=>{shwModal()}}>
            <S.Text qtd={qtd[id]}>{text}</S.Text>
            {visible?
                <S.Icon name='caret-down' />
            :null}
        </S.TextArea>
    )
}
