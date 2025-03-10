import { Colors } from '@/constants/Colors';
import { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { AppText } from './AppText'

interface WhiteCircleButtonProps extends TouchableOpacityProps {
	style?: ViewStyle;
	title?: string;
	content?: ReactNode | string;
}

const WhiteCircleButton: FC<WhiteCircleButtonProps> = ({ content, style, ...rest }) => {
	return (
		<TouchableOpacity {...rest} style={[styles.button, style]}>
			<AppText style={styles.text}>{content}</AppText>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 4,
		backgroundColor: Colors.light.background,
		height: 40,
		width: 40,
		borderRadius: 25,
		position: 'relative',
		top: -5,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {},
});

export default WhiteCircleButton;
