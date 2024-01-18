import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as S from "./styles";
const DATA_ORDER = {
  ORDER: [
    { name: "CODCCUSTO", activate: false },
    { name: "USUARIOCRIACAO", activate: true },
    { name: "NUMEROMOV", activate: false },
    { name: "DATACRIACAO", activate: false },
    { name: "DATAENTREGA", activate: false },
    { name: "CODTMV", activate: false },
  ],
};
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
  callFilter: () => void;
  countActive: () => void;
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
  const [directionOrder, setDirectionOrder] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await getDataFromStorage();
        return jsonValue;
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };
    if (props.idField == "ORDER") {
      setData(DATA_ORDER);
    } else {
      fetchData().then((jsonValue) => {
        if (jsonValue) {
          setData(jsonValue);
        }
      });
    }
  }, [props.idField]);

  const handleFilter = async (dataIndex: string, ccIndex: number) => {
    const prevData = data ? JSON.parse(JSON.stringify(data)) : {};

    if (Array.isArray(prevData[dataIndex])) {
      prevData[dataIndex][ccIndex].activate =
        !prevData[dataIndex][ccIndex].activate;
    }
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(prevData));
    setData(prevData);
    if (typeof props.callFilter === "function") {
      props.callFilter();
    }
  };

  const handleUnselectAllFilter = async (dataIndex: string) => {
    const prevData = data ? JSON.parse(JSON.stringify(data)) : {};

    if (Array.isArray(prevData[dataIndex])) {
      prevData[dataIndex].forEach((item) => {
        item.activate = false;
      });
    }
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(prevData));
    setData(prevData);
    if (typeof props.callFilter === "function") {
      props.callFilter();
    }
  };

  const handleSelectAllFilter = async (dataIndex: string) => {
    const prevData = data ? JSON.parse(JSON.stringify(data)) : {};

    if (Array.isArray(prevData[dataIndex])) {
      prevData[dataIndex].forEach((item) => {
        item.activate = true;
      });
    }
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(prevData));
    setData(prevData);
    if (typeof props.callFilter === "function") {
      props.callFilter();
    }
  };

  const handleOrder = (key: number) => {
    key===0 ? setDirectionOrder(true) : setDirectionOrder(false)
  }

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onDismiss={() => {
        props.countActive();
      }}
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
                  onPress={() =>
                    props.idField != "ORDER" ? handleFilter(key, ccIndex) : null
                  }
                >
                  <S.Text activate={item.activate}>{item.name}</S.Text>
                </S.TextArea>
              ));
            }
          })}
        </S.contentContainer>
        {props.idField == "ORDER" && (
          <S.containerHeadline>Direção:</S.containerHeadline>
        )}
        {props.idField == "ORDER" && (
          <S.contentContainer>
            <S.TextArea
              activate={directionOrder}
              onPress={() =>
                props.idField == "ORDER" ? handleOrder(0) : null
              }
            >
              <S.Text activate={directionOrder}>ASC</S.Text>
            </S.TextArea>
            <S.TextArea
              activate={!directionOrder}
              onPress={() =>
                props.idField == "ORDER" ? handleOrder(1) : null
              }
            >
              <S.Text activate={!directionOrder}>DESC</S.Text>
            </S.TextArea>
          </S.contentContainer>
        )}
        {props.idField != "ORDER" && (
          <S.FooterTextArea>
            <S.FooterText onPress={() => handleSelectAllFilter(props.idField)}>
              Selecionar todos
            </S.FooterText>
            <S.FooterText
              onPress={() => handleUnselectAllFilter(props.idField)}
            >
              Limpar todos
            </S.FooterText>
          </S.FooterTextArea>
        )}
      </S.Container>
    </BottomSheetModal>
  );
});

export default Filter;
