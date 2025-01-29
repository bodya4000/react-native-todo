import { Href, Link } from 'expo-router';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href; title: string };

export function ExternalLink({ href, title, ...rest }: Props) {
	return (
		<Link
			target='_blank'
			{...rest}
			href={href}
			onPress={async event => {
				// if (Platform.OS !== 'web') {
				// 	event.preventDefault();
				// 	await openBrowserAsync(href);
				// }
			}}
		>
			{title}
		</Link>
	);
}
