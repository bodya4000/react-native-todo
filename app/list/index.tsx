import Header from '@/components/common/Header';
import PrimaryButton from '@/components/common/PrimaryButton';
import CompletedTasks from '@/components/screens/list/CompletedTasks';
import PickCategory from '@/components/screens/list/PickCategory';
import SearchBlock from '@/components/screens/list/SearchBlock';
import Tasks from '@/components/screens/list/Tasks';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import DateService from '@/utils/date'
import { Stack, useRouter } from 'expo-router';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

const List: FC = () => {
	const router = useRouter();

	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<SafeAreaView style={styles.layout}>
				<Header style={styles.headerContainer} title='My Todo List' subtitle={DateService.toUIFormat(new Date())} />
				<View style={styles.contentContainer}>
					<ScrollView contentContainerStyle={styles.content}>
						<PickCategory />
						<SearchBlock />
						<Tasks />
						<CompletedTasks />
						<View style={styles.spacer} />
						<PrimaryButton style={styles.add_new_task__button} text='Add new task' onPress={() => router.push('/add-todo')} />
					</ScrollView>
				</View>
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
	contentContainer: {
		flex: 1,
		marginTop: 160,
		borderRadius: 30,
		overflow: 'hidden',
	},
	content: {
		flexGrow: 1,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		overflow: 'hidden',
		paddingTop: 20,
	},
	spacer: {
		flex: 1,
	},
	add_new_task__button: {
		marginTop: Spacing.lg,
		marginBottom: Spacing.sm,
	},
});

export default List;
