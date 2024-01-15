import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataStructure } from "./types";
  
  export const countActiveItems = async (data: DataStructure, categories: string[]): {[key: string]: number} => {
    const getDataFromStorage1 = async () => {
      const data = await AsyncStorage.getItem("@storage_Count");
      return data ? JSON.parse(data) : {};
    };
    let DATA2 = await getDataFromStorage1();
    const result: {[key: string]: number} = {};
    categories.forEach(category => {
      if (data[category]) {
        result[category] = data[category].filter(item => item.activate).length;
      }
    });
    result['USER'] = DATA2['USER']

    const setDataToStorage1 = async (data) => {
      await AsyncStorage.setItem("@storage_Count", JSON.stringify(data));
    };
    await setDataToStorage1(result)


    return result;
  };

  