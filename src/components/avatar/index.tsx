import * as S from "./styles";
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';

export function Avatar() {

    let [fontsLoaded, fontError] = useFonts({
        Inter_700Bold,
    });
    
    if (!fontsLoaded && !fontError) {
    return null;
    }
    return (
        <S.Container>
            <S.Text>EJ</S.Text>
        </S.Container>
    )
}