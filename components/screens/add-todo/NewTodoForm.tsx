import ToastService from '@/api/services/ToastService';
import { todoService } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { Spacing } from '@/constants/Spacing';
import { useNavigation } from 'expo-router';
import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import KeyboardContainer from '../../common/KeyboardContainer';
import PrimaryButton from '../../common/PrimaryButton';
import CategorySelector from './CategorySelector';
import DatePickInputContainer from './DatePickInputContainer';
import NotesInput from './NotesInput';
import TitleInput from './TitleInput';

export interface FormValues {
	name: string;
	category: Categories | undefined;
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
		defaultValues: { name: '', date: undefined, notes: '', category: undefined },
	});
	watch('category');

	const { goBack } = useNavigation();

	const onSubmit = useCallback(
		async (data: FormValues) => {			
			await todoService.saveTodo({ title: data.name, categories: data.category ?? Categories.DEFAULT, done: false, date: data.date, id: 0 });
			ToastService.success('Success!');
			goBack();
		},
		[goBack]
	);

	return (
		<>
			<KeyboardContainer style={styles.layout}>
				<TitleInput control={control} errors={errors} />
				<CategorySelector selectedCategory={getValues('category')} setCategory={category => setValue('category', category)} />
				<DatePickInputContainer control={control} errors={errors} setValue={setValue} />
				<NotesInput control={control} />
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
	save_button: {
		marginTop: Spacing.md,
		marginBottom: Spacing.sm,
	},
});

export default NewTodoForm;
