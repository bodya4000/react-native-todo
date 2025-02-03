import { Categories } from '@/constants/Categories';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CategoryIcon from '../../ui/CategoryIcon';
import { AppText } from '@/components/common/AppText'

interface CategorySelectorProps {
	selectedCategory: Categories | undefined;
	setCategory: (category: Categories) => void;
}
const CategorySelector: FC<CategorySelectorProps> = ({ selectedCategory, setCategory }) => (
	<View style={styles.categories}>
		<AppText type='subtitle' style={styles.label}>
			Categories
		</AppText>
		{Object.values(Categories).map(category => (
			<TouchableOpacity key={category} style={styles.categoryItem} onPress={() => setCategory(category)}>
				<AppText type='defaultSemiBold'>{category == Categories.DEFAULT ? 'TASK' : category}</AppText>
				<View style={[styles.categoryIcon, selectedCategory === category && styles.pickedCategory]}>
					<CategoryIcon category={category} />
				</View>
			</TouchableOpacity>
		))}
	</View>
);

const styles = StyleSheet.create({
	categories: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Spacing.md,
		marginBottom: Spacing.x2l,
	},
	label: { marginRight: Spacing.md },
	categoryItem: { alignItems: 'center', gap: Spacing.xs },
	categoryIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pickedCategory: {
		borderColor: Colors.light.primary,
		borderWidth: 27,
	},
});

export default CategorySelector;
