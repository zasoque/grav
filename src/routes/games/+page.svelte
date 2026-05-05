<script lang="ts">
	import Gravjulien from '$lib/components/Gravjulien.svelte';

	const gravjulien = {
		size: 8,
		grasooshas: [
			{ x: 1, y: 1, color: '#ffce00', username: '북극치타' },
			{ x: 2, y: 2, color: '#000000', username: 'zasoque' },
			{ x: 3, y: 3, color: '#ff0000', username: 'もにゃご' },
			{ x: 4, y: 4, color: '#0000ff', username: '什麼' },
			{ x: 5, y: 5, color: '#ffffff', username: 'a' }
		],
		last: { x: 4, y: 3 }
	};
</script>

<Gravjulien {gravjulien} />
