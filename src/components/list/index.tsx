import React, { useCallback, useEffect, useRef, useState } from "react";
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
import Filter from "../Modal/filter";
import FooterList from "../loading";

import * as S from "./styles";
import { ScreenHeader } from "../screenHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { countActiveItems } from "../../services/countActivate";
import LoadMore from "../loadMore";

type DataItem = {
  name: string;
  activate: boolean;
};

type DataStructure = {
  [key: string]: DataItem[];
};

const ROOT =
  "framework/v1/consultaSQLServer/RealizaConsulta/API.1.2/0/G?parameters=";
const ROWS = 100;
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
  const [searchFilteredItems, setSearchFilteredItems] = useState<IRequests[]>([]);
  const [activeCounts, setActiveCounts] = useState({"CODCCUSTO": 0, "CODTMV": 0});

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = async (title: string, field: string) => {
    setIdTitle(title);
    setIdField(field);
    field != "USER" ? bottomSheetRef.current?.present() : null; 

  }

  const handleButtonPress = useCallback(async (field: string, Items: IRequests[], id:string) => {
    
    const filteredData = [
      ...new Set(
        Items
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
    };

    const updateData = async (field: string, filteredData: string[]) => {
      let data = await getDataFromStorage();
      let existingData = data[field];

      if (existingData) {
        const updatedFieldData: DataItem[] = [
          ...new Set([
            ...existingData.map((item) => item.name),
            ...filteredData,
          ]),
        ].map((name: string) => ({ name, activate: true }));
        data[field] = updatedFieldData;
      } else {
        data[field] = filteredData.map((name: string) => ({
          name,
          activate: true,
        }));
      }

      await setDataToStorage(data).then(() => {
        handlePresentModalPress(id, field);
      });
      
    };
    await updateData(field, filteredData);
  }, [searchFilteredItems]);

  const countActive = async () => {
    const getDataFromStorage = async (): Promise<DataStructure> => {
      const data = await AsyncStorage.getItem("@storage_Key");
      return data ? JSON.parse(data) : {};
    };
    let data1 = await getDataFromStorage();
    setActiveCounts(countActiveItems(data1, ["CODCCUSTO", "CODTMV"]));
  }

  function renderItem({ item }: ListRenderItemInfo<IRequests>) {
    return <ListItem {...item} />;
  }

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const filterData = useCallback(() => {
    setSearchFilteredItems(
      filteredItems.filter((item) => {
        if (item.CODCCUSTO.indexOf(searchText) > -1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [filteredItems, searchText]);

  const filterChip = useCallback(async () => {
    const tListString = await AsyncStorage.getItem("@storage_Key");
    if (tListString !== null) {
      const tList: DataStructure = JSON.parse(tListString);
      setFilteredItems(
        data.filter((item) => {
          for (let key in tList) {
            if (
              key in item &&
              !tList[key].some(
                (f: DataItem) => f.activate && f.name === item[key]
              )
            ) {
              return false;
            }
          }
          return true;
        })
      );
    } else {
      setFilteredItems(data);
    }
  }, [data]);

  useEffect(() => {
    filterData();
  }, [filteredItems, filterData]);

  useEffect(() => {
    filterChip();
  }, [data, filterChip]);

  useEffect(() => {
    //AsyncStorage.removeItem("@storage_Key");
    countActive();
    setLoading(true);
    loadApi().then(() => setLoading(false));
  }, []);
//==================================================================================================================
  const loadApi = useCallback(async () => {
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
      } else {
        alert(error);
      }
      setHasError(true);
    }
  }, [data, page, hasError]);

  const onEndReached = useCallback(() => {
    if (!loading && !hasError) {
      setLoading(true);
      loadApi()
        .then(() => setLoading(false))
        .catch((e) => {
          alert(e);
          setHasError(true);
        });
    }
  }, [loading, hasError, loadApi]);

  const onRefresh = useCallback(() => {
    if (!refreshing && !hasError) {
      setRefreshing(true);
      setPage(1);
      loadApi()
        .then(() => setRefreshing(false))
        .catch((e) => {
          alert(e);
          setHasError(true);
        });
    }
  }, [refreshing, hasError, loadApi]);

  



  return (
    <S.Container>
      <FlatList
        data={searchFilteredItems}
        keyExtractor={(item) => String(item.IDMOV)}
        ListHeaderComponent={
          <View style={styles.container}>
            <ScreenHeader
              searchText={searchText}
              onChangeText={handleSearchChange}
            />
            <FilterList
              countActive={activeCounts}
              shwModal={(id, idField) => handleButtonPress(idField, searchFilteredItems, id)}
            />
          </View>
        }
        
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch = {10}
        disableVirtualization
        //onEndReached={onEndReached}
        //onEndReachedThreshold={0.1}
        ListFooterComponent={() => (<View><FooterList Load={loading}/><LoadMore Load={loading} onEndReached={onEndReached}/></View>)}
        ItemSeparatorComponent={Separator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Filter
        ref={bottomSheetRef}
        title={idTitle}
        idField={idField}
        callFilter={filterChip}
        countActive={countActive}
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
