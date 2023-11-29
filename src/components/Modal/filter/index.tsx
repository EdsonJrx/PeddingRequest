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
      try {
        const jsonValue = await getDataFromStorage();
        return jsonValue;
      } catch (e) {
        console.log('Error fetching data:', e);
      }
    };
  
    fetchData().then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [props.idField]);

  const handleFilter = async (dataIndex: string, ccIndex: number) => {
    const prevData = data ? JSON.parse(JSON.stringify(data)) : {};
    console.log(ccIndex)

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

  const handleAllFilter = async (dataIndex: string) => {
    const prevData = data ? JSON.parse(JSON.stringify(data)) : {};

    if (Array.isArray(prevData[dataIndex])) {
      prevData[dataIndex].forEach(item => {
        item.activate = false;
      });
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
          <S.containerHeadline>{props.title}</S.containerHeadline>
          <S.contentContainer>
            {Object.keys(data).map((key) => {
              if (key == props.idField && Array.isArray(data[key])) {
                return data[key].map((item, ccIndex) => (
                  <S.TextArea
                    key={`${key}-${ccIndex}`}
                    activate={item.activate}
                    onPress={() => handleFilter(key, ccIndex)}
                  >
                    <S.Text activate={item.activate}>{item.name}</S.Text>
                  </S.TextArea>
                ));
              }
            })}
          </S.contentContainer>
          <S.FooterTextArea>
            <S.FooterText onPress={() => handleAllFilter(props.idField)} >Limpar todos</S.FooterText>
          </S.FooterTextArea>
        </S.Container>
    </BottomSheetModal>
  );
});

export default Filter;
