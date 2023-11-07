import { FlatList, Text, View} from "react-native";
import { Chip } from "../chip";
import { ChipProps } from "../chip/styles";


export function FilterList ({data, shwModal}:{data:ChipProps,shwModal:(id:string)=> void}) {
    return (
        <View  style={{ height: 35 }}>
            <FlatList 
                data={data} 
                keyExtractor={(item) => String(item.id)} 
                horizontal 
                renderItem={({item}) => <Chip text={item.text} visible={item.visible} shwModal={()=>shwModal(item.text)}/>}
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft:15}}
                contentContainerStyle={{paddingRight:20}}
                //decelerationRate={100}
                />
        </View>
    )
}