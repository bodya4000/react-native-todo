import Header from '@/components/common/Header';
import PrimaryButton from '@/components/common/PrimaryButton';
import CompletedTasks from '@/components/CompletedTasks';
import Tasks from '@/components/Tasks';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Stack, useRouter } from 'expo-router';
import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const List: FC = () => {
	const router = useRouter();
	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<View style={styles.layout}>
				<Header title='My Todo List' subtitle='October 20, 2022' />

				<SafeAreaView style={{ flex: 2.5 }}>
					<Tasks />
					<CompletedTasks />
					<PrimaryButton style={styles.add_new_task__button} text='Add new task' onPress={() => router.push('/add-todo')} />
				</SafeAreaView>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	layout: {
		backgroundColor: Colors.light.backgroundSecondary,
		flex: 1,
	},
	add_new_task__button: {
		marginBottom: Spacing.sm,
	},
});

export default List;
