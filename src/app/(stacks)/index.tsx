import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Filter from '../../components/Modal/filter';
import { ScreenHeader } from '../../components/screenHeader';
import { FilterList } from '../../components/filterList';
import { List } from '../../components/list';

export default function Home() {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [title, setTitle] = useState('teste')
	
	const handlePresentModalPress = (title:string) => {
		bottomSheetRef.current?.present();
		setTitle(title)
	}
	return (
		<View style={styles.container}>
      		<ScreenHeader />
			<FilterList shwModal={(id) => handlePresentModalPress(id)}/>
			<Filter ref={bottomSheetRef} title={title} />
			<List />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop:15,
		gap:15,
		backgroundColor:'#fff'
	}
});