<script lang="ts">
	const { user } = $props();
</script>

{#if user}
	<a href="/profile/{user.id}">
		<span class="profile-picture" style="background-color: white; color: black;">
			{user.username[0]}
		</span>
		<span class="username">{user.username} 🇰🇷</span>
	</a>
{/if}

<style>
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
</style>
