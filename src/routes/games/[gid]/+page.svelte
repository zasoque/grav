<script lang="ts">
	import Gravjulien from '$lib/components/Gravjulien.svelte';

	const { data } = $props();
	const { game } = $derived(data);

	const gravjulien = {
		size: game.size,
		grasooshas: [],
		last: { x: null, y: null }
	};
</script>

<div class="container">
	<div class="part">
		<Gravjulien {gravjulien} />
	</div>
	<div class="part part-right">
		<div class="game-info-container">
			<div class="game-info">
				<div>게임 #{game.id}</div>
				<div class="rule">
					{game.sequence_max}
					{game.area_size}
					{game.area_max}
					{game.distance_min}
					{game.distance_max}
				</div>
			</div>
		</div>
		<div>Players here</div>
		<div>Actions here</div>
		<div>History here (Bottom to Top)</div>
	</div>
</div>

<style>
	:global .gravjulien {
		width: 100%;
		height: auto;
	}

	.container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
	.part {
		flex: 1;
	}
	.part-right {
		display: flex;
		flex-direction: column;
	}

	.game-info-container {
		background-color: #222;
		padding: 12px;
		border-radius: 8px;
	}
	.game-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.rule {
		font-family: 'Futura', sans-serif;
		font-size: 32px;
		font-weight: bold;
	}
</style>
