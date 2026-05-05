import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params, fetch }) => {
	const { gid } = params;
	const { game } = await fetch(`/api/games/${gid}`).then((res) => res.json());

	return { game };
};
