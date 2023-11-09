import { FlatList, ListRenderItemInfo } from "react-native";
import { IRequests } from "../../apis/list/types";
import { ListItem } from "../listItem";
import { View } from "react-native";
import { Separator } from "../listItem/styles";
import { FilterList } from "../filterList";
import { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Filter from "../Modal/filter";
import { useFetch } from "../../apis/list/RequestPending";
import { ActivityIndicator } from "./styles";

export function List () {
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('teste')
    
    const { data, loading } = useFetch<IRequests[]>('framework/v1/consultaSQLServer/RealizaConsulta/API.1.2/0/G?parameters=PAGE='+page+';ROWS=10;USUARIO=edson.junior',page)
    
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    
    function renderItem({ item }:ListRenderItemInfo<IRequests>) {
        return <ListItem {...item} />
    }
	const handlePresentModalPress = (title:string) => {
		bottomSheetRef.current?.present();
		setTitle(title)
	}

    const handleLoadMore = () => {
        if (!loading) {
          setPage(prevPage => prevPage + 1);
          console.log(page)
        }
      };

    return (
        <View style={{width:'100%'}}>
            <FlatList 
                data={data}
                keyExtractor={(item) => String(item.IDMOV)}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<FilterList shwModal={(id) => handlePresentModalPress(id)}/>}
                contentContainerStyle={{ paddingBottom: 60 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1} // Define a porcentagem da altura da lista que o usuário precisa rolar para acionar onEndReached
                ListFooterComponent={loading && <ActivityIndicator />}
            />
            <Filter ref={bottomSheetRef} title={title} />    
        </View>

    )
}