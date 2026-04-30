<div class="story">
	<div class="column-1">
		<div class="part">게임</div>
		<button class="page-button page-button-primary button-animation">빠른 매치</button>
		<button class="page-button button-animation">사용자 지정 게임</button>
		<button class="page-button button-animation">게임 탐색</button>
		<button class="page-button button-animation">혼자서 플레이</button>
	</div>
	<div class="column-1">
		<div class="part">
			<span class="profile-picture" style="background-color: white; color: black;">북</span>
			<span class="username">북극치타 🇰🇷</span>
		</div>
		<div class="story">
			<div class="rating column-1">
				<div>레이팅</div>
				<div class="big-number">1,293</div>
			</div>
			<div class="rating column-1">
				<div>승률</div>
				<div class="big-number">.592</div>
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

	.button-animation {
		border: none;
		background-color: #222;
		transform: translateY(-4px);
		border-bottom: 4px solid var(--border-color);
		border-top: 0 solid transparent;
		transition:
			transform 0.2s,
			border-bottom 0.2s,
			border-top 0.2s,
			background-color 0.2s;
	}

	.button-animation:hover {
		transform: translateY(-2px);
		border-bottom: 2px solid var(--border-color);
		border-top: 2px solid transparent;
		background-color: var(--hover-color);
	}

	.button-animation:active {
		transform: translateY(0);
		border-bottom: 0 solid var(--border-color);
		border-top: 4px solid transparent;
	}

	.page-button {
		font-family: 'Diphylleia', serif;
		font-weight: bold;
		width: 100%;
		padding: 24px;
		font-size: 16px;
		color: white;
		border-radius: 8px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: left;
		margin-bottom: 12px;
		--border-color: #111;
		--hover-color: #333;
	}

	.page-button-primary {
		background-color: #ffce00;
		color: #19191e;
		--border-color: #ff7f00;
		--hover-color: #fdde59;
	}

	.big-number {
		font-size: 48px;
		font-weight: bold;
		font-family: 'Futura', sans-serif;
	}

	.profile-picture {
		width: 24px;
		height: 24px;
		background-color: #7f7f7f;
		border-radius: 4px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.username {
		margin-left: 4px;
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
