import { ThemedText } from '@/components/common/ThemedText';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useStore } from '@/zustand/store';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PickCategory = () => {
	const { selectedCategory, setCategory } = useStore();

	return (
		<>
			<View style={styles.container}>
				<ThemedText style={{ fontSize: 16 }} type='subtitle'>
					Pick category here! <Text> 👉</Text>
				</ThemedText>

				<View style={styles.categories}>
					{Object.values(Categories).map(category => (
						<TouchableOpacity key={category} onPress={() => setCategory(category)} style={[selectedCategory === category && styles.pickedCategory]}>
							<CategoryIcon category={category} />
						</TouchableOpacity>
					))}
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: Spacing.lg,
		marginBottom: Spacing.md,
		backgroundColor: Colors.light.background,
		padding: Spacing.xs,
		paddingHorizontal: Spacing.md,
		borderRadius: 10,
	},
	categories: {
		backgroundColor: Colors.light.background,
		flexDirection: 'row',
		alignItems: 'center',
		gap: Spacing.sm,
	},
	pickedCategory: {
		borderColor: Colors.light.primary,
		borderRadius: '50%',
		borderWidth: 2,
	},
});

export default PickCategory;
