import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import TaskView from './TaskView';
import { Categories } from '@/constants/Categories'

const Tasks: FC = () => {
	return (
		<View style={styles.container}>
			<TaskView category={Categories.DEFAULT} title='Study lesson' date='10:10' value={false} setValue={() => {}} />
			<TaskView category={Categories.GOAL} title='Study lesson' date='10:10' value={false} setValue={() => {}} />
			<TaskView category={Categories.EVENT} title='Study lesson' date='10:10' value={false} setValue={() => {}} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		zIndex: 100,

		marginTop: -Spacing.x2l - 35,
		marginHorizontal: Spacing.lg,
		gap: 2,

		backgroundColor: Colors.light.backgroundSecondary,
		borderRadius: 20,
		overflow: 'hidden',
	},
});

export default Tasks;
