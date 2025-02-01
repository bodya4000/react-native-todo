import { ITodo } from '@/types/ITodo';
import IDao from '../dao/IDao';
import TodoDao from '../dao/TodoDao';
import IService from './IService';
import QueryClientService from './QueryClientService';

export default class TodosService implements IService {
	private readonly todoDao: IDao<ITodo>;
	private readonly queryClientService: QueryClientService;

	constructor(todoDao: TodoDao, queryClientService: QueryClientService) {
		this.todoDao = todoDao;
		this.queryClientService = queryClientService;
	}
	deleteTodo(id: number): void {
		this.todoDao.delete(id);
		this.queryClientService.invalidateTodos();
	}
	saveTodo(todo: ITodo): void {
		this.todoDao.save(todo);
		this.queryClientService.invalidateTodos();
	}
	getAllTodos(): Promise<ITodo[]> {
		return this.todoDao.getAll();
	}

	async getCompletedTodos(): Promise<ITodo[]> {
		const todos = await this.todoDao.getAll();
		return todos.filter(todo => todo.done);
	}
	async getUncompletedTodos(): Promise<ITodo[]> {
		const todos = await this.todoDao.getAll();
		return todos.filter(todo => !todo.done);
	}
	toggleTodoStatus(id: number, newStatus: boolean): void {
		this.todoDao.update(id, { done: newStatus });
		this.queryClientService.invalidateTodos();
	}
}
