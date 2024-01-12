import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataStructure } from "./types";

export const getDataFromStorage = async (): Promise<DataStructure> => {
    const data = await AsyncStorage.getItem("@storage_Key");
    return data ? JSON.parse(data) : {};
  };

export const setDataToStorage = async (data: DataStructure): Promise<void> => {
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(data));
  };