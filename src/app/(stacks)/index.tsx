import { StyleSheet, View } from 'react-native';
import { ScreenHeader } from '../../components/screenHeader';
import { List } from '../../components/list';

export default function Home() {

	return (
		<View style={styles.container}>
      		<ScreenHeader />	
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