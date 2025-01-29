import Header from '@/components/Header';
import { Stack } from 'expo-router';
import { FC } from 'react';
import { View } from 'react-native';

const List: FC = () => {
	return (
		<View>
			<Stack.Screen options={{ headerShown: false }} />
			<Header />
		</View>
	);
};

export default List;
