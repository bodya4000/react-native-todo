import { Categories } from '@/constants/Categories';
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
	async getAllTodos(params: { searchText?: string; categories?: Categories }): Promise<ITodo[]> {
		const { searchText } = params;
		let todos = await this.todoDao.getAll();
		return this.filterByText(todos, searchText);
	}
	deleteTodo(id: number): void {
		this.todoDao.delete(id);
		this.queryClientService.invalidateTodos();
	}
	saveTodo(todo: ITodo): void {
		this.todoDao.save(todo);
		this.queryClientService.invalidateTodos();
	}

	async getCompletedTodos(params: { searchText?: string; categories?: Categories }): Promise<ITodo[]> {
		const { searchText, categories } = params;
		let todos = await this.todoDao.getAll();
		todos = todos.filter(todo => todo.done);
		todos = this.filterByText(todos, searchText);
		return this.filterByCategory(todos, categories);
	}
	async getUncompletedTodos(params: { searchText?: string; categories?: Categories }): Promise<ITodo[]> {
		const { searchText, categories } = params;
		let todos = await this.todoDao.getAll();
		todos = todos.filter(todo => !todo.done);
		todos = this.filterByText(todos, searchText);
		return this.filterByCategory(todos, categories);
	}
	toggleTodoStatus(id: number, newStatus: boolean): void {
		this.todoDao.update(id, { done: newStatus });
		this.queryClientService.invalidateTodos();
	}

	private filterByText(todos: ITodo[], searchText: string | undefined) {
		if (searchText) {
			return todos.filter(todo => todo.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
		}
		return todos;
	}

	private filterByCategory(todos: ITodo[], category: Categories | undefined) {
		if (category) {
			return todos.filter(todo => todo.categories == category);
		}
		return todos;
	}
}
