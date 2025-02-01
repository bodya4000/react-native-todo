export function padZero(num: number): string {
	return num < 10 ? `0${num}` : `${num}`;
}

export function debounce<T extends (...args: any[]) => void>(callback: T, delay = 300) {
	let timer: NodeJS.Timeout | null = null;

	return () => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(callback, delay);
	};
}
