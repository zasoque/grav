import { verifyToken } from '$lib/database/auth';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization')?.split(' ')[1];
	const me = await verifyToken(token || '');
	if (!me) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	return json({ success: true, me });
};
