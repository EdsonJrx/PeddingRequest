import { FlatList, View, Text, ListRenderItemInfo} from "react-native";
import { Chip } from "../chip";
import { memo } from "react";

interface ItemProps {
    id: number;
    text: string;
    visible: boolean;
}

const DATA: ItemProps[] = [
    { id: 1, text: "Usuário atual", visible: false },
    { id: 2, text: "Tipo Movimento", visible: true },
    { id: 3, text: "Centro de Custo", visible: true },
    { id: 4, text: "Ordenação", visible: true },
];

const FilterList = memo(function ({shwModal}:{shwModal:(id:string)=> void}) {
    function renderItem({ item }:ListRenderItemInfo<ItemProps>) {
        return (
            <Chip 
                text={item.text} 
                visible={item.visible} 
                shwModal={()=>shwModal(item.text)}
            />
        )
    }
    return (
        <View  style={{ gap:10, alignItems:'flex-end' }}>
            <FlatList 
                data={DATA} 
                keyExtractor={(item) => String(item.id)} 
                horizontal 
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft:15}}
                contentContainerStyle={{paddingRight:20}}
                //decelerationRate={100}
                />
            
            {true && <Text style = {{paddingRight:20, color:'#03281B'}}>Limpar Filtros</Text>
            }
        </View>
    )
});

export default FilterList