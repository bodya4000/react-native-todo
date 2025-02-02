import { todoService } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useTodos = ({ categories, done, searchText }: { categories?: Categories; done?: boolean; searchText?: string }) => {
	const queryKey = ['todos', done];
	const queryFn = () => {
		if (done === true) return todoService.getCompletedTodos({ searchText });
		if (done === false) return todoService.getUncompletedTodos({ searchText });
		return todoService.getAllTodos({ searchText });
	};
	const queryData = useQuery({ queryKey, queryFn });
	useEffect(() => {
		queryData.refetch();
	}, [searchText]);
	return queryData;
};

export default useTodos;
