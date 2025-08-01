<script lang="ts">
	export let distance = 1; // default
	export let onChange = (val: number) => {};

	const options = [0.5, 1, 2, 3, 5];
</script>

<div class="flex flex-wrap gap-2">
	{#each options as option}
		<button
			class="btn btn-sm"
			class:selected={distance === option}
			class:btn-outline={distance !== option}
			class:btn-primary={distance === option}
			on:click={() => onChange(option * 1000)}
		>
			{option} km
		</button>
	{/each}
</div>
