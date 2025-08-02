<script lang="ts">
	import { favorites } from '$lib/stores';
	import type { Restaurant } from '$lib/types';
	import { getMapLink } from '$lib/utils';
	import { Star } from 'lucide-svelte';

	export let restaurant: Restaurant;
	export let toggleFavorite: (id: string) => void;

	$: isFav = $favorites.includes(restaurant.id);
</script>

<div class="card bg-base-200 p-2 text-base-content">
	<div class="flex items-center justify-between">
		<a
			href={getMapLink(restaurant.lat, restaurant.lon)}
			target="_blank"
			class="flex grow items-center gap-2"
		>
			{#if restaurant.isOpen !== undefined}
				<span
					class="size-2 rounded-full"
					class:bg-success={restaurant.isOpen}
					class:bg-error={!restaurant.isOpen}
				></span>
			{/if}
			<strong>{restaurant.name}</strong>
		</a>
		<div class="flex items-center gap-2">
			<span class="badge text-nowrap badge-neutral">
				{restaurant.distance.toFixed(2)} km
			</span>
			<button
				on:click={() => toggleFavorite(restaurant.id)}
				class:text-warning={isFav}
				class:text-gray-400={!isFav}
			>
				<Star size={16} fill="currentColor" />
			</button>
		</div>
	</div>
</div>
