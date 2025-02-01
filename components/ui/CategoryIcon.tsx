import { Categories } from '@/constants/Categories';
import { FC } from 'react';
import EventIcon from '../ui/EventIcon';
import GoalIcon from '../ui/GoalIcon';
import TaskIcon from '../ui/TaskIcon';

interface CategoryIconProps {
	category: Categories;
}

const CategoryIcon: FC<CategoryIconProps> = ({ category }) => {
	switch (category) {
		case Categories.DEFAULT:
			return <TaskIcon />;
		case Categories.GOAL:
			return <GoalIcon />;
		case Categories.EVENT:
			return <EventIcon />;
		default:
			return null;
	}
};

export default CategoryIcon;
