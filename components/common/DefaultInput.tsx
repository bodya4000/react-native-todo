import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

interface FormInputProps {
	value: string;
	onChange: (value: string) => void;

	label?: string;
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
	placeHolder: string;
}

const DefaultInput: FC<FormInputProps> = ({ value, onChange, label, containerStyle, inputStyle, placeHolder }) => {
	const handleChange = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
		onChange(data.nativeEvent.text);
	};

	return (
		<>
			<View style={[styles.container, containerStyle]}>
				{label && (
					<ThemedText type='subtitle' style={styles.label}>
						{label}
					</ThemedText>
				)}
				<TextInput multiline={true} style={[styles.input, inputStyle]} value={value} onChange={handleChange} placeholder={label || placeHolder} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: Spacing.sm,
	},
	label: {},
	input: {
		backgroundColor: Colors.light.background,
		borderWidth: 1,
		borderColor: '#E0E0E0',
		padding: Spacing.md,
		borderRadius: 5,
		fontSize: 20,
	},
});

export default DefaultInput;
