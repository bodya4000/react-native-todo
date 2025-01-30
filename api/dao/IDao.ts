import { Categories } from '@/constants/Categories';

interface IDao<T> {
	getAll(): Promise<T[]>;
	getAllByCategory(category: Categories): Promise<T[]>;
	getAllByStatus(status: boolean): Promise<T[]>;
	getById(id: number): Promise<T>;
	save(model: T): T;
	update(id: number, updates: Partial<T>): void;
	delete(id: number): void;
}

export default IDao;
