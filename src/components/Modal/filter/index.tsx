import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as S from "./styles";

interface Item {
  name: string;
  activate: boolean;
}

interface DataProps {
  CODCCUSTO: Item[];
  CODTMV: Item[];
}

interface Props {
  title: string;
  idField: keyof DataProps;
  data: DataProps[];
}

const Filter = forwardRef<BottomSheetModal, Props>((props, ref) => {
  const [data, setData] = useState<DataProps[]>(props.data);

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
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    };

    fetchData().then((data) => {
      if (data !== null) {
        setData(data);
      }
    });
  }, []);

  const handleFilter = async (
    dataIndex: number,
    ccIndex: number,
    idField: keyof DataProps
  ) => {

    const prevData = data ? JSON.parse(JSON.stringify(data)) : [];

    prevData[dataIndex][idField][ccIndex].activate = !prevData[dataIndex][idField][ccIndex].activate;

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
          {data &&
            data.map(
              (itemData, dataIndex) =>
                itemData[props.idField] &&
                itemData[props.idField].map((item, ccIndex) => (
                  <S.TextArea
                    key={`${dataIndex}-${ccIndex}`}
                    activate={item.activate}
                    onPress={() =>
                      handleFilter(dataIndex, ccIndex, props.idField)
                    }
                  >
                    <S.Text>{item.name}</S.Text>
                  </S.TextArea>
                ))
            )}
        </S.contentContainer>
      </S.Container>
    </BottomSheetModal>
  );
});

export default Filter;
