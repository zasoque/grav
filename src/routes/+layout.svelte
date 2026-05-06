<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Profile from '$lib/components/Profile.svelte';

	let { children, data } = $props();
	const { me } = $derived(data);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Diphylleia&display=swap" rel="stylesheet" />
	<link
		href="https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap"
		rel="stylesheet"
	/>
	<style>
		body {
			margin: 0;
			font-family: 'Diphylleia', serif;
			overflow: hidden;
			background-color: #333;
			color: white;
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		input {
			background-color: #222;
			color: white;
			border: none;
			padding: 12px;
			border-radius: 8px;
			box-sizing: border-box;
			font-family: 'Diphylleia', serif;
			font-size: 16px;
			width: 100%;
		}

		button {
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
			--hover-color: #444;
		}

		button:hover {
			transform: translateY(-2px);
			border-bottom: 2px solid var(--border-color);
			border-top: 2px solid transparent;
			background-color: var(--hover-color);
		}

		button:active {
			transform: translateY(0);
			border-bottom: 0 solid var(--border-color);
			border-top: 4px solid transparent;
		}

		.number {
			font-family: 'Special Gothic Expanded One', sans-serif;
		}
	</style>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
	<div class="navigation">
		<div class="logo"><a href="/">Grav</a></div>
		<div class="links">
			<div class="link"><a href="/play">플레이</a></div>
		</div>
		<div class="footbar">
			{#if me}
				<div>
					<a href="/logout">로그아웃</a>
				</div>
				<div>
					<Profile user={me} />
				</div>
			{:else}
				<div>
					<a href="/login">로그인</a>
				</div>
			{/if}
		</div>
	</div>
	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}

	.navigation {
		height: 60px;
		background-color: #111;
		width: 240px;
		color: white;
		padding: 20px 20px;
		display: flex;
		flex-direction: column;
		height: 100vh;
		position: sticky;
		box-sizing: border-box;
	}

	.content {
		flex: 1;
		max-height: 100vh;
		overflow-y: auto;
		max-width: 1280px;
		margin: 0 auto;
		padding: 24px;
	}

	.logo {
		font-size: 1.5em;
		font-weight: bold;
	}

	.links {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
	}

	.link {
		font-size: 1.2em;
	}

	.footbar {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	@media (max-width: 768px) {
		.container {
			flex-direction: column;
			height: 100vh;
			overflow: hidden;
		}

		.navigation {
			width: 100%;
			height: auto;
			position: relative;
		}

		.content {
			max-width: none;
			padding: 12px;
		}
	}
</style>
