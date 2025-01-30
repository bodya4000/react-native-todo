import { FC, type ComponentProps } from 'react';
import { Image } from 'react-native';

type GoalIconProps = Omit<ComponentProps<typeof Image>, 'href'> & {};

const GoalIcon: FC<GoalIconProps> = (props) => {
	return <Image {...props} source={require('../../assets/images/goal.png')} />;
};

export default GoalIcon;
