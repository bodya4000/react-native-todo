import { todoService } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import QueryClientService from '@/services/QueryClientService';
import { ITodo } from '@/types/ITodo';
import DateService from '@/utils/date';
import { debounce } from '@/utils/helpers';
import Checkbox from 'expo-checkbox';
import React, { FC, useCallback, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import EventIcon from '../ui/EventIcon';
import GoalIcon from '../ui/GoalIcon';
import TaskIcon from '../ui/TaskIcon';

interface TaskProps {
	todo: ITodo;
	setValue: (id: number, newStatus: boolean) => void;
}

const TaskView: FC<TaskProps> = ({ todo, setValue }) => {
	const translateX = useRef(new Animated.Value(0)).current;

	const onCheckboxChange = useCallback(() => {
		setValue(todo.id, !todo.done);
		QueryClientService.invalidateTodos();
	}, [todo.id, todo.done]);

	const deleteTodo = () =>
		debounce(() => {
			todoService.deleteTodo(todo.id);
			QueryClientService.invalidateTodos();
		});

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (_, gestureState) => {
				if (gestureState.dx > 10) {
					translateX.setValue(gestureState.dx);
					if (gestureState.dx > 140) deleteTodo()();
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				console.log(gestureState.dx);
				if (gestureState.dx > 140) {
					Animated.spring(translateX, {
						toValue: 600,
						useNativeDriver: true,
					}).start();
				} else {
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;

	return (
		<Animated.View {...panResponder.panHandlers} style={[styles.container, { opacity: todo.done ? 0.6 : 1, transform: [{ translateX }] }]}>
			{todo.categories === Categories.DEFAULT && <TaskIcon />}
			{todo.categories === Categories.GOAL && <GoalIcon />}
			{todo.categories === Categories.EVENT && <EventIcon />}

			<View style={styles.titles}>
				<ThemedText style={{ textDecorationLine: todo.done ? 'line-through' : 'none' }} type='defaultSemiBold'>
					{todo.title}
				</ThemedText>
				<ThemedText style={{ opacity: 0.6, textDecorationLine: todo.done ? 'line-through' : 'none' }}>{todo.date && DateService.toUIFormat(todo.date)}</ThemedText>
			</View>

			<Checkbox color={Colors.dark.primary} style={[styles.checkbox, { backgroundColor: Colors.light.background }]} value={todo.done} onValueChange={onCheckboxChange} />
		</Animated.View>
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
