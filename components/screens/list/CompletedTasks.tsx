import { todoService } from '@/app/_layout';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import useTodos from '@/hooks/useTodos';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../common/ThemedText';
import TaskView from './TaskView';
import { useStore } from '@/zustand/store'

const CompletedTasks: FC = () => {
	const { searchText } = useStore();
	const { data } = useTodos({ done: true, searchText});
	const toggleTodoStatus = (id: number, newStatus: boolean) => {
		todoService.toggleTodoStatus(id, newStatus);
	};
	return (
		<View style={{ flex: 1, backgroundColor: Colors.light.backgroundSecondary }}>
			<ThemedText type='subtitle' style={[styles.title]}>
				Completed
			</ThemedText>

			<View style={styles.container}>
				{data?.map(todo => {
					return <TaskView key={todo.id} todo={todo} setValue={(id: number, newStatus: boolean) => toggleTodoStatus(id, newStatus)} />;
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		marginVertical: Spacing.lg,
		marginHorizontal: Spacing.lg,
	},
	container: {
		position: 'relative',
		zIndex: 100,
		marginHorizontal: Spacing.lg,
		gap: 2,
		backgroundColor: Colors.light.backgroundSecondary,
		borderRadius: 20,
		overflow: 'hidden',
	},
});

export default CompletedTasks;
