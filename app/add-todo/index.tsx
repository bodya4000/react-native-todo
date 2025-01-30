import NewTodoForm from '@/components/add-todo/NewTodoForm';
import Header from '@/components/common/Header';
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing';
import { Stack } from 'expo-router';
import React, { FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const AddTodo: FC = () => {
	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<View style={styles.layout}>
				<Header subtitle='Add New Task' goBackButton style={{ flex: 0, paddingBottom: Spacing.lg, height: Platform.OS == 'ios' ? 125 : 100 }} />
				<NewTodoForm />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	layout: {
		backgroundColor: Colors.light.backgroundSecondary,
		flex: 1,
	},
});

export default AddTodo;
