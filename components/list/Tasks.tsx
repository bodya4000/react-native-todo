import { todoService } from '@/app/_layout';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import useTodos from '@/hooks/useTodos';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import TaskView from './TaskView'

const Tasks: FC = () => {
	const { data } = useTodos({ done: false });
	const toggleTodoStatus = (id: number, newStatus: boolean) => {
		todoService.toggleTodoStatus(id, newStatus);
	};
	return (
		<View style={styles.container}>
			{data?.map(todo => {
				return <TaskView key={todo.id} todo={todo} setValue={(id: number, newStatus: boolean) => toggleTodoStatus(id, newStatus)} />;
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		position: 'relative',
		zIndex: 100,

		marginHorizontal: Spacing.lg,
		gap: 2,

		backgroundColor: Colors.light.backgroundSecondary,
		borderRadius: 20,
	},
});

export default Tasks;
