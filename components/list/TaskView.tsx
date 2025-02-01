import ToastService from '@/api/services/ToastService';
import { todoService } from '@/app/_layout';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { ITodo } from '@/types/ITodo';
import DateService from '@/utils/date';
import { debounce } from '@/utils/helpers';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { FC, useCallback, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../common/ThemedText'

interface TaskProps {
	todo: ITodo;
	setValue: (id: number, newStatus: boolean) => void;
}

const TaskView: FC<TaskProps> = ({ todo, setValue }) => {
	const translateX = useRef(new Animated.Value(0)).current;

	const onCheckboxChange = useCallback(() => {
		if (!todo.done) ToastService.success('Done');
		setValue(todo.id, !todo.done);
	}, [todo.id, todo.done]);

	const deleteTodo = () =>
		debounce(() => {
			todoService.deleteTodo(todo.id);
		}, 0);

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponderCapture: () => false,
			onStartShouldSetPanResponder: () => false,
			onMoveShouldSetPanResponder: (_, gestureState) => {
				return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
			},
			onPanResponderMove: (_, gestureState) => {
				if (gestureState.dx > 10) {
					translateX.setValue(gestureState.dx);
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				if (gestureState.dx > 140) {
					Animated.spring(translateX, {
						toValue: 600,
						useNativeDriver: true,
					}).start(() => {
						ToastService.info('Task Deleted!');
						deleteTodo()();
					});
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
			<CategoryIcon category={todo.categories} />

			<View style={styles.titles}>
				<ThemedText style={{ textDecorationLine: todo.done ? 'line-through' : 'none' }} type='defaultSemiBold'>
					{todo.title}
				</ThemedText>
				<ThemedText style={{ opacity: 0.6, textDecorationLine: todo.done ? 'line-through' : 'none' }}>{todo.date && DateService.toUIFormat(todo.date)}</ThemedText>
			</View>

			<TouchableOpacity onPress={onCheckboxChange} style={styles.checkbox_container}>
				<MaterialIcons size={32} style={{ color: Colors.light.primary }} name={todo.done ? 'check-box' : 'check-box-outline-blank'} />
			</TouchableOpacity>
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
	checkbox_container: {
		padding: Spacing.sm,
	},
});

export default TaskView;
