import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './common/ThemedText';
import TaskView from './TaskView';

const CompletedTasks: FC = () => {
	return (
		<View style={{ flex: 1 }}>
			<ThemedText type='subtitle' style={[styles.title]}>
				Completed
			</ThemedText>

			<View style={styles.container}>
				<TaskView category={Categories.DEFAULT} title='Study lesson' date='10:10' value={true} setValue={() => {}} />
				<TaskView category={Categories.GOAL} title='Study lesson' date='10:10' value={true} setValue={() => {}} />
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
