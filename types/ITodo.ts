import { Categories } from '@/constants/Categories';

export interface ITodo {
	id: number;
	title: string;
	done: boolean;
	categories: Categories;
	date?: Date;
}

export interface IFetchedTodo {
	id: number;
	title: string;
	done: number;
	categories: Categories;
	date?: string;
	category: string;
}
