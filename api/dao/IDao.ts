interface IDao<T> {
	getAll(): Promise<T[]>;
	save(model: T): T;
	update(id: number, updates: Partial<T>): void;
	delete(id: number): void;
}

export default IDao;
