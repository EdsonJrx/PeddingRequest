
import * as S from './styles'

const LoadMore = ( { Load, onEndReached }:{Load : Boolean, onEndReached : () => void} ) => {
    if(Load) return null;
    return(
        <S.Container onPress={onEndReached}>
            <S.Text>Carregar Mais?</S.Text>
        </S.Container>
    )
}

export default LoadMore