import React, { useEffect, useState }from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ListRenderItemInfo } from 'react-native';
import { api } from '../../apis/list/config';
import ListItem  from '../listItem';
import { Separator } from '../listItem/styles';
import { IRequests } from '../../apis/list/types';

export function List () {
 
    const [data, setData] = useState<IRequests[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState(1)

    const ROOT = 'framework/v1/consultaSQLServer/RealizaConsulta/API.1.2/0/G?parameters='
    const ROWS= 10
    const USUARIO = 'edson.junior'

    function renderItem({ item }:ListRenderItemInfo<IRequests>) {
        return <ListItem {...item} />
    }

    useEffect(()=>{
        loadApi();
    },[])

    async function loadApi() {
        if(loading) return;

        setLoading(true);

        const response = await api.get(`${ROOT}PAGE=${page};ROWS=${ROWS};USUARIO=${USUARIO}`)

        setData([...data,...response.data])
        setPage(page+1)
        setLoading(false)

    }

return (
    <View style={styles.container}>
        <FlatList
            data={data}
            keyExtractor={ item => String(item.IDMOV)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={loadApi}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<FooterList Load={loading} />}
            ItemSeparatorComponent={Separator}
        />
    </View>
    );
}

function FooterList( { Load }:{Load : Boolean} ) {
    if(!Load) return null;
    return(
        <View style={styles.loading}>
            <ActivityIndicator size = {25} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        width:'100%',
    },
    listItem:{
        backgroundColor:'#121212',
        padding: 30,
        marginTop: 20,
        borderRadius: 10,
    },
    listText :{
        fontSize: 16,
        color:'#FFF',
    },
    loading :{
        padding:10
    }
})