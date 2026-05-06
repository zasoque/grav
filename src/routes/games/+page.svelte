<script lang="ts">
	import Gravjulien from '$lib/components/Gravjulien.svelte';

	const { data } = $props();
	const { games } = $derived(data);
</script>

<div class="container">
	<div class="part">
		<Gravjulien />
	</div>
	<div class="part">
		{#each games as game}
			<a href={`/games/${game.id}`} class="game-link">
				<div class="game-row">
					<div class="game-id">
						#{game.id}
					</div>
					<div class="game-info">
						<div class="game-info-size">
							{game.size}
						</div>
						<div class="game-info-rule">
							{game.sequence_max}
							{game.area_size}
							{game.area_max}
							{game.distance_min}
							{game.distance_max}
						</div>
						<div class="game-info-players">
							{game.players.length}/{game.max_players}
						</div>
					</div>
					<div class="game-owner">
						{game.owner.username}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		gap: 24px;
	}

	.part {
		flex: 1;
	}

	:global .gravjulien {
		width: 100%;
		height: auto;
	}

	.game-link {
		text-decoration: none;
		color: inherit;
	}

	.game-row {
		display: flex;
		flex-direction: row;
		gap: 16px;
		padding: 8px;
		background-color: #444;
		border-radius: 8px;
		margin-bottom: 8px;
		transition: background-color 0.3s ease;
	}

	.game-row:hover {
		background-color: #555;
		cursor: pointer;
	}

	.game-id {
		width: 60px;
	}

	.game-info {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.game-info-size {
		width: 40px;
	}

	.game-info-rule {
		width: 100px;
	}

	.game-info-players {
		width: 80px;
	}

	.game-owner {
		margin-left: auto;
		color: #aaa;
	}
</style>
