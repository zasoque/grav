import { json, type RequestHandler } from '@sveltejs/kit';
import { getGameById } from '$lib/database/game';

export const GET: RequestHandler = async ({ params }) => {
	const { gid } = params;
	if (!gid) {
		return json({ success: false, message: 'No game id provided' }, { status: 400 });
	}

	const game = await getGameById(parseInt(gid));
	if (!game) {
		return json({ success: false, message: 'Game not found' }, { status: 404 });
	}

	return json({ success: true, game });
};
