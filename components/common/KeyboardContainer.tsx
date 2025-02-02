import React, { FC, useEffect, useState } from 'react';
import { Keyboard, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';

interface KeyboardContainerProps {
	style?: ViewStyle;
	children: React.ReactNode;
}

const KeyboardContainer: FC<KeyboardContainerProps> = ({ children, style }) => {
	const [showToolbar, setShowToolbar] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setShowToolbar(true));
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setShowToolbar(false));

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	return (
		<>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} bottomOffset={100} style={[{ flex: 1 }, style]}>
				{children}
			</KeyboardAwareScrollView>
			{showToolbar && (
				<View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
					<KeyboardToolbar/>
				</View>
			)}
		</>
	);
};

export default KeyboardContainer;
