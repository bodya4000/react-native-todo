import { Redirect } from 'expo-router';
import { FC } from 'react';

const Index: FC = () => {
	return <Redirect href={'/list'} />;
};

export default Index;
