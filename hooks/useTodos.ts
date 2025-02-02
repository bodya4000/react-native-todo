import { todoService } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useTodos = ({ categories, done, searchText }: { categories?: Categories; done?: boolean; searchText?: string }) => {
	const queryKey = ['todos', done];
	const queryFn = () => {
		if (done === true) return todoService.getCompletedTodos({ searchText, categories });
		if (done === false) return todoService.getUncompletedTodos({ searchText, categories });
		return todoService.getAllTodos({ searchText, categories });
	};
	const queryData = useQuery({ queryKey, queryFn });
	useEffect(() => {
		queryData.refetch();
	}, [searchText, categories]);
	return queryData;
};

export default useTodos;
