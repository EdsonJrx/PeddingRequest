import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as S from "./styles";
import FooterList from "../../loading";
import { View } from "react-native";

interface Item {
  name: string;
  activate: boolean;
}

export interface DataProps {
  [key: string]: Item[];
}

interface Props {
  title: string;
  idField: string;
  callFilter : () => void;
}

type DataItem = {
  name: string;
  activate: boolean;
};

type DataStructure = {
  [key: string]: DataItem[];
};

const Filter = forwardRef<BottomSheetModal, Props>((props, ref) => {
  const [data, setData] = useState<DataProps>({} as DataProps);
  const [isLoading, setIsLoading] = useState(true)

  const snapPoints = ["80%"];
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const getDataFromStorage = async (): Promise<DataStructure> => {
    const data = await AsyncStorage.getItem("@storage_Key");
    return data ? JSON.parse(data) : {};
  };
  const jsonValue = getDataFromStorage();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const jsonValue = await getDataFromStorage();
        console.log('oi',jsonValue)
        return jsonValue;
      } catch (e) {
        console.log('Error fetching data:', e);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData().then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [props.title]);

  const handleFilter = async (dataIndex: string, ccIndex: number) => {
    const prevData = data ? JSON.parse(JSON.stringify(data)) : {};

    if (Array.isArray(prevData[dataIndex])) {
      prevData[dataIndex][ccIndex].activate =
        !prevData[dataIndex][ccIndex].activate;
    }
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(prevData));
    setData(prevData);
    if (typeof props.callFilter === 'function') {
      props.callFilter();
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      
        <S.Container>
          <S.containerHeadline>{props.title}{props.idField}</S.containerHeadline>
          <FooterList Load={isLoading}/>
          <S.contentContainer>
            {Object.keys(data).map((key) => {
              if (key == props.idField && Array.isArray(data[key])) {
                return data[key].map((item, ccIndex) => (
                  <S.TextArea
                    key={`${key}-${ccIndex}`}
                    activate={item.activate}
                    onPress={() => handleFilter(key, ccIndex)}
                  >
                    <S.Text>{item.name}</S.Text>
                  </S.TextArea>
                ));
              }
            })}
          </S.contentContainer>
        </S.Container>
    </BottomSheetModal>
  );
});

export default Filter;
