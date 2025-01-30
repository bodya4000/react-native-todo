import { FC, type ComponentProps } from 'react';
import { Image } from 'react-native';

type GoalIconProps = Omit<ComponentProps<typeof Image>, 'href'> & {};

const LeftArrow: FC<GoalIconProps> = (...props) => {
	return <Image {...props} source={require('../../assets/images/left-arrow.png')} />;
};

export default LeftArrow;
