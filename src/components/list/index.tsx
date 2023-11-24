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
import Filter,  {DataProps}  from "../Modal/filter";
import FooterList from "../loading";

import * as S from "./styles";
import { ScreenHeader } from "../screenHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DataItem = {
  name: string;
  activate: boolean;
};

type DataStructure = {
  [key: string]: DataItem[];
};

const ROOT ="framework/v1/consultaSQLServer/RealizaConsulta/API.1.2/0/G?parameters=";
const ROWS = 10;
const USUARIO = "edson.junior";

export function List() {
  const [data, setData] = useState<IRequests[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [idTitle, setIdTitle] = useState("");
  const [idField, setIdField] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<IRequests[]>([]);
  const [dataStructure, setDataStructure] = useState<DataProps[]>([]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = (title: string, field: string) => {
    setIdTitle(title);
    setIdField(field);
    handleButtonPress(field);
    field != 'USER'?bottomSheetRef.current?.present(): null;
  };

  const handleButtonPress = async (field: string) => {

    const filteredData = [
      ...new Set(
        filteredItems
          .map((obj) => obj[field as keyof IRequests])
          .filter((value): value is string => typeof value === "string")
      ),
    ];
    const getDataFromStorage = async (): Promise<DataStructure> => {
      const data = await AsyncStorage.getItem("@storage_Key");
      return data ? JSON.parse(data) : {};
    };
    
    const setDataToStorage = async (data: DataStructure): Promise<void> => {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(data));
      const teste = await AsyncStorage.getItem("@storage_Key");
    };
    
    const updateData = async (field: string, filteredData: string[]) => {
      let data = await getDataFromStorage();
      let existingData = data[field];
    
      if (existingData) {
        const updatedFieldData: DataItem[] = [
          ...new Set([...existingData.map(item => item.name), ...filteredData]),
        ].map((name: string) => ({ name, activate: false }));
    
        data[field] = updatedFieldData;
      } else {
        data[field] = filteredData.map((name: string) => ({ name, activate: false }));
      }
    
      await setDataToStorage(data);
    };
    await updateData(field, filteredData);
  };


  function renderItem({ item }: ListRenderItemInfo<IRequests>) {
    return <ListItem {...item} />;
  }

  const handleSearchChange = (text: string) => {setSearchText(text)};

  const filterData = () => {
    if (searchText === "") {
      setFilteredItems(data);
    } else {
      setFilteredItems(
        data.filter((item) => {
          if (item.CODCCUSTO.indexOf(searchText) > -1) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }
  
  useEffect(()=> {
    filterData()
  },[searchText])

  useEffect(() => {
    AsyncStorage.removeItem('@storage_Key')
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
      filterData()
      
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
        data={filteredItems}
        keyExtractor={(item) => String(item.IDMOV)}
        ListHeaderComponent={
          <View style={styles.container}>
            <ScreenHeader
              searchText={searchText}
              onChangeText={handleSearchChange}
            />
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
