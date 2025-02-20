import { Categories } from '@/constants/Categories';
import { create } from 'zustand';

interface SearchState {
	searchText: string;
	updateText: (text: string) => void;

	selectedCategory: Categories | undefined;
	setCategory: (category: Categories | undefined) => void;
}

export const useStore = create<SearchState>()(set => ({
	searchText: '',
	updateText: (text: string) => {
		set(() => ({ searchText: text }));
	},

	selectedCategory: undefined,
	setCategory: (category: Categories | undefined) => {
		set(() => ({ selectedCategory: category }));
	},
}));
