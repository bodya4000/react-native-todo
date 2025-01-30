export enum Categories {
	DEFAULT = 'DEFAULT',
	GOAL = 'GOAL',
	EVENT = 'EVENT',
}

export function mapCategory(category: string): Categories {
	switch (category.toUpperCase()) {
		case 'TASK':
		case 'DEFAULT':
			return Categories.DEFAULT;
		case 'GOAL':
			return Categories.GOAL;
		case 'EVENT':
			return Categories.EVENT;
		default:
			throw new Error(`Unknown category: ${category}`);
	}
}
