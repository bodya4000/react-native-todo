import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useNavigation } from 'expo-router';
import { FC } from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import WhiteCircleButton from './WhiteCircleButton';

interface HeaderContainerProps {
	subtitle?: string;
	title?: string;
	goBackButton?: boolean;
}

const Header: FC<HeaderContainerProps> = ({ subtitle, title, goBackButton }) => {
	const { goBack } = useNavigation();
	return (
		<SafeAreaView style={styles.header}>
			<View style={styles.container}>
				<View style={styles.top_body}>
					{goBackButton && <WhiteCircleButton onPress={goBack} style={styles.left_button} content={<Image source={require('../../assets/images/left-arrow.png')} />} />}

					{subtitle && (
						<ThemedText style={styles.header_subtitle} type='subtitle' lightColor='#fff' darkColor='#fff'>
							{subtitle}
						</ThemedText>
					)}
				</View>

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
		zIndex: 0,
		flex: 1,
		backgroundColor: Colors.light.primary,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	container: {
		padding: Spacing.md,
	},
	top_body: {
		marginBottom: Spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	left_button: {
		position: 'absolute',
		left: 0,
	},
	header_title: {
		padding: 10,
		textAlign: 'center',
		fontSize: 40,
	},
	header_subtitle: {
		textAlign: 'center',
		height: Platform.OS == 'android' ? 40 : 'auto',
		paddingBottom: Platform.OS == 'android' ? 0 : Spacing.xl,
	},
});

export default Header;
