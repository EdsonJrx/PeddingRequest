import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { api } from "../../apis/list/config";
import { Separator } from "../listItem/styles";
import { IRequests } from "../../apis/list/types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import FilterList from "../filterList";
import ListItem from "../listItem";
import Filter, { DataProps } from "../Modal/filter";
import FooterList from "../loading";

import * as S from "./styles";
import { ScreenHeader } from "../screenHeader";

import AsyncStorage from '@react-native-async-storage/async-storage';

export function List() {
  const ROOT =
    "framework/v1/consultaSQLServer/RealizaConsulta/API.1.2/0/G?parameters=";
  const ROWS = 10;
  const USUARIO = "edson.junior";

  const [data, setData] = useState<IRequests[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [idTitle, setIdTitle] = useState("");
  const [idField, setIdField] = useState("");
  const [list, setList] = useState<string[]>([]);

  const [dataStructure, setDataStructure] = useState<DataProps[]>([]);

  const storeData = async (value:string) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  


  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = (title: string, field: string) => {
    setIdTitle(title);
    setIdField(field);
    FilterListItem(data, field);
    handleButtonPress(field)
    bottomSheetRef.current?.present();
  };


  const handleButtonPress = async (field: string) => {
    const filteredData = [...new Set(data
      .map((obj) => obj[field as keyof IRequests])
      .filter((value): value is string => typeof value === "string"))];
  
    // Inicialize prevDataStructure com um valor padrão se for null ou undefined
    const prevDataStructure = JSON.parse(await AsyncStorage.getItem('@storage_Key')) || [];
  
    const existingDataIndex = prevDataStructure.findIndex(item => Object.keys(item)[0] === field);
    if (existingDataIndex !== -1) {
      // Se os dados já existem, atualize-os
      const updatedDataStructure = [...prevDataStructure];
      const existingData = updatedDataStructure[existingDataIndex][field];
      const updatedFieldData = [...new Set([...existingData.map(item => item.name), ...filteredData])].map(name => ({ name, activate: false }));
      updatedDataStructure[existingDataIndex] = { [field]: updatedFieldData };
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(updatedDataStructure));
    } else {
      // Se os dados não existem, adicione-os
      await AsyncStorage.setItem('@storage_Key', JSON.stringify([...prevDataStructure, { [field]: filteredData.map(name => ({ name, activate: false })) }]));
    }
  };
  
  // useEffect(() => {
  //   console.log(JSON.stringify(dataStructure, null, 2));
  // }, [idField]);

  const FilterListItem = (data: IRequests[], field: string) => {
    setList([
      ...new Set(
        data.map((obj) => {
          const value = obj[field as keyof IRequests];
          return typeof value === "string" ? value : "";
        })
      ),
    ]);
  };

  function renderItem({ item }: ListRenderItemInfo<IRequests>) {
    return <ListItem {...item} />;
  }

  useEffect(() => {
    setLoading(true);
    loadApi().then(() => setLoading(false));
  }, []);

  async function loadApi() {
    if (hasError) {
      return;
    }

    try {
      const response = await api.get(
        `${ROOT}PAGE=${page};ROWS=${ROWS};USUARIO=${USUARIO}`
      );
      setData([...data, ...response.data]);
      setPage(page + 1);
    } catch (error: Error | any) {
      if (error.code === "ECONNABORTED") {
        alert("A requisição demorou muito e foi interrompida");
        setHasError(true);
      } else {
        alert(error);
        setHasError(true);
      }
    }
  }
  const onEndReached = () => {
    setLoading(true);
    setHasError(false);
    loadApi()
      .then(() => setLoading(false))
      .catch((e) => {
        alert(e);
        setHasError(true);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setHasError(false);
    setPage(1);
    loadApi()
      .then(() => setRefreshing(false))
      .catch((e) => {
        alert(e);
        setHasError(true);
      });
  };

  return (
    <S.Container>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.IDMOV)}
        ListHeaderComponent={
          <View style={styles.container}>
            <ScreenHeader />
            <FilterList
              shwModal={(id, idField) => handlePresentModalPress(id, idField)}
            />
          </View>
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterList Load={loading} />}
        ItemSeparatorComponent={Separator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Filter
        ref={bottomSheetRef}
        title={idTitle}
        idField={idField}
        data={dataStructure}
      />
    </S.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
