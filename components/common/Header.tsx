import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useNavigation } from 'expo-router';
import { FC } from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import WhiteCircleButton from './WhiteCircleButton';

interface HeaderContainerProps {
	subtitle?: string;
	title?: string;
	goBackButton?: boolean;
	style?: ViewStyle;
}

const Header: FC<HeaderContainerProps> = ({ subtitle, title, goBackButton, style }) => {
	const { goBack } = useNavigation();
	return (
		<SafeAreaView style={[styles.header, style]}>
			<View style={styles.container}>
				<SafeAreaView style={styles.top_body}>
					{goBackButton && <WhiteCircleButton onPress={goBack} style={styles.left_button} content={<Image source={require('../../assets/images/left-arrow.png')} />} />}
					{subtitle && (
						<ThemedText style={styles.header_subtitle} type='subtitle' lightColor='#fff' darkColor='#fff'>
							{subtitle}
						</ThemedText>
					)}
				</SafeAreaView>

				{title && (
					<ThemedText style={styles.header_title} type='title' lightColor='#fff' darkColor='#fff'>
						{title}
					</ThemedText>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	header: {
		position: 'relative',
		zIndex: 10000,
		flex: 1,
		backgroundColor: Colors.light.primary,
		paddingTop: StatusBar.currentHeight,
	},
	container: {
		padding: Spacing.md,
	},
	top_body: {
		paddingVertical: Spacing.xs,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	left_button: {
		padding: 10,
		zIndex: 10000,
	},
	header_title: {
		padding: Spacing.sm,
		textAlign: 'center',
		fontSize: 40,
	},
	header_subtitle: {
		flex: 1,
		right: 20,
		textAlign: 'center',
		height: Platform.OS == 'android' ? 40 : 40,
		paddingBottom: Platform.OS == 'android' ? 0 : Spacing.xl,
	},
});

export default Header;
