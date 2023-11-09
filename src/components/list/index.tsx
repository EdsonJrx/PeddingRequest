import { FlatList, ListRenderItemInfo } from "react-native";
import { IRequests } from "../../apis/list/types";
import { DATA } from "../../apis/list/Seed";
import { ListItem } from "../listItem";
import { View } from "react-native";
import { Separator } from "../listItem/styles";
import { FilterList } from "../filterList";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Filter from "../Modal/filter";

export function List () {
    function renderItem({ item }:ListRenderItemInfo<IRequests>) {
        return <ListItem {...item} />
    }

    const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [title, setTitle] = useState('teste')
	
	const handlePresentModalPress = (title:string) => {
		bottomSheetRef.current?.present();
		setTitle(title)
	}
    return (
        <View style={{width:'100%'}}>
            <FlatList 
                data={DATA}
                keyExtractor={(item) => String(item.IDMOV)}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<FilterList shwModal={(id) => handlePresentModalPress(id)}/>}
                contentContainerStyle={{ paddingBottom: 60 }}
            />
            <Filter ref={bottomSheetRef} title={title} />    
        </View>

    )
}