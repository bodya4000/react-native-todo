import { Stack } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView, Text } from 'react-native';

const AddTodo: FC = () => {
	return (
		<SafeAreaView>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Text>Add todo page</Text>
		</SafeAreaView>
	);
};

export default AddTodo;
