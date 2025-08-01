<script lang="ts">
	import { favorites } from '$lib/stores';
	import type { Restaurant } from '$lib/types';
	import { getMapLink } from '$lib/utils';
	import { Star } from 'lucide-svelte';

	export let restaurant: Restaurant;
	export let toggleFavorite: (id: string) => void;

	$: isFav = $favorites.includes(restaurant.id);
</script>

<div
	class="rounded border p-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
>
	<div class="flex items-center justify-between">
		<a
			href={getMapLink(restaurant.lat, restaurant.lon)}
			target="_blank"
			class="flex grow items-center gap-2"
		>
			{#if restaurant.isOpen !== undefined}
				<span class={`size-2 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
				></span>
			{/if}
			<strong class="dark:text-white">{restaurant.name}</strong>
		</a>
		<div class="flex items-center gap-2">
			<span class="text-sm text-nowrap text-gray-500 dark:text-gray-400">
				{restaurant.distance.toFixed(2)} km
			</span>
			<button on:click={() => toggleFavorite(restaurant.id)} class="text-yellow-500">
				<Star size={16} fill={isFav ? 'currentColor' : 'none'} />
			</button>
		</div>
	</div>
</div>
