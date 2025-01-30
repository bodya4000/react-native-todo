import { queryClient, todoService } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import DateService from '@/utils/date';
import { useNavigation } from 'expo-router';
import React, { FC, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';
import PrimaryButton from '../common/PrimaryButton';
import { ThemedText } from '../common/ThemedText';
import EventIcon from '../ui/EventIcon';
import GoalIcon from '../ui/GoalIcon';
import TaskIcon from '../ui/TaskIcon';
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

	const { goBack } = useNavigation();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [date, setDate] = useState(new Date());

	const handleCategorySelect = useCallback(
		(category: Categories) => {
			setValue('category', category);
		},
		[setValue]
	);

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
			queryClient.invalidateQueries({ queryKey: ['todos', true] });
			queryClient.invalidateQueries({ queryKey: ['todos', false] });
			queryClient.invalidateQueries({ queryKey: ['todos', undefined] });
			goBack();
		},
		[goBack]
	);

	const selectedCategory = watch('category')

	return (
		<>
			<KeyboardAwareScrollView bottomOffset={62} style={styles.layout}>
				<Controller name='name' control={control} rules={{ required: 'Title is required' }} render={({ field: { onChange, value } }) => <FormInput value={value} onChange={onChange} containerStyle={styles.titleContainer} label='Task Title' />} />
				{errors.name && <ThemedText style={{ color: 'red', top: -20 }}>{errors.name.message}</ThemedText>}

				<View style={styles.categories}>
					<ThemedText type='subtitle' style={styles.categories__label}>
						Categories
					</ThemedText>
					{Object.values(Categories).map(category => (
						<TouchableOpacity key={category} style={styles.category_item} onPress={() => setValue('category', category)}>
							<ThemedText type='defaultSemiBold'>{category}</ThemedText>
							<View style={[styles.categories__icon, getValues('category') === category && styles.picked_category]}>
								{category === Categories.DEFAULT && <TaskIcon />}
								{category === Categories.EVENT && <EventIcon />}
								{category === Categories.GOAL && <GoalIcon />}
							</View>
						</TouchableOpacity>
					))}
				</View>

				<View style={[styles.date_container, { marginBottom: showDatePicker ? Spacing.xs : Spacing.x2l }]}>
					<FormDateInput label='Date & Time' value={getValues('date') ? DateService.toUIFormat(getValues('date')!) : 'Select Date'} onPress={() => setShowDatePicker(true)} containerStyle={{ flex: 1 }} />
				</View>

				{showDatePicker && (
					<View style={styles.pickerContainer}>
						<DatePicker minimumDate={new Date()} mode='datetime' date={date} onDateChange={setDate} />
						<Button title='Pick' onPress={pickDate} />
					</View>
				)}

				<Controller name='notes' control={control} render={({ field: { onChange, value } }) => <FormInput value={value} onChange={onChange} inputStyle={styles.notes} label='Notes' />} />
			</KeyboardAwareScrollView>

			<KeyboardToolbar />
			<PrimaryButton style={styles.save_button} text='Save' onPress={handleSubmit(onSubmit)} />
		</>
	);
};

const styles = StyleSheet.create({
	layout: { flex: 1, margin: Spacing.lg },
	titleContainer: { marginBottom: Spacing.x2l },
	categories: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Spacing.md,
		marginBottom: Spacing.x2l,
	},
	categories__label: { marginRight: Spacing.xl },
	categories__icon: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: Colors.light.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
	category_item: { alignItems: 'center', gap: Spacing.xs },
	picked_category: {
		borderColor: Colors.light.primary,
		width: 65,
		height: 65,
		borderRadius: 40,
		borderWidth: 3,
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
		justifyContent: 'space-between',
		marginVertical: Spacing.sm,
	},
	notes: {
		height: 200,
		textAlignVertical: 'top',
		marginBottom: Spacing.x2l,
	},
	save_button: {
		position: 'absolute',
		bottom: Spacing.xl,
		marginBottom: Spacing.xl,
	},
});

export default NewTodoForm;
