
import * as S from './styles'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

export function Chip ({text, visible, shwModal}:S.ChipProps) {
    
    let [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
    });
    
    if (!fontsLoaded && !fontError) {
    return null;
    }
    return (
        <S.TextArea onPress={()=>{shwModal()}}>
            <S.Text>{text}</S.Text>
            {visible?
                <S.Icon name='caret-down' />
            :null}
        </S.TextArea>
    )
}
