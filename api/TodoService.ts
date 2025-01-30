import { ITodo } from '@/types/ITodo';
import IService from './IService';
import IDao from './dao/IDao';
import TodoDao from './dao/TodoDao';

export default class TodosService implements IService {
	private readonly todoDao: IDao<ITodo>;

	constructor(todoDao: TodoDao) {
		this.todoDao = todoDao;
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
	}
}
