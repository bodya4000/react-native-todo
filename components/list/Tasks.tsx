import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import TaskView from './TaskView';

const Tasks: FC = () => {
	return (
		<View style={styles.container}>
			<TaskView category={Categories.DEFAULT} title='Study lesson' date='10:10' value={false} setValue={() => {}} />
			<TaskView category={Categories.GOAL} title='Study lesson' date='10:10' value={false} setValue={() => {}} />

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
