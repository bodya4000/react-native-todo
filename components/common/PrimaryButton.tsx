import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { FC } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

interface PrimaryButtonProps {
	text: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, onPress, style }) => {
	return (
		<TouchableOpacity style={[styles.button, style ? style : {}]} onPress={onPress}>
			<ThemedText type='defaultSemiBold' style={styles.text}>
				{text}
			</ThemedText>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		backgroundColor: Colors.light.primary,
		paddingVertical: Spacing.md,
		marginHorizontal: Spacing.x2l,
		borderRadius: 30,
	},
	text: {
		flex: 1,
		textAlign: 'center',
		color: '#fff',
	},
});

export default PrimaryButton;
