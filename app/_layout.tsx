import TodoDao from '@/api/dao/TodoDao';
import { setupDatabase } from '@/api/db';
import TodosService from '@/api/services/TodoService';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';

const db = openDatabaseSync('todos_db');
const todoDao = new TodoDao(db);
export const todoService = new TodosService(todoDao);

SplashScreen.preventAutoHideAsync();
export const queryClient = new QueryClient();

export default function RootLayout() {
	const [loaded] = useFonts({
		Inter: require('../assets/fonts/Inter.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<>
			<SQLiteProvider databaseName='todos_db' onInit={setupDatabase} useSuspense>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider value={DarkTheme}>
						<KeyboardProvider>
							<Stack>
								<Stack.Screen name='add-todo' options={{ headerShown: false }} />
								<Stack.Screen name='list' options={{ headerShown: false }} />
								<Stack.Screen name='+not-found' />
							</Stack>
						</KeyboardProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</SQLiteProvider>
			<StatusBar style='light' />
		</>
	);
}
