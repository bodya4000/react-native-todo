import { Colors } from '@/constants/Colors';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const Header: FC = () => {
	return <View style={styles.container}>Header</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: Colors.light.primary,
	},
});

export default Header;
