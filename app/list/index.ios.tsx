import Header from '@/components/common/Header';
import PrimaryButton from '@/components/common/PrimaryButton';
import CompletedTasks from '@/components/screens/list/CompletedTasks';
import PickCategory from '@/components/screens/list/PickCategory';
import SearchBlock from '@/components/screens/list/SearchBlock';
import Tasks from '@/components/screens/list/Tasks';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Stack, useRouter } from 'expo-router';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

const List: FC = () => {
	const router = useRouter();
	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<SafeAreaView style={styles.layout}>
				<Header style={styles.headerContainer} title='My Todo List' subtitle='October 20, 2022' />
				<ScrollView contentContainerStyle={styles.content}>
					<PickCategory />
					<SearchBlock />
					<Tasks />
					<CompletedTasks />
				</ScrollView>
				<PrimaryButton style={styles.add_new_task__button} text='Add new task' onPress={() => router.push('/add-todo')} />
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	layout: {
		backgroundColor: Colors.light.backgroundSecondary,
		flex: 1,
	},
	headerContainer: {
		height: 300,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 0,
	},
	content: {
		flex: 1,
		zIndex: 10000,
		paddingBottom: Spacing.sm + 150,
		position: 'absolute',
		top: 160,
		width: '100%',
		overflow: 'hidden',
	},
	add_new_task__button: {
		marginTop: Spacing.lg,
	},
});

export default List;
