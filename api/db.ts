import { SQLiteDatabase } from 'expo-sqlite';

async function enableForeignKeys(db: SQLiteDatabase) {
	await db.runAsync(`PRAGMA foreign_keys = ON;`);
}
async function createTableCategories(db: SQLiteDatabase) {
	await db.runAsync(`
		CREATE TABLE IF NOT EXISTS Categories (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL UNIQUE
		);
	`);
}
async function createTableTodos(db: SQLiteDatabase) {
	await db.runAsync(`
		CREATE TABLE IF NOT EXISTS Todos (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			title TEXT NOT NULL, 
			done INTEGER NOT NULL DEFAULT 0, 
			due_time TEXT NULL,     
			notes TEXT,      
			category_fk_id INTEGER,
			FOREIGN KEY (category_fk_id) REFERENCES Categories(id) ON DELETE CASCADE
		);
	`);
}

async function clearTables(db: SQLiteDatabase) {
	await db.execAsync(`DELETE FROM Todos;`);
}

async function fillCategories(db: SQLiteDatabase) {
	const rowCount = await db.getAllAsync<number>('SELECT COUNT(*) as count FROM Categories');
	if (rowCount[0] === 0) {
		await db.runAsync(`
			INSERT INTO Categories (name) VALUES
			('DEFAULT'),
			('GOAL'),
			('EVENT');
		`);
	}
}

async function fillTodos(db: SQLiteDatabase) {
	const categories = await db.getAllAsync(`SELECT id, name FROM Categories;`);
	const taskId = categories.find(cat => cat.name === 'DEFAULT')?.id || 1;
	const goalId = categories.find(cat => cat.name === 'GOAL')?.id || 2;
	const eventId = categories.find(cat => cat.name === 'EVENT')?.id || 3;

	await db.runAsync(`
		INSERT INTO Todos (title, done, due_time, category_fk_id) VALUES
		('Complete React Native app', 0, '2024-02-10 14:00:00', ${taskId}),
		('Fix database migration', 1, NULL, ${goalId}),
		('Write unit tests', 0, '2024-02-12 09:30:00', ${eventId}),
		('Review PRs', 1, '2024-02-08 16:45:00', ${taskId}),
		('Update documentation', 0, NULL, ${goalId});
`);
}

export async function setupDatabase(db: SQLiteDatabase) {
	await enableForeignKeys(db);
	await createTableCategories(db);
	await createTableTodos(db);
	await fillCategories(db);
	// await clearTables(db);
}
