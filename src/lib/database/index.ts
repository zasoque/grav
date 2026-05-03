import dotenv from 'dotenv';
import { SQL } from 'bun';

dotenv.config();

export const db = new SQL({
	adapter: 'mariadb',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '3306'),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});
