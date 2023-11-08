import { FlatList, ListRenderItemInfo } from "react-native";
import { IRequests } from "../../apis/list/types";
import { DATA } from "../../apis/list/Seed";
import { ListItem } from "../listItem";
import { View } from "react-native";
import { Separator } from "../listItem/styles";

export function List () {
    function renderItem({ item }:ListRenderItemInfo<IRequests>) {
        return <ListItem {...item} />
    }
    return (
        <View style={{width:'100%'}}>
            <FlatList 
                data={DATA}
                keyExtractor={(item) => String(item.IDMOV)}
                renderItem={renderItem}
                contentContainerStyle={{paddingBottom:200}}
                ItemSeparatorComponent={Separator}
                //ListHeaderComponent={Hearder}
                />    
        </View>
    )
}