<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<style>
		body {
			margin: 0;
			font-family: system-ui, sans-serif;
			overflow: hidden;
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
		<div class="logo">Grav</div>
		<div class="links">
			<div class="link"><a href="/play">플레이</a></div>
		</div>
		<div class="footbar">Hello, world!</div>
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
		background-color: #333;
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
