import { json, type RequestHandler } from '@sveltejs/kit';
import { getPasswordHash, createUser } from '$lib/database/auth';

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();

	if (!username) {
		return json({ success: false, message: 'Username is required' }, { status: 400 });
	}

	if (!password) {
		return json({ success: false, message: 'Password is required' }, { status: 400 });
	}

	const passwordHash = await getPasswordHash(username, password);

	if (!passwordHash) {
		return json({ success: false, message: 'Invalid username or password' }, { status: 401 });
	}

	await createUser(username, passwordHash);

	return json({ success: true, message: 'User registered successfully' });
};
