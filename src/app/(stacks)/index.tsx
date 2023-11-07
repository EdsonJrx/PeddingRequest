import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Filter from '../../components/Modal/filter';
import { ScreenHeader } from '../../components/screenHeader';
import { FilterList } from '../../components/filterList';

interface ItemProps {
    id: number;
    text: string;
    visible: boolean;
}

const data: ItemProps[] = [
    { id: 1, text: "Usuário atual", visible: false },
    { id: 2, text: "Tipo Movimento", visible: true },
    { id: 3, text: "C. Custo", visible: true },
    { id: 4, text: "Teste Opcional", visible: true },
    { id: 5, text: "Usuário atual", visible: false },
    { id: 6, text: "Tipo Movimento", visible: true },
    { id: 7, text: "C. Custo", visible: true },
    { id: 8, text: "Teste Opcional", visible: true },
];
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
			<FilterList data={data} shwModal={(id) => handlePresentModalPress(id)}/>
			<Filter ref={bottomSheetRef} title={title} />
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