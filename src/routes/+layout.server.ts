import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies, fetch, request }) => {
	const token = cookies.get('token');
	if (!token && !request.url.endsWith('/login')) {
		return redirect(301, '/login');
	}

	const { me } = await fetch('/api/auth/me', {
		headers: { Authorization: `Bearer ${token}` }
	}).then((res) => res.json());

	return { token, me };
};
