import NewTodoForm from '@/components/add-todo/NewTodoForm';
import Header from '@/components/common/Header';
import { Stack, useNavigation } from 'expo-router';
import React, { FC } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AddTodo: FC = () => {
	const { goBack } = useNavigation();
	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />

			<View style={styles.layout}>
				<Header subtitle='Add New Task' goBackButton />
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
