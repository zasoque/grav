import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const { games } = await fetch('/api/games').then((res) => res.json());

	return {
		games
	};
};
