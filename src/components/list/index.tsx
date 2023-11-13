import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { api } from '../../apis/list/config';
import { Separator } from '../listItem/styles';
import { IRequests } from '../../apis/list/types';
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import FilterList  from '../filterList';
import ListItem  from '../listItem';
import Filter from '../Modal/filter';
import FooterList from '../loading';

import * as S from './styles'
import { ScreenHeader } from '../screenHeader';

export function List () {

    const H_MAX_HEIGHT = 0;
    const H_MIN_HEIGHT = -60;
    const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

    const scrollOffsetY = useRef(new Animated.Value(0)).current

    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: 'clamp'
    });

    const ROOT = 'framework/v1/consultaSQLServer/RealizaConsulta/API.1.2/0/G?parameters='
    const ROWS= 10
    const USUARIO = 'edson.junior'
 
    const [data, setData] = useState<IRequests[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false); 
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState('')
    
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = (title:string) => {
		bottomSheetRef.current?.present();
		setTitle(title)
	};

    function renderItem({ item }:ListRenderItemInfo<IRequests>) {
        return <ListItem {...item} />
    };

    useEffect(()=>{
        setLoading(true);
        loadApi().then(() => setLoading(false));
    },[]);

    async function loadApi() {
        const response = await api.get(`${ROOT}PAGE=${page};ROWS=${ROWS};USUARIO=${USUARIO}`)

        setData([...data,...response.data])
        setPage(page+1)

    };
    const onEndReached= () => {
        setLoading(true);
        loadApi().then(() => setLoading(false));
    };

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
        loadApi().then(() => setRefreshing(false));
    };

    return (
        <S.Container>
            <Animated.View 
                style={{
                    top:headerScrollHeight,
                    left:0,
                    width:'100%',
                    alignItems:'center',
                    position:'absolute',
                    zIndex:99
                }}
            >
                <ScreenHeader />
            </Animated.View>
            <FlatList style={{paddingTop:-H_MIN_HEIGHT}}
                data={data}
                keyExtractor={ item => String(item.IDMOV)}
                ListHeaderComponent={<FilterList shwModal={(id) => handlePresentModalPress(id)}/>}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={<FooterList Load={loading} />}
                ItemSeparatorComponent={Separator}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollOffsetY }} },
                ], { useNativeDriver: false } )}
                scrollEventThrottle={16}

            />
            <Filter ref={bottomSheetRef} title={title} />
        </S.Container>
    );
};