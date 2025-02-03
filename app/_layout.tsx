import TodoDao from '@/api/dao/TodoDao';
import { setupDatabase } from '@/api/db';
import QueryClientService from '@/api/services/QueryClientService';
import TodosService from '@/api/services/TodoService';
import { useSetup } from '@/hooks/useSetup';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';

const queryClient = new QueryClient();
const db = openDatabaseSync('todos_db');
const todoDao = new TodoDao(db);
export const queryClientService = new QueryClientService(queryClient);
export const todoService = new TodosService(todoDao, queryClientService);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useSetup();
	return (
		<>
			<ToastManager duration={1500} showProgressBar={false} />
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
