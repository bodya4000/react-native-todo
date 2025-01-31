import { queryClient } from '@/app/_layout';

class QueryClientService {
	invalidateTodos() {
		queryClient.invalidateQueries({ queryKey: ['todos', true] });
		queryClient.invalidateQueries({ queryKey: ['todos', false] });
		queryClient.invalidateQueries({ queryKey: ['todos', undefined] });
	}
}

export default new QueryClientService();
