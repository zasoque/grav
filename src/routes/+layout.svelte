<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Profile from '$lib/components/Profile.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Diphylleia&display=swap" rel="stylesheet" />
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
			<Profile />
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
</style>
