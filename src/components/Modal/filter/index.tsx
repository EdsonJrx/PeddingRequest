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
  const [active, setActive] = useState<boolean>(false);

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

  const handleFilter = () => {
    !active ? setActive(true) : setActive(false);
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
          {props.data.map((item, index) => (
            <S.TextArea active={active} onPress={handleFilter}>
              <S.Text key={index}>
                {item}
              </S.Text>
            </S.TextArea>
          ))}
        </S.contentContainer>
      </S.Container>
    </BottomSheetModal>
  );
});

export default Filter;
