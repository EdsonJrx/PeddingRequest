import { FlatList, Text} from "react-native";
import { Chip } from "../chip";

type FilterProps = {
	id:number,
	text:string,
	visible:boolean,
}


export function FilterList ({data}) {
    return (
        <FlatList style={{height:10,alignSelf: 'stretch'}}
            data={data} 
            keyExtractor={(item) => String(item.id)} 
            horizontal 
            renderItem={({item}) => <Chip text={item.text} visible={item.visible}/>}
        />
    )
}