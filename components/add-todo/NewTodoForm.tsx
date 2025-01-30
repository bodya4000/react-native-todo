import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';
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
			<KeyboardAwareScrollView bottomOffset={62} style={[styles.layout, { marginBottom: 62 }]}>
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
			</KeyboardAwareScrollView>
			<KeyboardToolbar />
			<PrimaryButton style={styles.save_button} text='Save' onPress={() => {}} />
		</>
	);
};

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		margin: Spacing.lg,
		marginBottom: Spacing.md,
	},
	titleContainer: {
		marginBottom: Spacing.lg,
	},
	categories: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Spacing.sm,
		marginBottom: Spacing.lg,
	},
	categories__label: {
		marginRight: Spacing.lg,
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
		marginBottom: Spacing.lg,
	},
	date_input_container: {
		flex: 1,
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
