import { QueryClient } from '@tanstack/react-query';

class QueryClientService {
	private readonly queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
	}
	invalidateTodos() {
		this.queryClient.invalidateQueries({ queryKey: ['todos', true] });
		this.queryClient.invalidateQueries({ queryKey: ['todos', false] });
		this.queryClient.invalidateQueries({ queryKey: ['todos', undefined] });
		this.queryClient.invalidateQueries({ queryKey: ['todos'] });
	}
}

export default QueryClientService;
