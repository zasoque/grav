import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const { gid } = params;

	return { gid };
};
