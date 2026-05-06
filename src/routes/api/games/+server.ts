import { verifyToken } from '$lib/database/auth';
import { createGame, cleanWaitingGames, getWaitingGames } from '$lib/database/game';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization')?.split(' ')[1];
	if (!token) {
		return json({ success: false, message: 'No token provided' }, { status: 401 });
	}

	const user = await verifyToken(token);
	if (!user) {
		return json({ success: false, message: 'Invalid token' }, { status: 401 });
	}

	const {
		size,
		sequence_max,
		area_size,
		area_max,
		distance_min,
		distance_max,
		max_players,
		turn_timeout,
		total_timeout
	} = await request.json();
	if (
		!size ||
		!sequence_max ||
		!area_size ||
		!area_max ||
		!distance_min ||
		!distance_max ||
		!max_players ||
		!turn_timeout ||
		!total_timeout
	) {
		return json({ success: false, message: 'Missing parameters' }, { status: 400 });
	}

	if (!(5 <= size && size <= 19)) {
		return json({ success: false, message: 'Size must be between 5 and 19' }, { status: 400 });
	}

	if (!(2 <= sequence_max)) {
		return json({ success: false, message: 'Sequence max must be at least 2' }, { status: 400 });
	}

	if (!(1 <= area_size)) {
		return json({ success: false, message: 'Area size must be at least 1' }, { status: 400 });
	}

	if (!(1 <= area_max && area_max <= size * size)) {
		return json(
			{ success: false, message: 'Area max must be between 1 and size^2' },
			{ status: 400 }
		);
	}

	if (!(0 <= distance_min)) {
		return json({ success: false, message: 'Distance min must be at least 0' }, { status: 400 });
	}

	if (!(distance_min <= distance_max)) {
		return json(
			{ success: false, message: 'Distance max must be greater than or equal to distance min' },
			{ status: 400 }
		);
	}

	if (!(2 <= max_players)) {
		return json({ success: false, message: 'Max players must be at least 2' }, { status: 400 });
	}

	await cleanWaitingGames(user.id);
	const game = await createGame(
		user.id,
		size,
		sequence_max,
		area_size,
		area_max,
		distance_min,
		distance_max,
		max_players,
		turn_timeout,
		total_timeout
	);

	return json({ success: true, message: 'Game created successfully', game });
};

export const GET: RequestHandler = async () => {
	return json({ success: true, games: await getWaitingGames() });
};
