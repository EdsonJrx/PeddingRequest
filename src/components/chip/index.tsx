import * as S from './styles'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

export function Chip ({text, visible}:S.ChipProps) {
    let [fontsLoaded, fontError] = useFonts({
        Inter_400Regular ,
    });
    
    if (!fontsLoaded && !fontError) {
    return null;
    }
    return (
        <S.TextArea>
            <S.Text>{text}</S.Text>
            <S.Icon name='caret-down' visible={visible}/>
        </S.TextArea>
    )
}
