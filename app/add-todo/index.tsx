import { Stack, useNavigation } from 'expo-router';
import { FC } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const AddTodo: FC = () => {
	const { goBack } = useNavigation();
	return (
		<SafeAreaView>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Text>Add todo page</Text>
			<Button onPress={goBack} title='Go back' />
		</SafeAreaView>
	);
};

export default AddTodo;
