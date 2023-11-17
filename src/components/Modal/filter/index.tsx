import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import * as S from "./styles";
interface Props {
  title: string;
  idField: string;
  data: string[];
}

interface DataProps {
  CC: {
    name: string;
    activate: boolean;
  }[];
  TMV: {
    name: string;
    activate: boolean;
  }[];
}

const DATA: DataProps[] = [
  {
    CC: [
      {
        name: "2.0401",
        activate: true,
      },
      {
        name: "2.0385",
        activate: true,
      },
    ],
    TMV: [
      {
        name: "1.1.04",
        activate: true,
      },
    ],
  },
];

type Ref = BottomSheetModal;

const Filter = forwardRef<Ref, Props>((props, ref) => {
  const [data, setData] = useState<DataProps[]>(DATA);

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

  const handleFilter = (dataIndex:number, ccIndex:number) => {
    setData((prevData) => {
      return prevData.map((item, i) => {
        if (i === dataIndex) {
          return {
            ...item,
            CC: item.CC.map((ccItem, j) => {
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
            itemData.CC.map((item, ccIndex) => (
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
