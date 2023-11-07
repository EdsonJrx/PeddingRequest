import { View, StyleSheet, Text } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
interface Props {
	title: string;
}
type Ref = BottomSheetModal;

const Product = forwardRef<Ref, Props>((props, ref) => {
	const snapPoints = useMemo(() => ['50%', '75%'], []);

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
			<View style={styles.contentContainer}>
				<Text style={styles.containerHeadline}>{props.title}</Text>
			</View>
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

export default Product;