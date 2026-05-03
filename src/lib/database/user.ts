import { db } from './index';

export type User = {
	id: number;
	username: string;
	created_at: string;
	last_online: string | null;
};

export async function getUserById(id: number): Promise<User | null> {
	const [user] = await db`SELECT id, username, created_at, last_online FROM users WHERE id = ${id}`;
	return user || null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
	const [user] =
		await db`SELECT id, username, created_at, last_online FROM users WHERE username = ${username}`;
	return user || null;
}

export async function updateOnline(id: number): Promise<void> {
	await db`UPDATE users SET last_online = NOW() WHERE id = ${id}`;
}
