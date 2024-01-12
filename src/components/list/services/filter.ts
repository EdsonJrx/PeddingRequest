import { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataItem, DataStructure } from '../../../services/types';


export const useFilterData = (filteredItems: any[], searchText: string) => {
  const [searchFilteredItems, setSearchFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    if (searchText == '') {
        setSearchFilteredItems(filteredItems)
    } else{
        setSearchFilteredItems(
          filteredItems.filter((item) => {
            if (item.CODCCUSTO.indexOf(searchText) > -1) {
              return true;
            } else {
              return false;
            }
          })
        );  
    }
  }, [filteredItems, searchText]);

  return searchFilteredItems;
};

export const useFilterChip = (data: any[]) => {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
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
      };
      fetchData();
    }, [data]);
  
    return filteredItems;
  };
  
