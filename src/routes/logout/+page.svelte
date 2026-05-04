<script lang="ts">
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';

	onMount(async () => {
		await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`
			}
		})
			.then(() => {
				Cookies.remove('token');
				window.location.href = '/login';
			})
			.catch((error) => {
				console.error('Logout failed:', error);
			});
	});
</script>
