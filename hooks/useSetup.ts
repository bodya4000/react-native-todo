import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StatusBar as RNStatusBar } from 'react-native';

export const useSetup = () => {
	const [loaded] = useFonts({
		Inter: require('../assets/fonts/Inter.ttf'),
	});

	useEffect(() => {
		if (!loaded) return;

		SplashScreen.hideAsync();

		if (Platform.OS === 'android') {
			RNStatusBar.setBackgroundColor(Colors.light.primary);
		}
	}, [loaded]);

	return loaded;
};
