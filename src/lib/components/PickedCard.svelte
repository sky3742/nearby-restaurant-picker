<script lang="ts">
	import type { Restaurant } from '$lib/types';
	import { getMapLink } from '$lib/utils';

	export let restaurant: Restaurant;
	export let isPicking: boolean = false;
</script>

<div class="card bg-primary p-4 text-primary-content">
	<a
		class="text-xl font-semibold"
		href={isPicking ? '' : getMapLink(restaurant.lat, restaurant.lon)}
		target="_blank"
		rel="noopener noreferrer"
	>
		<h2>🎉 You should try</h2>
		<h3 class:animate-pulse={isPicking}>{restaurant.name}</h3>
	</a>
	<span class="text-sm text-nowrap">
		{restaurant.distance.toFixed(2)} km away
	</span>
</div>
