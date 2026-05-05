<script lang="ts">
	import Gravjulien from '$lib/components/Gravjulien.svelte';

	const { data } = $props();
	const { gid } = $derived(data);

	const gravjulien = {
		size: 8,
		grasooshas: [],
		last: { x: null, y: null }
	};
</script>

{gid}
<Gravjulien {gravjulien} />
