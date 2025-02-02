import { Categories } from '@/constants/Categories';
import { ComponentProps, FC } from 'react';
import EventIcon from '../ui/EventIcon';
import GoalIcon from '../ui/GoalIcon';
import TaskIcon from '../ui/TaskIcon';

type CategoryIconProps = Omit<ComponentProps<typeof TaskIcon | typeof EventIcon | typeof GoalIcon>, 'href'> & { category: Categories };

const CategoryIcon: FC<CategoryIconProps> = ({ category, ...props }) => {
	switch (category) {
		case Categories.DEFAULT:
			return <TaskIcon {...props} />;
		case Categories.GOAL:
			return <GoalIcon {...props} />;
		case Categories.EVENT:
			return <EventIcon {...props} />;
		default:
			return null;
	}
};

export default CategoryIcon;
