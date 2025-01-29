import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { FC, ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface HeaderContainerProps {
	subtitle?: string;
	title?: string;
	button?: ReactNode;
}

const HeaderContainer: FC<HeaderContainerProps> = ({ subtitle, title, button }) => {
	return (
		<SafeAreaView style={styles.header}>
			<View style={styles.container}>
				<View style={styles.tob_body}>
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
	},
	container: {
		padding: Spacing.md,
	},
	tob_body: {
		marginBottom: Spacing.md,
	},
	header_title: {
		padding: 10,
		textAlign: 'center',
		fontSize: 40,
	},
	header_subtitle: {
		textAlign: 'center',
		paddingBottom: Spacing.xl,
	},
});

export default HeaderContainer;
