import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import DefaultInput from './DefaultInput';
import { FormValues } from './NewTodoForm'

interface TitleInputProps {
	control: Control<FormValues>;
	errors: FieldErrors<{ name: string }>;
}
const TitleInput: FC<TitleInputProps> = ({ control, errors }) => (
	<Controller
		name='name'
		control={control}
		rules={{ required: 'Title is required' }}
		render={({ field: { onChange, value } }) => (
			<View style={styles.titleContainer}>
				<DefaultInput value={value} onChange={onChange} label='Task Title' />
				{errors.name && <ThemedText style={styles.errorText}>{errors.name.message}</ThemedText>}
			</View>
		)}
	/>
);

const styles = StyleSheet.create({
	titleContainer: { marginBottom: Spacing.x2l },
	errorText: {
		color: 'red',
		bottom: -Spacing.lg,
		position: 'absolute',
	},
});

export default TitleInput;
