<script lang="ts">
	import type { Restaurant } from '$lib/types';
	import { getMapLink } from '$lib/utils';
	export let restaurant: Restaurant;
</script>

<div class="card mb-4 bg-primary p-4 text-primary-content">
	<h2 class="text-xl font-semibold">
		<a href={getMapLink(restaurant.lat, restaurant.lon)} target="_blank" rel="noopener noreferrer">
			🎉 You should try: {restaurant.name}
		</a>
	</h2>
	<span class="text-sm text-nowrap">
		{restaurant.distance.toFixed(2)} km away
	</span>
</div>
