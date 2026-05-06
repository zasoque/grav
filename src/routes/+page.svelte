<script>
	import Profile from '$lib/components/Profile.svelte';

	const { data } = $props();
	const { me } = $derived(data);
</script>

<div class="story">
	<div class="column-1">
		<div class="part">게임</div>
		<a href="/games/new">
			<button>방 만들기</button>
		</a>
	</div>
	<div class="column-1">
		<div class="part">
			<Profile user={me} />
		</div>
		<div class="story">
			<div class="rating column-1">
				<div>레이팅</div>
				<div class="big-number number">1,293</div>
			</div>
			<div class="rating column-1">
				<div>승률</div>
				<div class="big-number number">.592</div>
			</div>
		</div>
	</div>
</div>
<div class="story">
	<div class="column-1">
		<div class="part">게임 기록</div>
		<div class="games-container">
			<table class="games">
				<thead>
					<tr>
						<th>점유율</th>
						<th>등수</th>
						<th>날짜</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>59.19</td>
						<td>2 / 4</td>
						<td>2024-06-01</td>
					</tr>
					<tr>
						<td>45.23</td>
						<td>5 / 5</td>
						<td>2024-05-28</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.story {
		display: flex;
		flex-direction: row;
		gap: 18px;
		margin-top: 18px;
	}

	.column-1 {
		flex: 1;
	}

	.part {
		margin-bottom: 18px;
	}

	.big-number {
		font-size: 48px;
	}

	.rating {
		flex: 1;
	}

	.games-container {
		border-radius: 8px;
	}

	.games {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		border-radius: 8px;
		overflow: hidden;
	}

	.games th,
	.games td {
		text-align: left;
		padding: 12px 18px;
	}

	.games thead {
		background-color: #111;
	}

	.games tbody {
		background-color: #222;
	}

	.games tbody tr {
		transition: background-color 0.2s;
	}

	.games tbody tr:hover {
		background-color: #444;
	}
</style>
