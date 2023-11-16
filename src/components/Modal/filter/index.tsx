import { View, StyleSheet, Text } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import * as S from './styles'
interface Props {
	title: string;
	idField: string
	data: string[]
}
type Ref = BottomSheetModal;

const Filter = forwardRef<Ref, Props>((props, ref) => {
	const snapPoints = useMemo(() => ['95%'], []);

	const renderBackdrop = useCallback(
		(props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);

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
					{props.data.map((item, index) => 
						<S.TextArea>
							<S.Text key={index}>{item}</S.Text>
						</S.TextArea>
						)
					}
				</S.contentContainer>
			</S.Container>
		</BottomSheetModal>
	);
});

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20
	}
});

export default Filter;