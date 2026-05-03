import dotenv from 'dotenv';
import { db } from '.';
import { getUserById, type User } from './user';

dotenv.config();

export async function getPasswordHash(username: string, password: string): Promise<string> {
	const salt = process.env.PASSWORD_SALT || '';
	const hash = await crypto.subtle.digest(
		'SHA-256',
		new TextEncoder().encode(salt + username + salt + password + salt)
	);
	return Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

export async function verifyPassword(username: string, password: string): Promise<boolean> {
	const [storedHash] = await db`SELECT password_hash FROM users WHERE username = ${username}`;
	if (!storedHash) {
		return false;
	}
	const inputHash = await getPasswordHash(username, password);
	return storedHash.password_hash === inputHash;
}

export async function createUser(username: string, passwordHash: string): Promise<void> {
	await db`INSERT INTO users (username, password_hash) VALUES (${username}, ${passwordHash})`;
}

export async function createToken(username: string): Promise<string> {
	const token = crypto.randomUUID();
	await db`INSERT INTO sessions (user_id, token) VALUES ((SELECT id FROM users WHERE username = ${username}), ${token})`;
	return token;
}

export async function verifyToken(token: string): Promise<User | null> {
	const [id] = await db`SELECT user_id FROM sessions WHERE token = ${token}`;
	if (!id) {
		return null;
	}
	return getUserById(id.user_id);
}

export async function deleteToken(token: string): Promise<void> {
	await db`DELETE FROM sessions WHERE token = ${token}`;
}
