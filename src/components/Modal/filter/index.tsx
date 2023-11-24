import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as S from "./styles";

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
}

const Filter = forwardRef<BottomSheetModal, Props>((props, ref) => {
  const [data, setData] = useState<DataProps>({} as DataProps);

  const snapPoints = ["95%"];
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@storage_Key");
        console.log('Data from storage:', jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : {};
      } catch (e) {
        console.log(e);
      }
    };
  
    fetchData().then((data) => {
      console.log('Fetched data:', data);
      if (data) {
        console.log('Data for idField:', data);
        setData(data);
      }
    });
  }, []);
  
  

  const handleFilter = async (dataIndex: string, ccIndex: number) => {
    const prevData = data ? JSON.parse(JSON.stringify(data)) : {};

    if (Array.isArray(prevData[dataIndex])) {
      prevData[dataIndex][ccIndex].activate =
        !prevData[dataIndex][ccIndex].activate;
    }
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(prevData));
    setData(prevData);
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <S.Container>
        <S.containerHeadline>{props.title}</S.containerHeadline>
        <S.contentContainer>
          {Object.keys(data).map((key) => {
            if (key === props.idField && Array.isArray(data[key])) {
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
