import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { FC } from 'react';
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { ThemedText } from '../common/ThemedText';

interface FormInputProps {
	label?: string;
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
}

const FormInput: FC<FormInputProps> = ({ label, containerStyle, inputStyle }) => {
	return (
		<View style={[styles.container, containerStyle]}>
			{label && (
				<ThemedText type='subtitle' style={styles.label}>
					{label}
				</ThemedText>
			)}
			<TextInput multiline={true} style={[styles.input, inputStyle]} value='' placeholder={label} />
		</View>
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

export default FormInput;
