<script>
	import { getContrastColor } from '$lib/utils/color';
	import { BOARD_YELLOW, BOARD_WHITE, STONE_STROKE } from '$lib/consts/colors';

	const { gravjulien } = $props();

	const { size, grasooshas } = $derived(gravjulien);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {size * 128} {size * 128}"
	fill="currentColor"
	width="400"
	height="400"
	class="gravjulien"
>
	{#each Array(size) as _, i}
		{#each Array(size) as _, j}
			<rect
				x={i * 128}
				y={j * 128}
				width="128"
				height="128"
				fill={(i + j + size + 1) % 2 == 0 ? BOARD_YELLOW : BOARD_WHITE}
			/>
			{#if i === 0}
				<text
					x={i * 128 + 24}
					y={j * 128 + 24}
					text-anchor="middle"
					dominant-baseline="central"
					font-size="24"
					fill={(i + j + size + 1) % 2 == 0 ? BOARD_WHITE : BOARD_YELLOW}
					font-family="inherit"
				>
					{size - j}
				</text>
			{/if}
			{#if j === size - 1}
				<text
					x={i * 128 + 128 - 24}
					y={j * 128 + 128 - 24}
					text-anchor="middle"
					dominant-baseline="central"
					font-size="24"
					fill={(i + j + size + 1) % 2 == 0 ? BOARD_WHITE : BOARD_YELLOW}
					font-family="inherit"
				>
					{String.fromCharCode(97 + i)}
				</text>
			{/if}
		{/each}
	{/each}
	{#if gravjulien.last}
		<rect
			x={gravjulien.last.x * 128}
			y={gravjulien.last.y * 128}
			width="128"
			height="128"
			fill="rgba(255, 0, 0, 0.5)"
		/>
	{/if}
	<g>
		{#each grasooshas as grasoosha}
			<g>
				<circle
					cx={grasoosha.x * 128 + 64}
					cy={grasoosha.y * 128 + 64}
					r="40"
					fill={grasoosha.color}
					stroke-width="8"
					stroke={STONE_STROKE}
				/>
				<text
					x={grasoosha.x * 128 + 64}
					y={grasoosha.y * 128 + 64}
					text-anchor="middle"
					dominant-baseline="central"
					font-size="48"
					font-weight="bold"
					fill={getContrastColor(grasoosha.color)}
					font-family="inherit">{grasoosha.username[0].toUpperCase()}</text
				>
			</g>
		{/each}
	</g>
</svg>
