import { queryClient } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { ITodo } from '@/types/ITodo';
import Checkbox from 'expo-checkbox';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import EventIcon from '../ui/EventIcon';
import GoalIcon from '../ui/GoalIcon';
import TaskIcon from '../ui/TaskIcon';

interface TaskProps {
	todo: ITodo;
	setValue: (id: number, newStatus: boolean) => void;
}

const TaskView: FC<TaskProps> = ({ todo, setValue }) => {
	const onCheckboxChange = () => {
		setValue(todo.id, !todo.done);
		queryClient.invalidateQueries({ queryKey: ['todos', true] });
		queryClient.invalidateQueries({ queryKey: ['todos', false] });
		queryClient.invalidateQueries({ queryKey: ['todos', undefined] });
	};
	return (
		<View style={[styles.container, { opacity: todo.done ? 0.6 : 1 }]}>
			{todo.categories == Categories.DEFAULT && <TaskIcon />}
			{todo.categories == Categories.GOAL && <GoalIcon />}
			{todo.categories == Categories.EVENT && <EventIcon />}

			<View style={styles.titles}>
				<ThemedText style={{ textDecorationLine: todo.done ? 'line-through' : 'none' }} type='defaultSemiBold'>
					{todo.title}
				</ThemedText>
				<ThemedText style={{ opacity: 0.6, textDecorationLine: todo.done ? 'line-through' : 'none' }}>{todo.date}</ThemedText>
			</View>

			<Checkbox color={Colors.dark.primary} style={[styles.checkbox, { backgroundColor: Colors.light.background }]} value={todo.done} onValueChange={onCheckboxChange} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: Spacing.lg,
		backgroundColor: Colors.light.background,
		gap: Spacing.md,
	},
	titles: {
		flex: 1,
	},
	checkbox: {
		borderColor: Colors.dark.primary,
		borderWidth: 1,
		height: 30,
		width: 30,
		borderRadius: 5,
	},
});

export default TaskView;
