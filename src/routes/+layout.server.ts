import { type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('token');
	if (!token) {
		return;
	}

	const { me } = await fetch('/api/auth/me', {
		headers: { Authorization: `Bearer ${token}` }
	}).then((res) => res.json());

	return { token, me };
};
