import { getUserById } from '$lib/database/user';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { uid } = params;
	if (!uid || isNaN(parseInt(uid))) {
		return json({ success: false, message: 'Invalid user ID' }, { status: 400 });
	}

	const user = await getUserById(parseInt(uid));
	if (!user) {
		return json({ success: false, message: 'User not found' }, { status: 404 });
	}

	return json({ success: true, user });
};
