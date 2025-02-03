import { AppText } from '@/components/common/AppText'
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface FormInputProps {
	value: string;
	onChange?: (value: string) => void;
	onPress?: () => void;

	label?: string;
	containerStyle?: ViewStyle;
	inputStyle?: ViewStyle;
}

const FormDateInput: FC<FormInputProps> = ({ value, onPress, label, containerStyle, inputStyle }) => {
	return (
		<View style={[styles.container, containerStyle]}>
			{label && (
				<AppText type='subtitle' style={styles.label}>
					{label}
				</AppText>
			)}
			<TouchableOpacity onPress={onPress} style={[styles.input, inputStyle]} onPressIn={() => {}}>
				<AppText>{value || label || 'Pick time...'}</AppText>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: Spacing.sm,
	},
	label: {},
	input: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: Colors.light.background,
		borderWidth: 1,
		borderColor: '#E0E0E0',
		padding: Spacing.md,
		borderRadius: 5,
		fontSize: 20,
	},
});

export default FormDateInput;
