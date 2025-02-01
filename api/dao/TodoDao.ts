import { Categories, mapCategory } from '@/constants/Categories';
import { IFetchedTodo, ITodo } from '@/types/ITodo';
import DateService from '@/utils/date';
import { SQLiteDatabase } from 'expo-sqlite';
import IDao from './IDao';

class TodoDao implements IDao<ITodo> {
	private readonly db;

	constructor(db: SQLiteDatabase) {
		this.db = db;
	}
	async getAll(): Promise<ITodo[]> {
		const result = await this.db.getAllAsync<IFetchedTodo>(
			`SELECT t.id, t.title, t.done, t.due_time AS date, c.name AS category
					FROM Todos t
					JOIN Categories c ON t.category_fk_id = c.id;`
		);

		const todos = result.map(
			({ title, done, category, date, id }: IFetchedTodo) =>
				({
					id,
					title,
					done: done !== 0,
					date: date ? DateService.fromSqliteFormat(date) : undefined,
					categories: mapCategory(category),
				} as ITodo)
		);
		return todos;
	}

	getAllByCategory(category: Categories): Promise<ITodo[]> {
		throw new Error('Method not implemented.');
	}
	getAllByStatus(status: boolean): Promise<ITodo[]> {
		throw new Error('Method not implemented.');
	}
	getById(id: number): Promise<ITodo> {
		throw new Error('Method not implemented.');
	}
	save(model: ITodo): ITodo {
		const categoryQuery = `SELECT id FROM Categories WHERE name = ? LIMIT 1`;
		const categoryResult = this.db.getFirstSync<{ id: number }>(categoryQuery, [model.categories]);
		const categoryId = categoryResult?.id ?? null;
		if (!categoryId) {
			throw new Error(`Категорія "${model.categories}" не знайдена`);
		}
		console.log('model:', model);
		const query = `INSERT INTO Todos (title, done, due_time, category_fk_id) VALUES (?, ?, ?, ?)`;
		const values = [model.title, model.done ? 1 : 0, model.date ? DateService.toSqliteFormat(model.date) : null, categoryId];
		console.log('inserting..');
		this.db.runSync(query, values);
		return model;
	}

	update(id: number, updates: Partial<ITodo>): void {
		const fields = [];
		const values = [];

		if (updates.done !== undefined) {
			fields.push('done = ?');
			values.push(updates.done);
		}
		if (updates.title !== undefined) {
			fields.push('title = ?');
			values.push(updates.title);
		}

		if (updates.categories !== undefined) {
			fields.push('title = ?');
			values.push(updates.categories);
		}
		if (fields.length === 0) return;

		const query = `UPDATE Todos SET ${fields.join(', ')} WHERE id = ?`;
		values.push(id);
		this.db.runSync(query, values);
	}

	delete(id: number): void {
		const query = `DELETE FROM Todos WHERE id = ?`;
		this.db.runSync(query, [id]);
	}
}

export default TodoDao;
