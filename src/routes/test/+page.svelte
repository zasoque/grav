<script lang="ts">
	let ws: WebSocket = $state(null);
	let messages: string[] = $state([]);
	let input = $state('');

	function connect() {
		ws = new WebSocket(`ws://${window.location.host}/ws`);
		ws.onopen = () => (messages = [...messages, '[connected]']);
		ws.onmessage = (e) => (messages = [...messages, e.data]);
		ws.onclose = () => (messages = [...messages, '[disconnected]']);
	}

	function send() {
		ws.send(input);
		input = '';
	}
</script>

<button onclick={connect}>Connect</button>
<input bind:value={input} />
<button onclick={send}>Send</button>

<ul>
	{#each messages as msg}
		<li>{msg}</li>
	{/each}
</ul>
