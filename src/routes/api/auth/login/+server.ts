import { json, type RequestHandler } from '@sveltejs/kit';
import { createToken, verifyPassword } from '$lib/database/auth';
import { getUserByUsername, updateOnline } from '$lib/database/user';

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();
	if (!username) {
		return json({ success: false, message: 'Username is required' }, { status: 400 });
	}
	if (!password) {
		return json({ success: false, message: 'Password is required' }, { status: 400 });
	}

	const user = await getUserByUsername(username);
	if (!user) {
		return json({ success: false, message: 'Invalid username or password' }, { status: 401 });
	}

	const isVerified = await verifyPassword(username, password);
	if (!isVerified) {
		return json({ success: false, message: 'Invalid username or password' }, { status: 401 });
	}

	const token = await createToken(username);
	await updateOnline(user.id);
	return json({ success: true, token });
};
