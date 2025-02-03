import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import DefaultInput from '../../common/DefaultInput';
import { FormValues } from './NewTodoForm';

interface NotesInputProps {
	control: Control<FormValues>;
}

const NotesInput: FC<NotesInputProps> = ({ control }) => <Controller name='notes' control={control} render={({ field: { onChange, value } }) => <DefaultInput  inputStyle={styles.notes} value={value} onChange={onChange} label='Notes' />} />;

const styles = StyleSheet.create({
	notes: {
		height: 200,
		textAlignVertical: 'top',
		marginBottom: Spacing.x2l,
	},
});

export default NotesInput;
