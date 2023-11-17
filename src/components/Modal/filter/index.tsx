import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import * as S from "./styles";
interface Props {
  title: string;
  idField: string;
  data: DataProps[];
}

export interface DataProps {
  CODCCUSTO: {
    name: string;
    activate: boolean;
  }[];
  CODTMV: {
    name: string;
    activate: boolean;
  }[];
}


type Ref = BottomSheetModal;

const Filter = forwardRef<Ref, Props>((props, ref) => {
  const [data, setData] = useState<DataProps[]>(props.data);

  const snapPoints = useMemo(() => ["95%"], []);
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
  useEffect(()=>{console.log(JSON.stringify(props.data, null, 2))},[props.idField])

  const handleFilter = (dataIndex:number, ccIndex:number) => {
    setData((prevData) => {
      return prevData.map((item, i) => {
        if (i === dataIndex) {
          return {
            ...item,
            CODCCUSTO: item.CODCCUSTO.map((ccItem, j) => {
              if (j === ccIndex) {
                return { ...ccItem, activate: !ccItem.activate };
              }
              return ccItem;
            }),
          };
        }
        return item;
      });
    });
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
          {data.map((itemData, dataIndex) =>
            itemData.CODCCUSTO.map((item, ccIndex) => (
              <S.TextArea
                activate={item.activate}
                onPress={() => handleFilter(dataIndex, ccIndex)}
              >
                <S.Text key={ccIndex}>{item.name}</S.Text>
              </S.TextArea>
            ))
          )}
        </S.contentContainer>
      </S.Container>
    </BottomSheetModal>
  );
});

export default Filter;
