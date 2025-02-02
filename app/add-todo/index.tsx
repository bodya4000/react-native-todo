import Header from '@/components/common/Header';
import NewTodoForm from '@/components/screens/add-todo/NewTodoForm';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const AddTodo: FC = () => {
	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<View style={styles.layout}>
				<Header subtitle='Add New Task' goBackButton style={{ flex: 0.1 }} />
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
