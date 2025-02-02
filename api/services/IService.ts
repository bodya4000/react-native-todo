import { ITodo } from '@/types/ITodo';

export default interface IService {
	getAllTodos(params: { searchText?: string }): Promise<ITodo[]>;
	getCompletedTodos(params: { searchText?: string }): Promise<ITodo[]>;
	getUncompletedTodos(params: { searchText?: string }): Promise<ITodo[]>;
	// getByCategoryTodos(): Promise<ITodo[]>;

	// updateTodo(id: number, updates: Partial<ITodo>): Promise<ITodo>;
	saveTodo(todo: ITodo): void;
	toggleTodoStatus(id: number, newStatus: boolean): void;
	deleteTodo(id: number): void;
}
