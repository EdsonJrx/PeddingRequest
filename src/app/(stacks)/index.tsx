import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Product from '../../components/Modal/product';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { ScreenHeader } from '../../components/screenHeader';
import { FilterList } from '../../components/filterList';

const data = [
	{'id':1,'text':"Usuário atual",'visible':false},
	{'id':2,'text':"Tipo Movimento",'visible':true},
	{'id':3,'text':"C. Custo",'visible':true},
	{'id':4,'text':"Teste Opcional",'visible':true},
]
export default function Home() {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const handlePresentModalPress = () => bottomSheetRef.current?.present();

  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

	return (
		<View style={styles.container}>
      		<ScreenHeader />
			<FilterList data={data}/>
			<Product ref={bottomSheetRef} />
			<Button title="Present Modal" onPress={handlePresentModalPress} />
      		<Text style={{ fontFamily: 'Inter_900Black', fontSize: 40 }}>Inter Black</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop:15,
	},
	contentContainer: {
		// flex: 1,
		alignItems: 'center'
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20,
		color: '#fff'
	},
	input: {
		marginTop: 8,
		marginHorizontal: 16,
		marginBottom: 10,
		borderRadius: 10,
		fontSize: 16,
		lineHeight: 20,
		padding: 8,
		backgroundColor: 'rgba(151, 151, 151, 0.25)',
		color: '#fff'
	}
});