import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import React from 'react';
import { AppText } from '@/components/common/AppText'

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View style={styles.container}>
				<AppText type='title'>This screen doesn't exist.</AppText>
				<Link href={'/list'} style={styles.link}>
					<AppText type='link'>Go to home screen!</AppText>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
