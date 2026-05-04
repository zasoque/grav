<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';

	const { data } = $props();
	const { user } = $derived(data);
</script>

<div>
	<div>
		<Profile {user} />
	</div>
	<div>{new Date(user.created_at).toLocaleDateString()} 가입</div>
	<div>마지막으로 {new Date(user.last_online).toLocaleDateString()}에 접속</div>
	<div>여기에 이제 ... 이력이나 이런거 추가할 예정입니다.</div>
</div>
