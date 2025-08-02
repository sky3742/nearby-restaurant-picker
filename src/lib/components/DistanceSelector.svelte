<script lang="ts">
	export let distance = 1; // default
	export let onChange: (val: number) => void;

	const options = [0.5, 1, 2, 3, 5];
</script>

<fieldset class="fieldset">
	<label class="label">
		Distance

		<div class="flex flex-wrap gap-2">
			{#each options as option (option)}
				<button
					class="btn btn-sm btn-primary"
					class:btn-outline={distance !== option}
					on:click={() => onChange(option * 1000)}
					aria-pressed={distance === option}
				>
					{option} km
				</button>
			{/each}
		</div>
	</label>
</fieldset>
