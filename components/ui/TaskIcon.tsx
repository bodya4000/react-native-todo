import { FC, type ComponentProps } from 'react';
import { Image } from 'react-native';

type TaskIconProps = Omit<ComponentProps<typeof Image>, 'href'> & {};

const TaskIcon: FC<TaskIconProps> = (...props) => {
	return <Image {...props} source={require('../../assets/images/task.png')} />;
};

export default TaskIcon;
