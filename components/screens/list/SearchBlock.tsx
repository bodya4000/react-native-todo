import { Spacing } from '@/constants/Spacing';
import { useStore } from '@/zustand/store';
import { StyleSheet, View } from 'react-native';
import DefaultInput from '../../common/DefaultInput';
import { Colors } from '@/constants/Colors'

const SearchBlock = () => {
	const { searchText, updateText } = useStore();
	return (
		<View style={styles.container}>
			<DefaultInput placeHolder='You can search your task!' value={searchText} onChange={updateText} inputStyle={styles.input} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: Spacing.lg,
		marginBottom: Spacing.md,
	},
	input: {
		borderRadius: 10,
	},
});

export default SearchBlock;
