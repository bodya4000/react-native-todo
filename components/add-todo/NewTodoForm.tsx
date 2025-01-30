import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, View } from 'react-native';
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
			<View style={styles.container}>
				<Controller name='name' control={control} render={({ field: { onChange, value } }) => <FormInput label='Task Title' />} />

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
			</View>

			<SafeAreaView>
				<PrimaryButton style={{ marginBottom: Spacing.sm }} text='Save' onPress={() => {}} />
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 10,
		gap: Spacing.x2l,
		margin: Spacing.lg,
	},
	categories: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Spacing.md,
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
	},
	date_input_container: {
		flex: 1,
	},

	notes: {
		height:200,
		textAlignVertical:'top'
	},
});

export default NewTodoForm;
