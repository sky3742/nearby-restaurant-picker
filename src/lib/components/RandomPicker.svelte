<script lang="ts">
	import { PickedCard } from '$lib/components';
	import type { Restaurant } from '$lib/types';
	import { Dice5 } from 'lucide-svelte';

	export let restaurants: Restaurant[];

	let isPicking = false;
	let picked: Restaurant;

	function startPicking() {
		if (isPicking || restaurants.length === 0) return;

		isPicking = true;

		// Generate fake rolling list
		const spinRounds = 20;
		const spinningList = Array.from(
			{ length: spinRounds },
			() => restaurants[Math.floor(Math.random() * restaurants.length)]
		);

		let i = 0;
		const interval = setInterval(() => {
			picked = spinningList[i];
			i++;
			if (i >= spinningList.length) {
				clearInterval(interval);
				isPicking = false;
			}
		}, 80);
	}
</script>

<button on:click={startPicking} class="btn btn-outline btn-accent" disabled={isPicking}>
	{#if isPicking}
		<span class="loading loading-md loading-spinner"></span>
		Picking...
	{:else}
		<Dice5 size={18} /> Pick Random
	{/if}
</button>

{#if picked}
	<div class="md:col-span-2">
		<PickedCard restaurant={picked} {isPicking} />
	</div>
{/if}
