import { todoService } from '@/app/_layout';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import useTodos from '@/hooks/useTodos';
import { useStore } from '@/zustand/store';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import TaskView from './TaskView';
import { AppText } from '@/components/common/AppText'

const CompletedTasks: FC = () => {
	const { searchText, selectedCategory } = useStore();
	const { data } = useTodos({ done: true, searchText, categories: selectedCategory });
	const toggleTodoStatus = (id: number, newStatus: boolean) => {
		todoService.toggleTodoStatus(id, newStatus);
	};
	return (
		<View style={{ flex: 1, backgroundColor: Colors.light.backgroundSecondary }}>
			<AppText type='subtitle' style={[styles.title]}>
				Completed
			</AppText>

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
