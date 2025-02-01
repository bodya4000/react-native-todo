import ToastService from '@/api/services/ToastService';
import { todoService } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import DateService from '@/utils/date';
import { useNavigation } from 'expo-router';
import React, { FC, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import KeyboardContainer from '../common/KeyboardContainer';
import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';
import { ThemedText } from '../common/ThemedText';
import CategoryIcon from '../ui/CategoryIcon';
import FormDateInput from './FormDateInput';
import FormInput from './FormInput';

interface FormValues {
	name: string;
	category: Categories;
	date: Date | undefined;
	notes: string;
}

const NewTodoForm: FC = () => {
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: { name: '', date: undefined, notes: '', category: Categories.DEFAULT },
	});
	watch('category');

	const { goBack } = useNavigation();
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

	const onSubmit = useCallback(
		(data: FormValues) => {
			todoService.saveTodo({ title: data.name, categories: data.category, done: false, date: data.date, id: 0 });
			ToastService.success('Success!');
			goBack();
		},
		[goBack]
	);

	return (
		<>
			<KeyboardContainer style={styles.layout}>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Title is required' }}
					render={({ field: { onChange, value } }) => (
						<View style={styles.titleContainer}>
							<FormInput value={value} onChange={onChange} label='Task Title' />
							{errors.name && <ThemedText style={{ color: 'red', bottom: -Spacing.lg, position: 'absolute' }}>{errors.name.message}</ThemedText>}
						</View>
					)}
				/>

				<View style={styles.categories}>
					<ThemedText type='subtitle' style={styles.categories__label}>
						Categories
					</ThemedText>
					{Object.values(Categories).map(category => (
						<TouchableOpacity key={category} style={styles.category_item} onPress={() => setValue('category', category)}>
							<ThemedText type='defaultSemiBold'>{category}</ThemedText>
							<View style={[styles.categories__icon, getValues('category') === category && styles.picked_category]}>
								<CategoryIcon category={category} />
							</View>
						</TouchableOpacity>
					))}
				</View>

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

				<Controller name='notes' control={control} render={({ field: { onChange, value } }) => <FormInput value={value} onChange={onChange} inputStyle={styles.notes} label='Notes' />} />
			</KeyboardContainer>

			<SafeAreaView>
				<PrimaryButton style={styles.save_button} text='Save' onPress={handleSubmit(onSubmit)} />
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		marginHorizontal: Spacing.md,
		marginTop: Spacing.md,
	},
	titleContainer: { marginBottom: Spacing.x2l },
	categories: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Spacing.md,
		marginBottom: Spacing.x2l,
	},
	categories__label: { marginRight: Spacing.md },
	categories__icon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderWidth: 2,
		borderColor: Colors.light.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
	category_item: { alignItems: 'center', gap: Spacing.xs },
	picked_category: {
		borderColor: Colors.light.primary,
		width: 55,
		height: 55,
		borderRadius: 25,
		borderWidth: 2,
	},
	date_container: {
		flexDirection: 'row',
		gap: Spacing.md,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},
	pickerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	notes: {
		height: 200,
		textAlignVertical: 'top',
		marginBottom: Spacing.x2l,
	},
	save_button: {
		marginTop: Spacing.md,
	},
});

export default NewTodoForm;
