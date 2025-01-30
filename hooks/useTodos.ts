import { todoService } from '@/app/_layout';
import { Categories } from '@/constants/Categories';
import { useQuery } from '@tanstack/react-query';

const useTodos = ({ categories, done }: { categories?: Categories; done?: boolean }) => {
	const queryKey = ['todos', done];
	const queryFn = () => {
		if (done === true) return todoService.getCompletedTodos();
		if (done === false) return todoService.getUncompletedTodos();
		return todoService.getAllTodos();
	};

	return useQuery({ queryKey, queryFn });
};

export default useTodos;
