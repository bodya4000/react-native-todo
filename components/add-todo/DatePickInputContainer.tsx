import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import DateService from '@/utils/date';
import React, { useCallback, useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import SecondaryButton from '../common/SecondaryButton';
import { ThemedText } from '../common/ThemedText';
import FormDateInput from './FormDateInput';
import { FormValues } from './NewTodoForm';

interface DatePickerFieldProps {
	control: Control<FormValues>;
	errors: FieldErrors<FormValues>;
	setValue: UseFormSetValue<FormValues>;
}
const DatePickInputContainer: React.FC<DatePickerFieldProps> = ({ control, errors, setValue }) => {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [date, setDate] = useState(new Date());

	const pickDate = useCallback(() => {
		if (date < new Date()) {
			Alert.alert('Error', 'You cannot pick passed date or time');
			return;
		}
		setShowDatePicker(false);
		setValue('date', date);
	}, [date, setValue]);
	return (
		<>
			<Controller
				name='date'
				control={control}
				rules={{ required: 'Date & Time is required' }}
				render={({ field }) => (
					<View style={[styles.date_container, { marginBottom: showDatePicker ? Spacing.xs : Spacing.x2l }]}>
						<FormDateInput label='Date & Time' value={field.value ? DateService.toUIFormat(field.value) : 'Select Date'} onPress={() => setShowDatePicker(value => !value)} containerStyle={{ flex: 1 }} />
						{errors.date && <ThemedText style={{ color: 'red', bottom: -Spacing.lg, left: 0, position: 'absolute' }}>{errors.date.message}</ThemedText>}
					</View>
				)}
			/>

			{showDatePicker && (
				<View style={styles.pickerContainer}>
					<DatePicker dividerColor={Colors.light.primary} minimumDate={new Date()} mode='datetime' date={date} onDateChange={setDate} style={{ marginLeft: -50, flex: 1 }} />
					<SecondaryButton title='Pick' onPress={pickDate} />
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	pickerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	date_container: {
		flexDirection: 'row',
		gap: Spacing.md,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},
	errorText: {
		color: 'red',
		position: 'absolute',
		bottom: -Spacing.lg,
	},
});

export default DatePickInputContainer;
