import { FlatList, View, Text, ListRenderItemInfo, TouchableOpacity} from "react-native";
import { Chip } from "../chip";
import { memo } from "react";

interface ItemProps {
    id: number;
    text: string;
    idField:string;
    visible: boolean;
}

const DATA: ItemProps[] = [
    { id: 1, text: "Usuário atual", idField:"", visible: false },
    { id: 2, text: "Tipo Movimento", idField:"CODTMV", visible: true },
    { id: 3, text: "Centro de Custo", idField:"CODCCUSTO", visible: true },
    { id: 4, text: "Ordenação", idField:"", visible: true },
];

const FilterList = memo(function ({shwModal}:{shwModal:(title:string,idFIeld:string)=> void}) {
    function renderItem({ item }:ListRenderItemInfo<ItemProps>) {
        return (
            <Chip 
                text={item.text} 
                visible={item.visible} 
                shwModal={()=>shwModal(item.text,item.idField)}
            />
        )
    }
    return (
        <View  style={{ gap:10, alignItems:'flex-end', flex:1 }}>
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
            { true &&
                <TouchableOpacity>
                    <Text style={{paddingRight:20}}>Limpar Filtro</Text>
                </TouchableOpacity>
            }
        </View>
    )
});

export default FilterList