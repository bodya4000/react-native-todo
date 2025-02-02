import { queryClientService } from '@/app/_layout'
import { create } from 'zustand';

interface SearchState {
	searchText: string;
	updateText: (text: string) => void;
}

export const useStore = create<SearchState>()(set => ({
	searchText: '',
	updateText: (text: string) => {
		set(() => ({ searchText: text }));
		queryClientService.invalidateTodos()
	},
}));
