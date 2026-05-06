<script lang="ts">
	import Gravjulien from '$lib/components/Gravjulien.svelte';

	const { data } = $props();
	const { game } = $derived(data);

	const gravjulien = {
		size: game.size,
		grasooshas: game.grasooshas
	};
</script>

<div class="container">
	<div class="part">
		<Gravjulien {gravjulien} />
	</div>
	<div class="part part-right">
		<div class="game-info-container game-info">
			<div>게임 #{game.id} <span class={`state-${game.state}`}>⬤</span></div>
			<div class="rule number">
				{game.sequence_max}
				{game.area_size}
				{game.area_max}
				{game.distance_min}
				{game.distance_max}
			</div>
		</div>
		<div class="game-info-container player-info">
			<div class="game-info-title">플레이어</div>
			<div class="player-row">
				{#each game.players as player}
					<div>{player.username}</div>
				{/each}
			</div>
		</div>
		<div class="game-info-container">
			<div class="game-info-title">동작</div>
		</div>
		<div class="game-info-container">
			<div class="game-info-title">통계</div>
		</div>
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
		gap: 24px;
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
		margin-bottom: 12px;
	}
	.game-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.rule {
		font-size: 32px;
	}

	.state-waiting {
		color: #ffce00;
	}

	.game-info-title {
		width: 80px;
		margin-right: 12px;
	}

	.player-info {
		display: flex;
	}
</style>
