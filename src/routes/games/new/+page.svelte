<script lang="ts">
	import Gravjulien from '$lib/components/Gravjulien.svelte';
	import Cookies from 'js-cookie';

	let {
		size,
		sequence_max,
		area_size,
		area_max,
		distance_min,
		distance_max,
		max_players,
		turn_timeout,
		total_timeout
	} = $state({
		size: 15,
		sequence_max: 3,
		area_size: 3,
		area_max: 5,
		distance_min: 2,
		distance_max: 4,
		max_players: 2,
		turn_timeout: 5,
		total_timeout: 20
	});

	let gravjulien = $derived({ size });

	async function createRoom(event: Event) {
		event.preventDefault();

		const token = Cookies.get('token');
		await fetch('/api/games', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify({
				size,
				sequence_max,
				area_size,
				area_max,
				distance_min,
				distance_max,
				max_players,
				turn_timeout,
				total_timeout
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					window.location.href = `/games/${data.game.id}`;
				} else {
					alert('방 생성에 실패했습니다: ' + data.message);
					return;
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<div class="container">
	<div class="part">
		<Gravjulien {gravjulien} />
	</div>
	<div class="part">
		<form method="POST" onsubmit={createRoom}>
			<div class="form-row">
				<label for="size">크기</label>
				<input id="size" type="number" bind:value={size} min="5" max="19" required />
			</div>
			<div class="form-row">
				<label for="sequence_max">연속 최대</label>
				<input id="sequence_max" type="number" bind:value={sequence_max} min="2" required />
			</div>
			<div class="form-row">
				<label for="area_size">영역 크기</label>
				<input id="area_size" type="number" bind:value={area_size} min="1" required />
			</div>
			<div class="form-row">
				<label for="area_max">영역 최대</label>
				<input
					id="area_max"
					type="number"
					bind:value={area_max}
					min={1}
					max={area_size * area_size}
					required
				/>
			</div>
			<div class="form-row">
				<label for="distance_min">거리 최소</label>
				<input
					id="distance_min"
					type="number"
					bind:value={distance_min}
					min="1"
					max={Math.min(2 * size - 1, distance_max - 1)}
					required
				/>
			</div>
			<div class="form-row">
				<label for="distance_max">거리 최대</label>
				<input
					id="distance_max"
					type="number"
					bind:value={distance_max}
					min={Math.max(distance_min, 1)}
					max={2 * size - 1}
					required
				/>
			</div>
			<div class="form-row">
				<label for="max_players">최대 플레이어 수</label>
				<input id="max_players" type="number" bind:value={max_players} min="2" max="10" required />
			</div>
			<div class="form-row">
				<label for="turn_timeout">턴 타임아웃 (초)</label>
				<input id="turn_timeout" type="number" bind:value={turn_timeout} min="1" required />
			</div>
			<div class="form-row">
				<label for="total_timeout">총 타임아웃 (초)</label>
				<input id="total_timeout" type="number" bind:value={total_timeout} min="1" required />
			</div>
			<button type="submit">방 만들기</button>
		</form>
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 24px;
	}
	.part {
		flex: 1;
	}
	.form-row {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
	label {
		margin-bottom: 0.5rem;
		font-weight: bold;
	}
	input {
		padding: 0.5rem;
		font-size: 1rem;
	}
  button {
    --
  }

	:global .gravjulien {
		width: 100%;
		height: auto;
	}

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
  }
</style>
