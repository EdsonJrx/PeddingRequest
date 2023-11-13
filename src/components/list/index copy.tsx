import { FlatList, ListRenderItemInfo, RefreshControl } from "react-native";
import { IRequests } from "../../apis/list/types";
import { ListItem } from "../listItem";
import { View } from "react-native";
import { Separator } from "../listItem/styles";
import { FilterList } from "../filterList";
import { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Filter from "../Modal/filter";
import { useFetch } from "../../apis/list/RequestPending";
import { ActivityIndicator, Loading } from "./styles";

export function List () {
    const ROOT = 'framework/v1/consultaSQLServer/RealizaConsulta/API.1.2/0/G?parameters='
    const ROWS= 10
    const USUARIO = 'edson.junior'
    
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('teste')
    const [list, setList] = useState([])
    
    const { data, loading } = useFetch<IRequests[]>(`${ROOT}PAGE=${page};ROWS=${ROWS};USUARIO=${USUARIO}`,page)

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
    const onRefresh = () => {
        setPage(1)
        setList([]);
    };

    useEffect(() => {
        setList([...list,...data])
        console.log(list)
    },[page])

    return (
        <View style={{width:'100%'}}>
            <FlatList 
                data={list}
                keyExtractor={(item) => String(item.IDMOV)}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<FilterList shwModal={(id) => handlePresentModalPress(id)}/>}
                contentContainerStyle={{ paddingBottom: 60 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                    loading?
                    <Loading>
                    <ActivityIndicator />
                    </Loading>:
                    null
                }
                refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={onRefresh}
                    />
                  }
            />
            <Filter ref={bottomSheetRef} title={title} />    
        </View>

    )
}