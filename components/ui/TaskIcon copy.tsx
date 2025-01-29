import { FC, type ComponentProps } from 'react';
import { Image } from 'react-native';

type EventIconProps = Omit<ComponentProps<typeof Image>, 'href'> & {};

const EventIcon: FC<EventIconProps> = (...props) => {
	return <Image {...props} source={require('../../assets/images/event.png')} />;
};

export default EventIcon;
