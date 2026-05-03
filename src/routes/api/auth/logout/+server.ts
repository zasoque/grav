import { json, type RequestHandler } from '@sveltejs/kit';
import { deleteToken, verifyToken } from '$lib/database/auth';

export const POST: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization')?.replace('Bearer ', '');
	if (!token) {
		return json({ success: false, message: 'Authorization token is required' }, { status: 401 });
	}

	const user = await verifyToken(token);
	if (!user) {
		return json({ success: false, message: 'Invalid token' }, { status: 401 });
	}

	await deleteToken(token);
	return json({ success: true, message: 'Logged out successfully' });
};
