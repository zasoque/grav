import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params, fetch }) => {
	const uid = params.uid;
	const { user } = await fetch(`/api/users/${uid}`).then((res) => res.json());

	return { user };
};
