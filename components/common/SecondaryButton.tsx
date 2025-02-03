import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { AppText } from './AppText'

interface SecondaryButtonProps extends TouchableOpacityProps {
	title: string;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ title, ...props }) => {
	return (
		<TouchableOpacity style={styles.button} {...props}>
			<AppText style={styles.button_text}>{title}</AppText>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: Spacing.xs,
		paddingHorizontal: Spacing.xl,
		backgroundColor: Colors.light.background,
		borderWidth: 3,
		borderColor: Colors.light.primary,
		borderRadius: 20,
	},
	button_text: {
		color: Colors.light.primary,
	},
});

export default SecondaryButton;
