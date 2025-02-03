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

export async function setupDatabase(db: SQLiteDatabase) {
	await enableForeignKeys(db);
	await createTableCategories(db);
	await createTableTodos(db);
	await fillCategories(db);
}
