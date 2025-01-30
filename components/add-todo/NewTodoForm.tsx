import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import PrimaryButton from '../common/PrimaryButton';
import { ThemedText } from '../common/ThemedText';
import EventIcon from '../ui/EventIcon';
import GoalIcon from '../ui/GoalIcon';
import TaskIcon from '../ui/TaskIcon';
import FormInput from './FormInput';

interface FormValues {
	name: string;
	day: string;
	time: string;
	notes: string;
}

const NewTodoForm: FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ defaultValues: { name: '', day: '', time: '', notes: '' } });

	return (
		<>
			<ScrollView contentContainerStyle={styles.layout}>
				<Controller name='name' control={control} render={({ field: { onChange, value } }) => <FormInput containerStyle={styles.titleContainer} label='Task Title' />} />

				<View style={styles.categories}>
					<ThemedText type='subtitle' style={styles.categories__label}>
						Categories
					</ThemedText>

					<TaskIcon style={styles.categories__icon} />
					<EventIcon style={styles.categories__icon} />
					<GoalIcon style={styles.categories__icon} />
				</View>

				<View style={styles.date_container}>
					<Controller name='day' control={control} render={({ field: { onChange, value } }) => <FormInput containerStyle={styles.date_input_container} label='Date' />} />
					<Controller name='time' control={control} render={({ field: { onChange, value } }) => <FormInput containerStyle={styles.date_input_container} label='Time' />} />
				</View>

				<Controller name='notes' control={control} render={({ field: { onChange, value } }) => <FormInput inputStyle={styles.notes} label='Notes' />} />
			</ScrollView>
			<PrimaryButton style={styles.save_button} text='Save' onPress={() => {}} />
		</>
	);
};

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		gap: Spacing.x2l,
		margin: Spacing.lg,
		marginBottom: Spacing.md,
	},
	titleContainer: {
		marginBottom: Spacing.sm,
	},
	categories: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Spacing.sm,
		marginBottom: Spacing.sm,
	},
	categories__label: {
		marginRight: Spacing.md,
	},
	categories__icon: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: Colors.light.background,
	},

	date_container: {
		flexDirection: 'row',
		gap: Spacing.md,
		marginBottom: Spacing.sm,
	},
	date_input_container: {
		flex: 1,
	},

	notes: {
		height: 200,
		textAlignVertical: 'top',
		marginBottom: Spacing.sm,
	},

	save_button: {
		marginBottom: Spacing.xl,
	},
});

export default NewTodoForm;
