import { ITodo } from '@/types/ITodo';

export default interface IService {
	getAllTodos(): Promise<ITodo[]>;
	getCompletedTodos(): Promise<ITodo[]>;
	getUncompletedTodos(): Promise<ITodo[]>;
	// getByCategoryTodos(): Promise<ITodo[]>;

	// updateTodo(id: number, updates: Partial<ITodo>): Promise<ITodo>;
	saveTodo(todo: ITodo): void;
	toggleTodoStatus(id: number, newStatus: boolean): void;

	// deleteTodo(id: number): void;
}
